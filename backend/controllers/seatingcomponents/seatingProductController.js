const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");
const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

const createSeatingProduct = async (req, res) => {
  try {
    let { alt, name, application } = req.body;

    // 🔹 Check if application exists
    const applicationExists = await SeatingAppModel.findById(application);
    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    // 🔹 Only check duplicates if name is provided
    if (name && name.trim()) {
      const existingProduct = await SeatingProductModel.findOne({
        name: name.trim(),
      });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Product with this name already exists." });
      }
    }

    const totalSeatingProducts = await SeatingProductModel.countDocuments();

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

    if (!product) return res.status(404).json({ message: "Product not found" });

   if (name !== undefined) {
  if (name.trim() === "") {
    // User cleared the field → set it to empty
    product.name = "";
  } else {
    // Check duplicate only if not empty
    const duplicate = await SeatingProductModel.findOne({
      name: name.trim(),
      _id: { $ne: productId },
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Another product with this name already exists." });
    }
    product.name = name.trim();
  }
}


    // Handle image upload...
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
                                filename: path.basename(file.key), // "1756968423495-2.jpg"
                                filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                               }
      ];
    }

     if (sequence && sequence !== product.sequence) {
      const seatingProduct = await SeatingProductModel.find().sort({ sequence: 1 });

      let updateOperations = [];
      let maxsequence = seatingProduct.length;

      if (sequence > maxsequence) {
        return res.status(400).json({
          message: `Invalid sequence. The sequence cannot be greater than ${maxsequence}.`,
        });
      }

      seatingProduct.forEach((seatingProduct) => {
        if (seatingProduct._id.toString() !== product._id.toString()) {
          if (seatingProduct.sequence >= sequence && seatingProduct.sequence < product.sequence) {
            updateOperations.push({
              updateOne: {
                filter: { _id: seatingProduct._id },
                update: { $inc: { sequence: 1 } },
              },
            });
          } else if (
            seatingProduct.sequence > product.sequence &&
            seatingProduct.sequence <= sequence
          ) {
            updateOperations.push({
              updateOne: {
                filter: { _id: seatingProduct._id },
                update: { $inc: { sequence: -1 } },
              },
            });
          }
        }
      });

      if (updateOperations.length > 0) {
        await SeatingProductModel.bulkWrite(updateOperations);
      }

      if (sequence && sequence !== seatingProduct.sequence) {
        await SeatingProductModel.findByIdAndUpdate(req.params._id, {
          sequence,
        });
      }
    }

    if (alt !== undefined) product.alt = alt;

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
      str?.toLowerCase().replace(/[-\s]+/g, "-"); // turn spaces and dashes into "-"

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
      .lean();

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

    const seatingProduct = await SeatingProductModel.findById(_id);

    if (!seatingProduct) {
      return res.status(400).json({
        message: "No coated product found to delete. Kindly add one.",
      });
    }

    const deletedSequence = seatingProduct.sequence;

    // Step 3: If safe, delete the application
    const deletedSeatingProduct = await SeatingProductModel.findOneAndDelete({
      _id,
    });

    // Update the sequence of the remaining team members
    const updateResult = await SeatingProductModel.updateMany(
      { sequence: { $gt: deletedSequence } },
      { $inc: { sequence: -1 } }
    );

    console.log(`Updated ${updateResult.modifiedCount} team member's sequence.`);

    return res.status(200).json({
      message: "Seating product deleted successfully.",
      deletedSeatingProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Seating product due to ${error.message}`,
    });
  }
};

module.exports = {
  createSeatingProduct,
  updateSeatingProduct,
  getSeatingAppAndProduct,
  getSeatingProductByAppName,
  getSeatingProduct,
  getSeatingProducts,
  deleteSeatingProduct,
};
