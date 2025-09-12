const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const VinylAppModel = require("../../models/vinylflooring/vinylAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const VinylProductContentModel = require("../../models/vinylflooring/vinylProductContentModel");
const VinylProductVariantModel = require("../../models/vinylflooring/vinylProductVariantModel");
const SuitableModel = require("../../models/vinylflooring/suitableModel")

const createVinylProduct = async (req, res) => {
  try {
    const { alt, name, applications } = req.body;

    const existingProduct = await VinylProductModel.findOne({
      name: name.trim(),
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    if (!applications) {
      return res.status(400).json({ message: "Applications are required." });
    }

    let applicationIds = [];

    if (typeof applications === "string") {
      // parse the JSON string from form-data
      const appsArray = JSON.parse(applications);
      applicationIds = appsArray.map((id) => new mongoose.Types.ObjectId(id));
    } else if (Array.isArray(applications)) {
      applicationIds = applications.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
    } else {
      return res.status(400).json({ message: "Invalid applications format" });
    }

    const foundApps = await VinylAppModel.find({
      _id: { $in: applicationIds },
    });
    if (foundApps.length !== applicationIds.length) {
      return res.status(400).json({ message: "Some applications not found" });
    }

    let imageData = {};
    if (req.file) {
      const file = req.file;
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isImage)
        return res.status(400).json({ message: "Unsupported image type." });
      if (!alt || !alt.trim())
        return res.status(400).json({ message: "Alt text is required." });

      
      imageData =  {
                 filename: path.basename(file.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                }
    }

    const newVinylProduct = new VinylProductModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
      // link,
      applications: applicationIds,
    });

    await newVinylProduct.save();

    await VinylAppModel.updateMany(
      { _id: { $in: applicationIds } },
      { $addToSet: { products: newVinylProduct._id } } // $addToSet avoids duplicates
    );

    res.status(201).json({
      message: "Vinyl product created successfully",
      vinylProduct: newVinylProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating vinyl product: ${error.message}` });
  }
};

const updateVinylProduct = async (req, res) => {
  try {
    const { alt, name } = req.body;
    const productId = req.params._id;
    const file = req.file;

    const product = await VinylProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // --- Handle name duplicate check (same as before)
    if (name) {
      const duplicate = await VinylProductModel.findOne({
        name: name.trim(),
        _id: { $ne: productId },
      });
      if (duplicate) {
        return res.status(400).json({ message: "Another product with this name already exists." });
      }
    }

    // --- Handle image
    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }
      product.image = [
        {
          filename: path.basename(file.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        },
      ];
    }

    if (alt !== undefined) product.alt = alt;
    if (name !== undefined) product.name = name;

    // --- Handle applications
    let apps = req.body.applications;
    if (typeof apps === "string") apps = JSON.parse(apps);

    if (!apps || !Array.isArray(apps) || apps.length === 0) {
      return res.status(400).json({ message: "At least one application is required." });
    }

    const oldAppIds = product.applications.map(String);
    const newAppIds = apps;

    // Save new list to product
    product.applications = newAppIds;
    await product.save();

    // Find differences
    const toAdd = newAppIds.filter((id) => !oldAppIds.includes(id));
    const toRemove = oldAppIds.filter((id) => !newAppIds.includes(id));

    if (toAdd.length > 0) {
      await VinylAppModel.updateMany(
        { _id: { $in: toAdd } },
        { $addToSet: { products: product._id } }
      );
    }
    if (toRemove.length > 0) {
      await VinylAppModel.updateMany(
        { _id: { $in: toRemove } },
        { $pull: { products: product._id } }
      );
    }

    res.status(200).json({
      message: "Vinyl product updated successfully",
      vinylProduct: product,
    });
  } catch (error) {
    res.status(500).json({ message: `Error updating vinyl product: ${error.message}` });
  }
};

const getProductWithSuitables = async (req, res) => {
  try {
    let productName = req.params.name.replace(/-/g, " ");

    const product = await VinylProductModel.findOne({ 
      name: new RegExp(`^${productName}$`, "i") 
    }).populate("applications");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const suitable = await SuitableModel.find({
      application: { $in: product.applications.map(app => app._id) }
    }).populate("application");

    res.status(200).json({
      message: "Product + suitable fetched successfully",
      product,
      applications: product.applications.map(app => app.name),
      suitable
    });
  } catch (err) {
    console.error("Error fetching product with suitable:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getVinylProductsByAppName = async (req, res) => {
  try {
    let appName = req.params.name || "";

    // Normalizer → converts "Royal Star", "royal-star", "ROYAL_star" → "royal-star"
    const normalize = (str) =>
      str?.toLowerCase().replace(/[-_\s]+/g, "-").replace(/\//g, "-");

    const products = await VinylProductModel.find()
      .populate("applications")
      .then(allProducts =>
        allProducts.filter(product =>
          product.applications.some(app =>
            normalize(app.name) === normalize(appName)
          )
        )
      );

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this application" });
    }

    res.status(200).json({
      message: "Products fetched by application successfully",
      products
    });
  } catch (err) {
    console.error("Error fetching vinyl products by application name:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getVinylProduct = async (req, res) => {
  try {
    const vinylProduct = await VinylProductModel.findById(req.params._id)
      .populate("applications", "name")
      .lean();

    if (!vinylProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: vinylProduct,
    });
  } catch (error) {
    console.error("Error fetching vinyl product:", error);
    return res.status(500).json({
      message: `Error in fetching vinyl product due to ${error.message}`,
    });
  }
};

const getVinylProducts = async (req, res) => {
  try {
    const vinylProducts = await VinylProductModel.find()
      .populate("applications") // <-- populate the applications field
      .lean();

    if (!vinylProducts.length) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({
      message: "Vinyl vinylProducts fetched successfully.",
      productCount: vinylProducts.length,
      vinylProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching vinyl products: ${error.message}`,
    });
  }
};

const deleteVinylProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const { forceDelete } = req.query;

    const vinylProduct = await VinylProductModel.findById(_id);

    if (!vinylProduct) {
      return res.status(400).json({
        message: "No vinyl product found to delete. Kindly add one.",
      });
    }

    // Step 1: Find products linked to this application
    const appsLinked = await VinylAppModel.find({
      products: new mongoose.Types.ObjectId(_id),
    });

    for (const application of appsLinked) {
      if (application.products.length === 1) {
        if (!forceDelete) {
          // Stop deletion & inform frontend
          return res.status(400).json({
            message: `Cannot delete this product. Product "${product.name}" has only one application linked. Deleting this would also delete the product.`,
            appId: application._id,
            appName: application.name,
          });
        } else {
          // If forceDelete=true → delete product as well
          await VinylAppModel.findByIdAndDelete(application._id);
        }
      } else {
        await VinylAppModel.updateOne(
          { _id: application._id },
          { $pull: { products: new mongoose.Types.ObjectId(_id) } }
        );
      }
    }

    // Step 3: If safe, delete the application
    const deletedVinylProduct = await VinylProductModel.findOneAndDelete({
      _id,
    });

    const deletedVinylProductContent =
      await VinylProductContentModel.deleteMany({
        product: _id,
      });

    const deletedVinylProductVariant =
      await VinylProductVariantModel.deleteMany({
        product: _id,
      });

    return res.status(200).json({
      message: "Vinyl product deleted successfully.",
      deletedVinylProduct,
      deletedVinylProductContent,
      deletedVinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product due to ${error.message}`,
    });
  }
};

// const deleteVinylProducts = async (req, res) => {
//   try {
//     const VinylProduct = await VinylProductModel.findOne({});

//     if (VinylProduct.length === 0) {
//       return res.status(400).json({
//         message: "No vinyl product added to delete. Kindly add one.",
//       });
//     }

//     const deletedVinylProduct = await VinylProductModel.findByIdAndDelete(
//       VinylProduct._id
//     );

//     return res.status(200).json({
//       message: "Vinyl product deleted successfully.",
//       deletedVinylProduct,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in deleting vinyl product due to ${error.message}`,
//     });
//   }
// };

module.exports = {
  createVinylProduct,
  updateVinylProduct,
  getProductWithSuitables,
  getVinylProductsByAppName,
  getVinylProduct,
  getVinylProducts,
  deleteVinylProduct,
  // deleteVinylProducts,
};
