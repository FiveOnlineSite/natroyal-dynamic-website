const VinylProductVariantModel = require("../../models/vinylflooring/vinylProductVatriantModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createVinylProductVariant = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;
    const productVariantData = JSON.parse(req.body.product);
    const files = req.files;

    // const application = await VinylApplicationModel.findOne();
    // if (!application) {
    //   return res.status(404).json({ message: "No vinyl application found." });
    // }

    const product = await VinylProductModel.findOne();
    if (!product) {
      return res.status(404).json({ message: "No vinyl product found." });
    }

    if (!Array.isArray(productVariantData) || productVariantData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product is required." });
    }

    if (!files || files.length !== productVariantData.length) {
      return res
        .status(400)
        .json({
          message: "Each product variant must have a corresponding image.",
        });
    }

    const uploadedProductVariant = [];

    for (let i = 0; i < productVariantData.length; i++) {
      const variant = productVariantData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for product image: ${file.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "vinyl_products_variant",
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

      uploadedProductVariant.push({
        image: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        alt: variant.alt,
        name: variant.name,
        application_id: variant.application_id,
        product_id: variant.product_id,
      });
    }

    const newProductVariant = new VinylProductVariantModel({
      yellow_title,
      black_title,
      content,
      variant: uploadedProductVariant,
    });

    await newProductVariant.save();

    res.status(201).json({
      message: "Vinyl product variant created successfully",
      VinylProductVariant: newProductVariant,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating vinyl product variant: ${error.message}`,
    });
  }
};

const updateVinylProductVariant = async (req, res) => {
  try {
    const { yellow_title, black_title, content } = req.body;

    let productVariantData = [];

    if (req.body.variant && req.body.variant !== "undefined") {
      try {
        productVariantData = JSON.parse(req.body.variant);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in product variant field." });
      }
    }

    const files = req.files;

    const currentVinylProductVariant =
      await VinylProductVariantModel.findOne({});

    if (!currentVinylProductVariant) {
      return res.status(404).json({ message: "Product variant not found." });
    }

    const uploadedProductVariant = [];
    const modifiedProductVariant = [];

    for (let i = 0; i < productVariantData.length; i++) {
      const variant = productVariantData[i];
      const file = files?.[i];

      const isNewProductVariant = !variant._id;

      if (isNewProductVariant || variant.application_id || variant.product_id) {
        if (!variant.application_id) {
          return res.status(400).json({
            message:
              "application_id is required in new product variant entries.",
          });
        }

        if (!variant.product_id) {
          return res.status(400).json({
            message: "product_id is required in new product variant entries.",
          });
        }

        const applicationDoc = await VinylApplicationModel.findOne({
          "application._id": variant.application_id,
        });

        const productDoc = await VinylProductModel.findOne({
          "product._id": variant.product_id,
        });

        const appExists = applicationDoc?.application.find(
          (app) => app._id.toString() === variant.application_id
        );

        const productExists = productDoc?.product.find(
          (cat) => cat._id.toString() === variant.product_id
        );

        if (!appExists) {
          return res.status(400).json({
            message: `Invalid application_id: ${variant.application_id}`,
          });
        }

        if (!productExists) {
          return res.status(400).json({
            message: `Invalid product_id: ${variant.product_id}`,
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
          folder: "vinyl_products_variant",
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

      if (variant._id) {
        const existingIndex =
          currentVinylProductVariant.variant.findIndex(
            (v) => v._id.toString() === variant._id
          );

        if (existingIndex !== -1) {
          const existingProductVariant =
            currentVinylProductVariant.variant[existingIndex];

          currentVinylProductVariant.variant[existingIndex] = {
            image: imageData ?? existingProductVariant.image,
            alt: variant.alt ?? existingProductVariant.alt,
            name: variant.name ?? existingProductVariant.name,

            application_id:
              variant.application_id ?? existingProductVariant.application_id,
            product_id: variant.product_id ?? existingProductVariant.product_id,
            _id: existingProductVariant._id,
          };

          modifiedProductVariant.push(
            currentVinylProductVariant.variant[existingIndex]
          );
        }
      } else {
        const newProductVariant = {
          image: imageData || [],
          alt: variant.alt || "",
          name: variant.name || "",
          application_id: variant.application_id,
          product_id: variant.product_id,
        };

        uploadedProductVariant.push(newProductVariant);
        modifiedProductVariant.push(newProductVariant);
      }
    }

    const updatedFields = {
      yellow_title,
      black_title: black_title ?? currentVinylProductVariant.black_title,
      content: content ?? currentVinylProductVariant.content,
      variant: [
        ...(currentVinylProductVariant.variant || []),
        ...uploadedProductVariant,
      ],
    };

    await VinylProductVariantModel.findByIdAndUpdate(
      currentVinylProductVariant._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Vinyl product variant updated successfully.",
      modifiedProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating vinyl product variant due to ${error.message}`,
    });
  }
};

const getSingleVinylProductVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(variantId)) {
      return res.status(400).json({ message: "Invalid variantId" });
    }

    const vinylProductVariant = await VinylProductVariantModel.findOne({
      "variant._id": new mongoose.Types.ObjectId(variantId),
    });

    if (!vinylProductVariant) {
      return res.status(404).json({
        message: "Product not found in any vinyl product variant document.",
      });
    }

    const matchedProductVariant = vinylProductVariant.variant.find(
      (v) => v._id.toString() === variantId
    );

    if (!matchedProductVariant) {
      return res
        .status(404)
        .json({ message: "Product Variant not found in array." });
    }

     const productId = matchedProduct.product_id;
    
        let productObj = null;
    
        if (productId && mongoose.Types.ObjectId.isValid(productId)) {
          // Find the VinylApplication document that contains the nested application with _id = productId
          const vinylProduct = await VinylProductModel.findOne({
            "product._id": productId,
          }).lean();
    
          if (vinylProductVariant) {
            // Find the nested application object inside the array
            productObj = vinylProduct.product.find(
              (app) => app._id.toString() === productId.toString()
            );
          }
        }
    
        const responseProduct = {
          ...matchedProduct,
          application: applicationObject || null,
          application_name: applicationObject ? applicationObject.name : null,
        };

    return res.status(200).json({
      message: "Product Variant fetched successfully.",
      variant: matchedProductVariant,
      // parentProductId: VinylProductVariant._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl product variant due to ${error.message}`,
    });
  }
};

const getVinylProductVariant = async (req, res) => {
  try {
    const VinylProductVariant = await VinylProductVariantModel.find();

    if (VinylProductVariant.length === 0) {
      return res.status(400).json({
        message: "Product Variant not added. Kindly add one.",
      });
    }

    const totalProductsVariant = VinylProductVariant.reduce(
      (acc, doc) => acc + (doc.variant?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Vinyl product Variant fetched successfully.",
      productCount: totalProductsVariant,
      VinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl product Variant due to ${error.message}`,
    });
  }
};

const deleteSingleProductVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(variantId)) {
      return res.status(400).json({ message: "Invalid variantId" });
    }

    const VinylProductVariant = await VinylProductVariantModel.findOne({
      "variant._id": variantId,
    });

    if (!VinylProductVariant) {
      return res.status(404).json({
        message: "Product variant not found in any vinyl product.",
      });
    }

    const deletedProductVariant = VinylProductVariant.variant.find(
      (v) => v._id.toString() === variantId
    );

    if (!deletedProductVariant) {
      return res.status(404).json({
        message: "Product variant not found in the array.",
      });
    }

    const updatedVinylProductVariant =
      await VinylProductVariantModel.findByIdAndUpdate(
        VinylProductVariant._id,
        {
          $pull: { variant: { _id: variantId } },
        },
        { new: true }
      );

    return res.status(200).json({
      message: "Vinyl product variant deleted successfully.",
      deletedProductVariant,
      updatedVinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product variant: ${error.message}`,
    });
  }
};

const deleteVinylProductVariant = async (req, res) => {
  try {
    const VinylProductVariant = await VinylProductVariantModel.findOne(
      {}
    );

    if (VinylProductVariant.length === 0) {
      return res.status(400).json({
        message: "No vinyl product variant added to delete. Kindly add one.",
      });
    }

    const deletedVinylProductVariant =
      await VinylProductVariantModel.findByIdAndDelete(
        VinylProductVariant._id
      );

    return res.status(200).json({
      message: "Vinyl product variant deleted successfully.",
      deletedVinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product variant due to ${error.message}`,
    });
  }
};

module.exports = {
  createVinylProductVariant,
  updateVinylProductVariant,
  getSingleVinylProductVariant,
  getVinylProductVariant,
  deleteVinylProductVariant,
  deleteSingleProductVariant,
};
