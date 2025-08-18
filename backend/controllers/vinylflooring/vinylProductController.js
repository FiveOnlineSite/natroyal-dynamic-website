const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createVinylProduct = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;
    const productData = JSON.parse(req.body.product || "[]");
    const files = req.files || [];

    if (!Array.isArray(productData) || productData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product is required." });
    }
    if (files.length !== productData.length) {
      return res
        .status(400)
        .json({ message: "Each product must have a corresponding image." });
    }

    const uploadedProducts = [];

    for (let i = 0; i < productData.length; i++) {
      const product = productData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "vinyl_products",
        resource_type: "image",
      });
      try {
        fs.unlinkSync(file.path);
      } catch {}

      const appIds = Array.isArray(product.applications)
        ? product.applications.map((id) => new mongoose.Types.ObjectId(id))
        : [new mongoose.Types.ObjectId(product.applications)];

      uploadedProducts.push({
        image: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        alt: product.alt,
        name: product.name,
        link: product.link,
        applications: appIds,
      });
    }

    const newProduct = await VinylProductModel.create({
      yellow_title,
      black_title,
      content,
      product: uploadedProducts,
    });

    // 🔄 Link each product to its applications
    for (const prod of newProduct.product) {
      for (const appId of prod.applications) {
        await VinylApplicationModel.updateOne(
          { "application._id": appId },
          { $addToSet: { "application.$.products": prod._id } }
        );
      }
    }

    res.status(201).json({
      message: "Vinyl product created successfully",
      vinylProduct: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating vinyl product: ${error.message}` });
  }
};

const updateVinylProduct = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;
    const productData = req.body.product ? JSON.parse(req.body.product) : [];
    const files = req.files || [];

    const currentVinylProduct = await VinylProductModel.findOne({});
    if (!currentVinylProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    for (let i = 0; i < productData.length; i++) {
      const prodData = productData[i];
      const file = files[i];
      const isNew = !prodData._id;

      // Prepare image data
      let imageData;
      if (file) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
          return res
            .status(400)
            .json({ message: `Unsupported file type: ${file.originalname}` });
        }
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "vinyl_products",
          resource_type: "image",
        });
        try {
          fs.unlinkSync(file.path);
        } catch {}
        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
      }

      // Ensure applications is always an array of ObjectIds
      const appIds = Array.isArray(prodData.applications)
        ? prodData.applications.map((id) => new mongoose.Types.ObjectId(id))
        : prodData.applications
        ? [new mongoose.Types.ObjectId(prodData.applications)]
        : [];

      if (!isNew) {
        // Update existing product
        const index = currentVinylProduct.product.findIndex(
          (p) => p._id.toString() === prodData._id
        );
        if (index !== -1) {
          const existing = currentVinylProduct.product[index];

          // Track added and removed applications
          const oldAppIds = existing.applications.map((id) => id.toString());
          const newAppIds = appIds.map((id) => id.toString());

          const added = newAppIds.filter((id) => !oldAppIds.includes(id));
          const removed = oldAppIds.filter((id) => !newAppIds.includes(id));

          // Remove product from removed application references
          for (const remId of removed) {
            await VinylApplicationModel.updateOne(
              { "application._id": remId },
              {
                $pull: {
                  "application.$.products": currentVinylProduct._id,
                },
              }
            );
          }

          // Add product to new application references
          for (const addId of added) {
            await VinylApplicationModel.updateOne(
              { "application._id": addId },
              {
                $addToSet: {
                  "application.$.products": currentVinylProduct._id,
                },
              }
            );
          }

          // Replace applications (no merging)
          currentVinylProduct.product[index] = {
            ...existing.toObject(),
            image: imageData ?? existing.image,
            alt: prodData.alt ?? existing.alt,
            name: prodData.name ?? existing.name,
            link: prodData.link ?? existing.link,
            applications: appIds,
          };
        }
      } else {
        // Add new product
        currentVinylProduct.product.push({
          image: imageData || [],
          alt: prodData.alt,
          name: prodData.name,
          link: prodData.link,
          applications: appIds,
        });

        // Add product to each application reference
        for (const appId of appIds) {
          await VinylApplicationModel.updateOne(
            { "application._id": appId },
            {
              $addToSet: {
                "application.$.products": currentVinylProduct._id,
              },
            }
          );
        }
      }
    }

    // Update main document fields
    currentVinylProduct.yellow_title =
      yellow_title ?? currentVinylProduct.yellow_title;
    currentVinylProduct.black_title =
      black_title ?? currentVinylProduct.black_title;
    currentVinylProduct.content = content ?? currentVinylProduct.content;

    await currentVinylProduct.save();

    res.status(200).json({
      message: "Vinyl product updated successfully.",
      vinylProduct: currentVinylProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating vinyl product: ${error.message}` });
  }
};


const getSingleVinylProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const vinylProductDoc = await VinylProductModel.findOne(
      { "product._id": productId },
      { product: 1 }
    ).lean();

    if (!vinylProductDoc) {
      return res.status(404).json({ message: "Product not found" });
    }

    const matchedProduct = vinylProductDoc.product.find(
      (p) => p._id.toString() === productId
    );

    if (!matchedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const appId = matchedProduct.applications;

    let applicationObject = null;

    if (appId && mongoose.Types.ObjectId.isValid(appId)) {
      // Find the VinylApplication document that contains the nested application with _id = appId
      const vinylApplicationDoc = await VinylApplicationModel.findOne({
        "application._id": appId,
      }).lean();

      if (vinylApplicationDoc) {
        // Find the nested application object inside the array
        applicationObject = vinylApplicationDoc.application.find(
          (app) => app._id.toString() === appId.toString()
        );
      }
    }

    const responseProduct = {
      ...matchedProduct,
      application: applicationObject || null,
      application_name: applicationObject ? applicationObject.name : null,
    };

    return res.status(200).json({
      message: "Product fetched successfully.",
      VinylProduct: responseProduct,
    });
  } catch (error) {
    console.error("Error fetching vinyl product:", error);
    return res.status(500).json({
      message: `Error in fetching vinyl product due to ${error.message}`,
    });
  }
};

const getVinylProduct = async (req, res) => {
  try {
    const vinylProducts = await VinylProductModel.find().lean();
    // const vinylApplications = await VinylApplicationModel.find().lean();

    if (!vinylProducts.length) {
      return res.status(400).json({ message: "No products found" });
    }

    // const appMap = {};
    // vinylApplications.forEach((vApp) => {
    //   vApp.application.forEach((app) => {
    //     appMap[app._id.toString()] = app.name;
    //   });
    // });

    // const enrichedProducts = vinylProducts.map((vinylDoc) => ({
    //   ...vinylDoc,
    //   product: vinylDoc.product.map((prod) => ({
    //     ...prod,
    //     application_names: (prod.applications || []).map((appId) => ({
    //       _id: appId,
    //       name: appMap[appId.toString()] || "Unknown",
    //     })),
    //   })),
    // }));

    return res.status(200).json({
      message: "Vinyl products fetched successfully",
      VinylProduct: vinylProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching vinyl products: ${error.message}`,
    });
  }
};


const deleteProductApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

  const productDoc = await VinylProductModel.findOne({
      "product.applications": applicationId,
    });

    if (!productDoc) {
      return res.status(404).json({
        message: "Application id not found in any vinyl product.",
      });
    }

    const deletedApplication = productDoc.product.find((p) =>
      p.applications.some((appId) => appId.toString() === applicationId)
    );

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Product not found with the given application id.",
      });
    }

   deletedApplication.applications = deletedApplication.applications.filter(
      (appId) => appId.toString() !== applicationId
    );

    await productDoc.save();

    return res.status(200).json({
      message: "Vinyl application deleted from product successfully.",
      deletedApplication,
      updatedProduct: productDoc,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product application: ${error.message}`,
    });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const VinylProduct = await VinylProductModel.findOne({
      "product._id": productId,
    });

    if (!VinylProduct) {
      return res.status(404).json({
        message: "Product not found in any vinyl product.",
      });
    }

    // 2️⃣ Find the actual product data before deletion
    const deletedProduct = VinylProduct.product.find(
      (p) => p._id.toString() === productId
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found in the array.",
      });
    }

    // 3️⃣ Remove the product from VinylProductModel
    const updatedVinylProduct = await VinylProductModel.findByIdAndUpdate(
      VinylProduct._id,
      { $pull: { product: { _id: productId } } },
      { new: true }
    );

    // 4️⃣ Remove this productId from all applications' `products` arrays
    await VinylApplicationModel.updateMany(
      { "application.products": productId },
      {
        $pull: {
          "application.$[].products": new mongoose.Types.ObjectId(productId),
        },
      }
    );

    return res.status(200).json({
      message: "Vinyl product deleted successfully.",
      deletedProduct,
      updatedVinylProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting vinyl product: ${error.message}`,
    });
  }
};


const deleteVinylProduct = async (req, res) => {
  try {
    const VinylProduct = await VinylProductModel.findOne({});

    if (VinylProduct.length === 0) {
      return res.status(400).json({
        message: "No vinyl product added to delete. Kindly add one.",
      });
    }

    const deletedVinylProduct = await VinylProductModel.findByIdAndDelete(
      VinylProduct._id
    );

    return res.status(200).json({
      message: "Vinyl product deleted successfully.",
      deletedVinylProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product due to ${error.message}`,
    });
  }
};

module.exports = {
  createVinylProduct,
  updateVinylProduct,
  getSingleVinylProduct,
  getVinylProduct,
  deleteProductApplication,
  deleteVinylProduct,
  deleteSingleProduct,
};
