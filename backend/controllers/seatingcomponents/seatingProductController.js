const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");
const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { promiseHooks } = require("v8");

const createSeatingProduct = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;
    const productData = JSON.parse(req.body.product); // array of product objects
    const files = req.files;

    const application = await SeatingAppModel.findOne();
    if (!application) {
      return res.status(404).json({ message: "No seating application found." });
    }

    if (!Array.isArray(productData) || productData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product is required." });
    }

    const uploadedProducts = [];

    for (let i = 0; i < productData.length; i++) {
      const product = productData[i];
      const file = files[i];

      // Validate file
      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for product image: ${file.originalname}`,
        });
      }

      // Upload image
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "seating_products",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      // ✅ Push product with sequence
      uploadedProducts.push({
        image: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        alt: product.alt,
        name: product.name,
        sequence: i + 1,
        application_id: product.application_id,
      });
    }

    const newProduct = new SeatingProductModel({
      yellow_title,
      black_title,
      content,
      product: uploadedProducts,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Seating product created successfully",
      SeatingProduct: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating Seating product: ${error.message}`,
    });
  }
};

const updateSeatingProduct = async (req, res) => {
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

    const currentSeatingProduct = await SeatingProductModel.findOne({});
    if (!currentSeatingProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    const uploadedProducts = [];
    const modifiedProducts = [];

    const existingProductMap = {};
    currentSeatingProduct.product.forEach((item) => {
      existingProductMap[item._id.toString()] = item;
    });

    // ✅ Process and modify uploaded data
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

        const applicationDoc = await SeatingAppModel.findOne({
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
        const ext = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
        if (!isImage) {
          return res.status(400).json({
            message: `Unsupported image type for product: ${file.originalname}`,
          });
        }

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "seating_products",
          resource_type: "image",
        });

        const filePath = path.resolve(file.path);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
      }

      if (product._id) {
        const existingIndex = currentSeatingProduct.product.findIndex(
          (p) => p._id.toString() === product._id
        );

        if (existingIndex !== -1) {
          const existingProduct = currentSeatingProduct.product[existingIndex];

          currentSeatingProduct.product[existingIndex] = {
            image: imageData ?? existingProduct.image,
            alt: product.alt ?? existingProduct.alt,
            name: product.name ?? existingProduct.name,
            application_id:
              product.application_id ?? existingProduct.application_id,
            sequence: product.sequence ?? existingProduct.sequence,
            _id: existingProduct._id,
          };

          modifiedProducts.push(currentSeatingProduct.product[existingIndex]);
        }
      } else {
        const newSequence =
          currentSeatingProduct.product.length + uploadedProducts.length + 1;

        const newProduct = {
          image: imageData || [],
          alt: product.alt || "",
          name: product.name || "",
          sequence: product.sequence || newSequence,
          product_id: product.product_id,
        };

        uploadedProducts.push(newProduct);
        modifiedProducts.push(newProduct);
      }
    }

    const updatedSeatingProduct = [...currentSeatingProduct.product];
    for (let i = 0; i < modifiedProducts.length; i++) {
      const updatedProduct = modifiedProducts[i];

      if (updatedProduct._id && updatedProduct.sequence) {
        const originalProduct =
          existingProductMap[updatedProduct._id.toString()];
        if (
          originalProduct &&
          originalProduct.sequence !== updatedProduct.sequence
        ) {
          const newSeq = updatedProduct.sequence;
          const oldSeq = originalProduct.sequence;

          updatedSeatingProduct.forEach((pro) => {
            if (pro._id.toString() !== updatedProduct._id.toString()) {
              if (
                newSeq < oldSeq &&
                pro.sequence >= newSeq &&
                pro.sequence < oldSeq
              ) {
                pro.sequence += 1;
              } else if (
                newSeq > oldSeq &&
                pro.sequence <= newSeq &&
                pro.sequence > oldSeq
              ) {
                pro.sequence -= 1;
              }
            }
          });

          const targetIndex = updatedSeatingProduct.findIndex(
            (p) => p._id.toString() === updatedProduct._id.toString()
          );
          if (targetIndex !== -1) {
            updatedSeatingProduct[targetIndex].sequence = newSeq;
          }
        }
      }
    }

    const finalProductList = [
      ...(updatedSeatingProduct || []),
      ...uploadedProducts,
    ].sort((a, b) => a.sequence - b.sequence);

    const updatedFields = {
      yellow_title,
      black_title: black_title ?? currentSeatingProduct.black_title,
      content: content ?? currentSeatingProduct.content,
      product: finalProductList,
    };

    await SeatingProductModel.findByIdAndUpdate(
      currentSeatingProduct._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Seating product updated successfully.",
      modifiedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Seating product due to ${error.message}`,
    });
  }
};

const getSingleSeatingProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const SeatingProduct = await SeatingProductModel.findOne({
      "product._id": new mongoose.Types.ObjectId(productId),
    });

    if (!SeatingProduct) {
      return res.status(404).json({
        message: "Product not found in any Seating product document.",
      });
    }

    const matchedProduct = SeatingProduct.product.find(
      (p) => p._id.toString() === productId
    );

    if (!matchedProduct) {
      return res.status(404).json({ message: "Product not found in array." });
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: matchedProduct,
      // parentProductId: SeatingProduct._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Seating product due to ${error.message}`,
    });
  }
};

const getSeatingProduct = async (req, res) => {
  try {
    const seatingProducts = await SeatingProductModel.find();

    if (seatingProducts.length === 0) {
      return res.status(400).json({
        message: "Product not added. Kindly add one.",
      });
    }

    // ✅ Sort each product array by sequence
    const sortedSeatingProducts = seatingProducts.map((doc) => {
      const sortedProduct = (doc.product || []).sort(
        (a, b) => a.sequence - b.sequence
      );
      return {
        ...doc.toObject(),
        product: sortedProduct,
      };
    });

    // ✅ Count total number of products
    const totalProducts = sortedSeatingProducts.reduce(
      (acc, doc) => acc + (doc.product?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Seating product fetched successfully.",
      productCount: totalProducts,
      SeatingProduct: sortedSeatingProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Seating product due to ${error.message}`,
    });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const objectId = new mongoose.Types.ObjectId(productId);

    // ✅ Cast productId to ObjectId in query
    const seatingProductDoc = await SeatingProductModel.findOne({
      "product._id": objectId,
    });

    if (!seatingProductDoc) {
      return res.status(404).json({
        message: "Product not found in any Seating product.",
      });
    }

    const deletedProduct = seatingProductDoc.product.find(
      (p) => p._id.toString() === productId
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found in the array.",
      });
    }

    const deletedSequence = deletedProduct.sequence;

    // ✅ Pull product using ObjectId
    const updatedSeatingProduct = await SeatingProductModel.findByIdAndUpdate(
      seatingProductDoc._id,
      { $pull: { product: { _id: objectId } } },
      { new: true }
    );

    // ✅ Adjust sequence
    updatedSeatingProduct.product = updatedSeatingProduct.product.map((p) => {
      if (p.sequence > deletedSequence) {
        return { ...p.toObject(), sequence: p.sequence - 1 };
      }
      return p;
    });

    await updatedSeatingProduct.save();

    return res.status(200).json({
      message: "Product removed successfully from Seating products.",
      deletedProduct,
      updatedSeatingProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting product from Seating products: ${error.message}`,
    });
  }
};

const deleteSeatingProduct = async (req, res) => {
  try {
    const SeatingProduct = await SeatingProductModel.findOne({});

    if (SeatingProduct.length === 0) {
      return res.status(400).json({
        message: "No Seating product added to delete. Kindly add one.",
      });
    }

    const deletedSeatingProduct = await SeatingProductModel.findByIdAndDelete(
      SeatingProduct._id
    );

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
  getSingleSeatingProduct,
  getSeatingProduct,
  deleteSeatingProduct,
  deleteSingleProduct,
};
