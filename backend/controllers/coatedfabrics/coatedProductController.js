const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const CoatedProductsModel = require("../../models/coatedfabrics/coatedProductModel");
const CoatedApplicationModel = require("../../models/coatedfabrics/coatedAppModel");

const createCoatedProduct = async (req, res) => {
  try {
    let { alt, name, content, button, application } = req.body;

    // Ensure optional fields have default values
    button = button?.trim() || "";
    content = content?.trim() || "";

    const existingProduct = await CoatedProductsModel.findOne({
      name: name.trim(),
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    const applicationExists = await CoatedApplicationModel.findById(
      application
    );
    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    let imageData = {};
    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      const extname = path.extname(imageFile.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type." });
      }
      if (!alt || !alt.trim()) {
        return res.status(400).json({ message: "Alt text is required." });
      }

      imageData = {
                  filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
                  filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageFile.key}` // keep "images/banners/..."
                 }
    }

    let brochureData = {};
    if (req.files?.brochure?.[0]) {
      const brochureFile = req.files.brochure[0];
      const brochureExt = path.extname(brochureFile.originalname).toLowerCase();
      if (brochureExt !== ".pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF files are allowed for brochure." });
      }

      brochureData = {
                  filename: path.basename(brochureFile.key), // "1756968423495-2.jpg"
                  filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${brochureFile.key}` // keep "images/banners/..."
                 }
    } else {
      brochureData = { filename: "", filepath: "" }; // default empty
    }

    const newCoatedProduct = new CoatedProductsModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
      button,
      content,
      application,
      brochure: brochureData,
    });

    await newCoatedProduct.save();

    res.status(201).json({
      message: "Coated product created successfully",
      coatedProduct: newCoatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating coated product: ${error.message}` });
  }
};

const updateCoatedProduct = async (req, res) => {
  try {
    const { alt, name, content, button, application, removeBrochure } = req.body;
    const productId = req.params._id;

    const product = await CoatedProductsModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ---- duplicate name check
    if (name) {
      const duplicate = await CoatedProductsModel.findOne({
        name: name.trim(),
        _id: { $ne: productId },
      });
      if (duplicate)
        return res
          .status(400)
          .json({ message: "Another product with this name already exists." });
    }

    // ---- image upload
    if (req.files?.image?.[0]) {
      const img = req.files.image[0];
      const ext = path.extname(img.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${img.originalname}` });
      }
      product.image = [
        {
          filename: path.basename(img.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${img.key}`,
        },
      ];
    }

    // ---- brochure upload
    if (req.files?.brochure?.[0]) {
      const pdf = req.files.brochure[0];
      if (path.extname(pdf.originalname).toLowerCase() !== ".pdf") {
        return res.status(400).json({ message: "Only PDF files allowed" });
      }
      product.brochure = {
        filename: path.basename(pdf.key),
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${pdf.key}`,
      };
    }

    // ---- text fields
    if (alt !== undefined) product.alt = alt;
    if (name !== undefined) product.name = name;
    if (content !== undefined) product.content = content?.trim() || "";
    if (button !== undefined) product.button = button?.trim() || "";

    // ---- brochure removal if requested
    if (removeBrochure === "true") {
      product.brochure = undefined;
    }

    // ---- application
    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      const appExists = await CoatedApplicationModel.findById(application);
      if (!appExists)
        return res.status(400).json({ message: "Application not found" });
      product.application = application;
    }

    await product.save();
    return res
      .status(200)
      .json({ message: "Coated product updated successfully", coatedProduct: product });
  } catch (err) {
    console.error("Error updating coated product:", err);
    return res.status(500).json({ message: `Error updating coated product: ${err.message}` });
  }
};

const getCoatedProductByAppName = async (req, res) => {
  try {
    let appName = req.params.name || "";
    appName = appName.toLowerCase();

    const products = await CoatedProductsModel.find().populate("application", "name");

    const normalize = (str) =>
      str?.toLowerCase().replace(/[-\s]+/g, "-").replace(/\//g, "-"); // turn spaces and dashes into "-"


    const product = products.filter(
      (c) => normalize(c.application?.name) === normalize(appName)
    );

    if (!product || product.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this application" });
    }

    res.status(200).json({
      message: "productContent fetched by product successfully",
      product,
    });
  } catch (err) {
    console.error("Error fetching coated productContent by product name:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getCoatedProduct = async (req, res) => {
  try {
    const coatedProduct = await CoatedProductsModel.findById(req.params._id)
      .populate("application", "name")
      .lean();

    if (!coatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: coatedProduct,
    });
  } catch (error) {
    console.error("Error fetching coated product:", error);
    return res.status(500).json({
      message: `Error in fetching coated product due to ${error.message}`,
    });
  }
};

const getCoatedProducts = async (req, res) => {
  try {
    const coatedProducts = await CoatedProductsModel.find()
      .populate("application") // <-- populate the applications field
      .lean();

    if (!coatedProducts.length) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({
      message: "coated products fetched successfully.",
      productCount: coatedProducts.length,
      coatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching coated products: ${error.message}`,
    });
  }
};

const deleteCoatedProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    const coatedProduct = await CoatedProductsModel.findById(_id);

    if (!coatedProduct) {
      return res.status(400).json({
        message: "No coated product found to delete. Kindly add one.",
      });
    }

    // Step 3: If safe, delete the application
    const deletedCoatedProduct = await CoatedProductsModel.findOneAndDelete({
      _id,
    });

    return res.status(200).json({
      message: "Coated product deleted successfully.",
      deletedCoatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Coated product due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedProduct,
  updateCoatedProduct,
  getCoatedProductByAppName,
  getCoatedProduct,
  getCoatedProducts,
  deleteCoatedProduct,
};
