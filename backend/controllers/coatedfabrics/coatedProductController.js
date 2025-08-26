const coatedProductModel = require("../../models/coatedfabrics/coatedProductModel");
const coatedAppModel = require("../../models/coatedfabrics/coatedAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createCoatedProduct = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;
    const productData = JSON.parse(req.body.product);
    const files = req.files;

    const application = await coatedAppModel.findOne();
    if (!application) {
      return res.status(404).json({ message: "No coated application found." });
    }

    if (!Array.isArray(productData) || productData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product is required." });
    }

    if (!files || files.length !== productData.length) {
      return res
        .status(400)
        .json({ message: "Each product must have a corresponding image." });
    }

    const uploadedProducts = [];

    for (let i = 0; i < productData.length; i++) {
      const product = productData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for product image: ${file.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_products",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Error deleting temp file:", err.message);
      }

      uploadedProducts.push({
        image: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        alt: product.alt,
        name: product.name,
        product_content: product.product_content,
        button: product.button,
        button_url: product.button_url,
        application_id: product.application_id,
      });
    }

    const newProduct = new coatedProductModel({
      yellow_title,
      black_title,
      content,
      product: uploadedProducts,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Coated product created successfully",
      coatedProduct: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating coated product: ${error.message}`,
    });
  }
};

const updateCoatedProduct = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;

    let productData = [];

    if (req.body.product && req.body.product !== "undefined") {
      try {
        productData = JSON.parse(req.body.product);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in product field." });
      }
    }

    const files = req.files;

    const currentCoatedProduct = await coatedProductModel.findOne({});

    if (!currentCoatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    const uploadedProducts = [];
    const modifiedProducts = [];

    for (let i = 0; i < productData.length; i++) {
      const product = productData[i];
      const file = files?.[i];

      const isNewProduct = !product._id;

      if (isNewProduct || product.application_id) {
        if (!product.application_id) {
          return res.status(400).json({
            message: "application_id is required in new product entries.",
          });
        }

        const applicationDoc = await coatedAppModel.findOne({
          "application._id": product.application_id,
        });

        const appExists = applicationDoc?.application.find(
          (app) => app._id.toString() === product.application_id
        );

        if (!appExists) {
          return res.status(400).json({
            message: `Invalid application_id: ${product.application_id}`,
          });
        }
      }

      let imageData;

      if (file) {
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res.status(400).json({
            message: `Unsupported image type for product: ${file.originalname}`,
          });
        }

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "coated_products",
          resource_type: "image",
        });

        const filePath = path.resolve(file.path);
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Error deleting temp file:", err.message);
        }

        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
      }

      if (product._id) {
        const existingIndex = currentCoatedProduct.product.findIndex(
          (p) => p._id.toString() === product._id
        );

        if (existingIndex !== -1) {
          const existingProduct = currentCoatedProduct.product[existingIndex];

          currentCoatedProduct.product[existingIndex] = {
            image: imageData ?? existingProduct.image,
            alt: product.alt ?? existingProduct.alt,
            name: product.name ?? existingProduct.name,
            product_content:
              product.product_content ?? existingProduct.product_content,
            button: product.button ?? existingProduct.button,
            button_url: product.button_url ?? existingProduct.button_url,
            application_id:
              product.application_id ?? existingProduct.application_id,
            _id: existingProduct._id,
          };

          modifiedProducts.push(currentCoatedProduct.product[existingIndex]);
        }
      } else {
        const newProduct = {
          image: imageData || [],
          alt: product.alt || "",
          name: product.name || "",
          product_content: product.product_content || "",
          button: product.button || "",
          button_url: product.button_url || "",
          application_id: product.application_id,
        };

        uploadedProducts.push(newProduct);
        modifiedProducts.push(newProduct);
      }
    }

    const updatedFields = {
      yellow_title,
      black_title: black_title ?? currentCoatedProduct.black_title,
      content: content ?? currentCoatedProduct.content,
      product: [...(currentCoatedProduct.product || []), ...uploadedProducts],
    };

    await coatedProductModel.findByIdAndUpdate(
      currentCoatedProduct._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Coated product updated successfully.",
      modifiedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating coated product due to ${error.message}`,
    });
  }
};

const getSingleCoatedProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const coatedProduct = await coatedProductModel.findOne({
      "product._id": new mongoose.Types.ObjectId(productId),
    });

    if (!coatedProduct) {
      return res.status(404).json({
        message: "Product not found in any coated product document.",
      });
    }

    const matchedProduct = coatedProduct.product.find(
      (p) => p._id.toString() === productId
    );

    if (!matchedProduct) {
      return res.status(404).json({ message: "Product not found in array." });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: matchedProduct,
      // parentProductId: coatedProduct._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated product due to ${error.message}`,
    });
  }
};

const getCoatedProduct = async (req, res) => {
  try {
    const coatedProduct = await coatedProductModel.find();

    if (coatedProduct.length === 0) {
      return res.status(400).json({
        message: "Product not added. Kindly add one.",
      });
    }

    // Flatten and count all products
    const totalProducts = coatedProduct.reduce(
      (acc, doc) => acc + (doc.product?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Coated product fetched successfully.",
      productCount: totalProducts,
      coatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated product due to ${error.message}`,
    });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const coatedProduct = await coatedProductModel.findOne({
      "product._id": productId,
    });

    if (!coatedProduct) {
      return res.status(404).json({
        message: "Product not found in any coated product.",
      });
    }

    const deletedProduct = coatedProduct.product.find(
      (p) => p._id.toString() === productId
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found in the array.",
      });
    }

    const updatedCoatedProduct = await coatedProductModel.findByIdAndUpdate(
      coatedProduct._id,
      {
        $pull: { product: { _id: productId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product removed successfully from coated products.",
      deletedProduct,
      updatedCoatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting product from coated products: ${error.message}`,
    });
  }
};

const deleteCoatedProduct = async (req, res) => {
  try {
    const coatedProduct = await coatedProductModel.findOne({});

    if (coatedProduct.length === 0) {
      return res.status(400).json({
        message: "No coated product added to delete. Kindly add one.",
      });
    }

    const deletedCoatedProduct = await coatedProductModel.findByIdAndDelete(
      coatedProduct._id
    );

    return res.status(200).json({
      message: "Coated product deleted successfully.",
      deletedCoatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting coated product due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedProduct,
  updateCoatedProduct,
  getSingleCoatedProduct,
  getCoatedProduct,
  deleteCoatedProduct,
  deleteSingleProduct,
};
