const suitableModel = require("../../models/vinylflooring/suitableModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createSuitable = async (req, res) => {
  try {
    const { image, alt, name, link, product_id, category_id } = req.body;

    let imageData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the image field.",
      });
    }

    // Check image extension
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "suitables",
      resource_type: "image",
    });

    const filePath = path.resolve(file.path);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Temp file deleted:", filePath);
      } else {
        console.warn("File not found for deletion:", filePath);
      }
    } catch (err) {
      console.error("Error deleting temp file:", err.message);
    }

    imageData = {
      filename: uploadResult.original_filename,
      filepath: uploadResult.secure_url,
    };

    const newSuitable = new suitableModel({
      image: imageData,
      alt,
      name,
      link,
      product_id,
      category_id,
    });

    await newSuitable.save();

    return res.status(200).json({
      message: "Suitable added successfully.",
      newSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding suitable: ${error.message}`,
    });
  }
};

const updateSuitable = async (req, res) => {
  try {
    const { image, alt, name, link, category_id, product_id } = req.body;

    const currentSuitable = await suitableModel.findById(req.params._id);

    if (!currentSuitable) {
      return res.status(404).json({ message: "Suitable data not found." });
    }

    const file = req.file;

    const updatedFields = {};

    if (file) {
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "suitables",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Temp file deleted:", filePath);
        } else {
          console.warn("File not found for deletion:", filePath);
        }
      } catch (err) {
        console.error("Error deleting temp file:", err.message);
      }

      imageData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };

      updatedFields.image = imageData;
    } else {
      // Preserve the existing logo if no new file uploaded
      updatedFields.image = currentSuitable.image;
    }

    if (alt) updatedFields.alt = alt;
    if (name) updatedFields.name = name;
    if (link) updatedFields.link = link;
    if (product_id) updatedFields.product_id = product_id;
    if (category_id) updatedFields.category_id = category_id;

    const updatedSuitable = await suitableModel.findByIdAndUpdate(
      currentSuitable._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Suitable data updated successfully.",
      updatedSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating suitable data due to ${error.message}`,
    });
  }
};

const getSuitable = async (req, res) => {
  try {
    const suitable = await suitableModel.findById(req.params._id);

    if (!suitable) {
      return res.status(400).json({
        message: "No suitable is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Suitable fetched successfully.",
      suitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching suitable due to ${error.message}`,
    });
  }
};

const getSuitables = async (req, res) => {
  try {
    const suitables = await suitableModel.find();

    if (suitables.length === 0) {
      return res.status(400).json({
        message: "Suitable not created. Kindly create suitable.",
      });
    }
    return res.status(200).json({
      message: "Suitables fetched successfully.",
      count: suitables.length,
      suitables,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching suitable due to ${error.message}`,
    });
  }
};

const deleteSuitable = async (req, res) => {
  try {
    const suitable = await suitableModel.findById({
      _id: req.params._id,
    });

    if (suitable.length === 0) {
      return res.status(400).json({
        message: "No suitable added to delete. Kindly add one.",
      });
    }

    const deletedSuitable = await suitableModel.findByIdAndDelete(suitable._id);

    return res.status(200).json({
      message: "Suitable deleted successfully.",
      deletedSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting suitable due to ${error.message}`,
    });
  }
};

module.exports = {
  createSuitable,
  updateSuitable,
  getSuitable,
  getSuitables,
  deleteSuitable,
};
