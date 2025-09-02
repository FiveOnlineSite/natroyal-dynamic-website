const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");
const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

const createSeatingProduct = async (req, res) => {
  try {
    let { alt, name, sequence, application } = req.body;

    const existingProduct = await SeatingProductModel.findOne({
      name: name.trim(),
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    const applicationExists = await SeatingAppModel.findById(application);
    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
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

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "seating_products",
      });
      imageData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };
      fs.unlinkSync(file.path);
    }

    const newSeatingProduct = new SeatingProductModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
      sequence: totalSeatingProducts + 1,
      application,
    });

    await newSeatingProduct.save();

    res.status(201).json({
      message: "seating product created successfully",
      setaingProduct: newSeatingProduct,
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

    if (name) {
      const duplicate = await SeatingProductModel.findOne({
        name: name.trim(),
        _id: { $ne: productId },
      });
      if (duplicate) {
        return res
          .status(400)
          .json({ message: "Another product with this name already exists." });
      }
    }

    if (req.file) {
      const file = req.file;
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_products",
        resource_type: "image",
      });
      try {
        fs.unlinkSync(file.path);
      } catch {}
      product.image = [
        {
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        },
      ];
    }

    if (sequence && sequence !== existingProduct.sequence) {
      const product = await SeatingProductModel.find().sort({ sequence: 1 });

      let updateOperations = [];
      let maxsequence = product.length;

      if (sequence > maxsequence) {
        return res.status(400).json({
          message: `Invalid sequence. The sequence cannot be greater than ${maxsequence}.`,
        });
      }

      product.forEach((product) => {
        if (product._id.toString() !== existingProduct._id.toString()) {
          if (
            product.sequence >= sequence &&
            product.sequence < existingProduct.sequence
          ) {
            updateOperations.push({
              updateOne: {
                filter: { _id: product._id },
                update: { $inc: { sequence: 1 } },
              },
            });
          } else if (
            product.sequence > existingProduct.sequence &&
            product.sequence <= sequence
          ) {
            updateOperations.push({
              updateOne: {
                filter: { _id: product._id },
                update: { $inc: { sequence: -1 } },
              },
            });
          }
        }
      });

      if (updateOperations.length > 0) {
        await SeatingProductModel.bulkWrite(updateOperations);
      }

      if (sequence && sequence !== product.sequence) {
        await SeatingProductModel.findByIdAndUpdate(req.params._id, {
          sequence,
        });
      }
    }

    if (alt !== undefined) product.alt = alt;
    if (name !== undefined) product.name = name;
    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      if (sequence !== undefined) product.sequence = sequence;

      const applicationExists = await SeatingAppModel.findById(application);
      if (!applicationExists) {
        return res.status(400).json({ message: "Application not found" });
      }

      const duplicate = await SeatingProductModel.findOne({
        application,
        _id: { $ne: productId },
      });

      if (duplicate) {
        return res.status(400).json({
          message:
            "Application content already exists for this application. Please use a different application or update the existing content.",
        });
      }

      product.application = application;
    }

    await product.save();
    res.status(200).json({
      message: "Coated product updated successfully",
      seatingProduct: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating coated product: ${error.message}` });
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

    console.log(`Updated ${updateResult.modifiedCount} team member's order.`);

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
  getSeatingProduct,
  getSeatingProducts,
  deleteSeatingProduct,
};
