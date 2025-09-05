const VinylProductVariantModel = require("../../models/vinylflooring/vinylProductVariantModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createVinylProductVariant = async (req, res) => {
  try {
    const { alt, name, product } = req.body;
    console.log("product id", product, typeof product);

    // Check if variant with same name exists
    const variantWithSameName = await VinylProductVariantModel.findOne({ name: name.trim() });
    if (variantWithSameName) {
      return res.status(400).json({ message: "Product variant with this name already exists." });
    }

    // Check product exists
    const productExists = await VinylProductModel.findById(product);
    if (!productExists) {
      return res.status(400).json({ message: "Product not found" });
    }

<<<<<<< HEAD
    let imageData = null;

    if (req.file) {
         const file = req.file;
=======
    let imageData = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res.status(400).json({ message: "Unsupported image type." });
        }

        if (!alt || !alt.trim()) {
          return res.status(400).json({ message: "Alt text is required." });
        }

<<<<<<< HEAD
           imageData = {
                   filename: path.basename(file.key), // "1756968423495-2.jpg"
                   filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                  };

      }
      
=======
        console.log("Uploading file to Cloudinary:", req.file?.path || req.body?.image);


        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "vinyl_product_variants",
        });
        console.log("Cloudinary upload result:", uploadResult);


        imageData.push({
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        });

        fs.unlinkSync(file.path); // remove local file
      }
    }

>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
    const newVinylProductVariant = new VinylProductVariantModel({
      image: imageData,
      alt,
      name,
      product,
    });

    await newVinylProductVariant.save();

    // add reference to product
    await VinylProductModel.updateOne(
      { _id: product },
      { $addToSet: { productVariants: newVinylProductVariant._id } }
    );

    res.status(201).json({
      message: "Vinyl product variant created successfully",
      vinylProductVariant: newVinylProductVariant,
    });
  } catch (error) {
  console.error("Error creating vinyl product variant FULL:", error); // log entire error

  res.status(500).json({ 
    message: "Error creating vinyl product variant", 
    error: error.message || error.toString() || "Unknown error"
  });
}
};

<<<<<<< HEAD
=======

>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
const updateVinylProductVariant = async (req, res) => {
  try {
    const { alt, name, product } = req.body;
    const _id = req.params._id;

    if (name) {
      const duplicate = await VinylProductVariantModel.findOne({
        name: name.trim(),
        _id: { $ne: _id },
      });
      if (duplicate) {
        return res.status(400).json({ message: "Another product variant with this name already exists." });
      }
    }

    const productVariant = await VinylProductVariantModel.findById(_id);
    if (!productVariant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

<<<<<<< HEAD
   if (req.files?.image?.[0]) {
  const file = req.files.image[0];
=======
    if (req.files && req.files.length > 0) {
  const images = [];
  for (const file of req.files) {
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
    }

<<<<<<< HEAD
    productVariant.image=[
       {
          filename: path.basename(file.key), // "1756968423495-2.jpg"
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
        }
    ]
  }

    // update text fields
    if (alt !== undefined) productVariant.alt = alt;
    if (name !== undefined) productVariant.name = name;
    if (product) {
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const productExists = await VinylProductModel.findById(
        product
      );
      if (!productExists) {
        return res.status(400).json({ message: "Application not found" });
      }

      productVariant.product = product;
    }
=======
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "vinyl_product_variants",
      resource_type: "image",
    });

     console.log("Cloudinary upload result:", uploadResult);

    try { fs.unlinkSync(file.path); } catch {}

    images.push({
      filename: uploadResult.original_filename,
      filepath: uploadResult.secure_url,
    });
  }

  productVariant.image = images; // overwrite existing images
}


    // update text fields
    if (alt !== undefined) productVariant.alt = alt;
    if (name !== undefined) productVariant.name = name;
    if (product !== undefined) productVariant.product = product;
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60

    await productVariant.save();

    res.status(200).json({
      message: "Vinyl product variant updated successfully",
      vinylProductVariant: productVariant,
    });

  } catch (error) {
  console.error("Update variant error:", error); // full log in backend
  res.status(500).json({ 
    message: "Error updating vinyl product variant", 
    error: error.message || error.toString() 
  });
}
};

<<<<<<< HEAD
const getVinylProductVariantsByProductName = async (req, res) => {
  try {
    let productName = req.params.name.replace(/-/g, " "); ; // "education" or "royal-star"

     const variants = await VinylProductVariantModel.find().populate("product");

    const productVariant = variants.filter(variant =>
      variant.product?.name?.toLowerCase() === productName.toLowerCase()
    );

    if (!productVariant || productVariant.length === 0) {
      return res.status(404).json({ message: "No productVariant found for this product" });
    }

    res.status(200).json({
      message: "productVariant fetched by product successfully",
      productVariant
    });
  } catch (err) {
    console.error("Error fetching vinyl productVariant by product name:", err);
    res.status(500).json({ message: "Server error" });
  }
};

=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
const getVinylProductVariant = async (req, res) => {
  try {
  
     const vinylProductVariant = await VinylProductVariantModel.findById(req.params._id).populate("product", "name").lean();
    
      if (!vinylProductVariant) {
         return res.status(404).json({
         message: "Vinyl product variant not found.",
          });
       }

    return res.status(200).json({
      message: "Product Variant fetched successfully.",
      variant: vinylProductVariant,
      // parentProductId: VinylProductVariant._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl product variant due to ${error.message}`,
    });
  }
};

const getVinylProductVariants = async (req, res) => {
  try {
    const VinylProductVariant = await VinylProductVariantModel.find().populate("product", "name").lean();

    if (VinylProductVariant.length === 0) {
      return res.status(400).json({
        message: "Product Variant not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "Vinyl product Variant fetched successfully.",
      variantCount: VinylProductVariant.length,
      VinylProductVariants: VinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl product Variant due to ${error.message}`,
    });
  }
};

const deleteProductVariant = async (req, res) => {
  try {
    const VinylProductVariant = await VinylProductVariantModel.findById({
      _id: req.params._id,
    })

    if (VinylProductVariant.length === 0) {
      return res.status(404).json({
        message: "Product not found in any vinyl product variant.",
      });
    }

     const deletedVinylProductVariant = await VinylProductVariantModel.findOneAndDelete({
     _id: req.params._id,
    }
    );
    return res.status(200).json({
      message: "Vinyl product variant deleted successfully.",
      deletedVinylProductVariant,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl product variant: ${error.message}`,
    });
  }
};


module.exports = {
  createVinylProductVariant,
  updateVinylProductVariant,
<<<<<<< HEAD
  getVinylProductVariantsByProductName,
=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  getVinylProductVariant,
  getVinylProductVariants,
  deleteProductVariant,
};
