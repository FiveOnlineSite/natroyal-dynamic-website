const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");
const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

const createSeatingProduct = async (req, res) => {
  try {
    let { alt, name, application } = req.body;

    const applicationExists = await SeatingAppModel.findById(application);
    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    // if (name && name.trim()) {
    //   const existingProduct = await SeatingProductModel.findOne({
    //     name: name.trim(),
    //   });
    //   if (existingProduct) {
    //     return res
    //       .status(400)
    //       .json({ message: "Product with this name already exists." });
    //   }
    // }

    const totalSeatingProducts = await SeatingProductModel.countDocuments({
      application,
    });

    let imageData = {};
    if (req.file) {
      const file = req.file;
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type." });
      }
      if (!alt || !alt.trim()) {
        return res.status(400).json({ message: "Alt text is required." });
      }

      
      imageData = {
                              filename: path.basename(file.key), // "1756968423495-2.jpg"
                              filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                             }
    }

    const newSeatingProduct = new SeatingProductModel({
      image: imageData ? [imageData] : [],
      alt,
      ...(name && name.trim() && { name: name.trim() }),
      sequence: totalSeatingProducts + 1,
      application,
    });

    await newSeatingProduct.save();

    res.status(201).json({
      message: "Seating product created successfully",
      seatingProduct: newSeatingProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating seating product: ${error.message}` });
  }
};

const updateSeatingProduct = async (req, res) => {
  try {
    const { alt, name, sequence, application } = req.body;
    const productId = req.params._id;

    const product = await SeatingProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ---------- Handle image upload ----------
    if (req.file) {
      const file = req.file;
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }

      product.image = [
        {
          filename: path.basename(file.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        },
      ];
    }

    // ---------- Swap logic for sequence ----------
    if (sequence !== undefined) {
      const newSequence = Number(sequence);

      if (newSequence !== product.sequence) {
        // Only look in the same application
        const otherProduct = await SeatingProductModel.findOne({
          application: product.application,
          sequence: newSequence,
          _id: { $ne: product._id },
        });

        if (otherProduct) {
          // swap their sequence values
          otherProduct.sequence = product.sequence;
          await otherProduct.save();
        }

        product.sequence = newSequence;
      }
    }

    // ---------- Update alt ----------
    if (alt !== undefined) product.alt = alt;

    // ---------- Update application ----------
    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      const applicationExists = await SeatingAppModel.findById(application);
      if (!applicationExists) {
        return res.status(400).json({ message: "Application not found" });
      }
      product.application = application;
    }

    await product.save();

    res.status(200).json({
      message: "Seating product updated successfully",
      seatingProduct: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating seating product: ${error.message}` });
  }
};


const getSeatingProductsByAppId = async (req, res) => {
  try {
    const applicationId = req.params._id; // take directly from params

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const products = await SeatingProductModel.find({ application: applicationId });

    res.status(200).json({
      message: "Fetched products by application ID",
      products,
      productCount: products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in fetching product by application ID: ${error.message}`,
    });
  }
};

const getSeatingAppAndProduct = async (req, res) => {
  try {

    const appWithProduct = await SeatingProductModel.find().populate("application", "name");

    if (!appWithProduct) {
      return res.status(404).json({ message: "seating application and product not found" });
    }

    return res.status(200).json({
      message: "application and product fetched successfully.",
      appWithProduct,
    });
  } catch (err) {
    console.error("Error fetching seating application and product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getSeatingProductByAppName = async (req, res) => {
  try {
    let appName = req.params.name || "";

     appName = appName.toLowerCase();

    // fetch all with populated application
    const products = await SeatingProductModel.find().populate("application");

    // normalize both DB name and URL param by replacing spaces & dashes with a common format
    const normalize = (str) =>
      str?.toLowerCase().replace(/[-\s]+/g, "-").replace(/\//g, "-"); // turn spaces and dashes into "-"

    const product = products.filter(
      (c) => normalize(c.application?.name) === normalize(appName)
    );
    if (!product.length) {
      return res.status(404).json({
        message: `No products found for application: ${req.params.name}`,
      });
    }

    res.status(200).json({
      message: "Product content fetched successfully",
      product,
    });
  } catch (err) {
    console.error("Error fetching seating product by app name:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getSeatingProduct = async (req, res) => {
  try {
    const seatingProduct = await SeatingProductModel.findById(req.params._id)
      .populate("application", "name")
      .lean();

    if (!seatingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: seatingProduct,
    });
  } catch (error) {
    console.error("Error fetching seating product:", error);
    return res.status(500).json({
      message: `Error in fetching seating product due to ${error.message}`,
    });
  }
};

const getSeatingProducts = async (req, res) => {
  try {
    const seatingProducts = await SeatingProductModel.find()
      .populate("application") // <-- populate the applications field
      .lean()
      .sort({ application: 1, sequence: 1 });

    if (!seatingProducts.length) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({
      message: "seating products fetched successfully.",
      productCount: seatingProducts.length,
      seatingProducts,
      
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching seating products: ${error.message}`,
    });
  }
};

const deleteSeatingProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    // --- Find the product ---
    const prod = await SeatingProductModel.findById(_id);
    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }

    const appId = prod.application; 
    const deletedSeq = prod.sequence;

    console.log("Deleting", { appId, deletedSeq });

    // --- Delete the product first ---
    await SeatingProductModel.deleteOne({ _id });

    // --- Shift only inside same application ---
    const result = await SeatingProductModel.updateMany(
      {
        application: appId,
        sequence: { $gt: deletedSeq },
      },
      { $inc: { sequence: -1 } }
    );

    console.log("Shifted", result.modifiedCount, "docs");

    // --- Return new ordered list for confirmation ---
    const updatedList = await SeatingProductModel.find({ application: appId })
      .sort({ sequence: 1 })
      .lean();

    return res.status(200).json({
      message: "Seating product deleted & sequence adjusted",
      updatedCount: result.modifiedCount,
      products: updatedList,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: `Error deleting: ${err.message}` });
  }
};

module.exports = {
  createSeatingProduct,
  updateSeatingProduct,
  getSeatingProductsByAppId,
  getSeatingAppAndProduct,
  getSeatingProductByAppName,
  getSeatingProduct,
  getSeatingProducts,
  deleteSeatingProduct,
};
