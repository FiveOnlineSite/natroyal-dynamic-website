const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createVinylProduct = async (req, res) => {
  try {
    const { alt, name, applications } = req.body;

     const existingProduct = await VinylProductModel.findOne({ name: name.trim() });
        if (existingProduct) {
          return res.status(400).json({ message: "Product with this name already exists." });
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
      applicationIds = applications.map((id) => new mongoose.Types.ObjectId(id));
    } else {
      return res.status(400).json({ message: "Invalid applications format" });
    }

    const foundApps = await VinylApplicationModel.find({
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
      if (!isImage) return res.status(400).json({ message: "Unsupported image type." });
      if (!alt || !alt.trim()) return res.status(400).json({ message: "Alt text is required." });

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "vinyl_products",
      });
      imageData = { filename: uploadResult.original_filename, filepath: uploadResult.secure_url };
      fs.unlinkSync(file.path);
    }

    const newVinylProduct = new VinylProductModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
      // link,
      applications: applicationIds,
    });

    await newVinylProduct.save();

    await VinylApplicationModel.updateMany(
  { _id: { $in: applicationIds } },
  { $addToSet: { products: newVinylProduct._id } } // $addToSet avoids duplicates
);

    res.status(201).json({
      message: "Vinyl product created successfully",
      vinylProduct: newVinylProduct,
    });
  } catch (error) {
    res.status(500).json({ message: `Error creating vinyl product: ${error.message}` });
  }
};

const updateVinylProduct = async (req, res) => {
  try {
    const { alt, name } = req.body;
    const productId = req.params._id;
    const file = req.file;

    const product = await VinylProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name) {
          const duplicate = await VinylProductModel.findOne({ 
            name: name.trim(), 
            _id: { $ne: productId } 
          });
          if (duplicate) {
            return res.status(400).json({ message: "Another product with this name already exists." });
          }
        }

    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "vinyl_products",
        resource_type: "image",
      });
      try { fs.unlinkSync(file.path); } catch {}
      product.image = [{ filename: uploadResult.original_filename, filepath: uploadResult.secure_url }];
    }

    if (alt !== undefined) product.alt = alt;
    if (name !== undefined) product.name = name;

    // 👇 overwrite applications array
    let apps = req.body.applications;
    if (typeof apps === "string") apps = JSON.parse(apps);

    if (!apps || !Array.isArray(apps) || apps.length === 0) {
      return res.status(400).json({ message: "At least one application is required." });
    }

    product.applications = apps;

    await product.save();
    res.status(200).json({ message: "Vinyl product updated successfully", vinylProduct: product });
  } catch (error) {
    res.status(500).json({ message: `Error updating vinyl product: ${error.message}` });
  }
};


const getVinylProduct = async (req, res) => {
  try {
    const vinylProduct = await VinylProductModel.findById(req.params._id).populate("applications", "name").lean();

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

    const VinylProduct = await VinylProductModel.findById({
      _id: req.params._id,
    })

    if (VinylProduct.length === 0) {
      return res.status(404).json({
        message: "Product not found in any vinyl product.",
      });
    }

     const deletedVinylProduct = await VinylProductModel.findOneAndDelete({
     _id: req.params._id,
    }
    );

    return res.status(200).json({
      message: "Vinyl product deleted successfully.",
      deletedVinylProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting vinyl product: ${error.message}`,
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
  getVinylProduct,
  getVinylProducts,
  deleteVinylProduct,
  // deleteVinylProducts,
};
