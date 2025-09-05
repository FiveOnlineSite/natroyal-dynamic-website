const coatedFeaturesModel = require("../../models/features/coatedFeaturesModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createCoatedFeature = async (req, res) => {
  try {
    const { icon, alt, name } = req.body;

    let iconData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the icon field.",
      });
    }

    // Check icon extension
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png icon.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "coated_features_icons",
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

    iconData = {
      filename: uploadResult.original_filename,
      filepath: uploadResult.secure_url,
    };

    const newCoatedFeature = new coatedFeaturesModel({
      icon: iconData,
      alt,
      name,
    });

    await newCoatedFeature.save();

    return res.status(200).json({
      message: "Coated feature added successfully.",
      newCoatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding coated feature: ${error.message}`,
    });
  }
};

const updateCoatedFeature = async (req, res) => {
  try {
    const { icon, alt, name } = req.body;

    const currentCoatedFeature = await coatedFeaturesModel.findById(
      req.params._id
    );

    if (!currentCoatedFeature) {
      return res.status(404).json({ message: "Feature content not found." });
    }

    const file = req.file;

    const updatedFields = {};

    if (file) {
      const fileExtensionName = path.extname(file.originalname).toLowerCase();

      const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg"];

      if (!allowedExtensions.includes(fileExtensionName)) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .png, .jpg, or .jpeg icon.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_features_icons",
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

      const iconData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };

      updatedFields.icon = iconData;
    } else {
      // Preserve the existing logo if no new file uploaded
      updatedFields.icon = currentCoatedFeature.icon;
    }

    if (name) updatedFields.name = name;
    if (alt) updatedFields.alt = alt;

    const updatedCoatedFeature = await coatedFeaturesModel.findByIdAndUpdate(
      currentCoatedFeature._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Coated feature updated successfully.",
      updatedCoatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating coated feature due to ${
        error.message || error
      }`,
    });
  }
};

const getCoatedFeature = async (req, res) => {
  try {
    const coatedFeature = await coatedFeaturesModel.findById(req.params._id);

    if (!coatedFeature) {
      return res.status(400).json({
        message: "No coatedFeature is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Coated feature fetched successfully.",
      coatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated feature due to ${error.message}`,
    });
  }
};

const getCoatedFeatures = async (req, res) => {
  try {
    const coatedFeatures = await coatedFeaturesModel.find();

    if (coatedFeatures.length === 0) {
      return res.status(400).json({
        message: "Feature not added. Kindly add coatedFeature.",
      });
    }
    return res.status(200).json({
      message: "Coated features fetched successfully.",
      count: coatedFeatures.length,
      coatedFeatures,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated features due to ${error.message}`,
    });
  }
};

const deleteCoatedFeature = async (req, res) => {
  try {
    const coatedFeature = await coatedFeaturesModel.findById({
      _id: req.params._id,
    });

    if (coatedFeature.length === 0) {
      return res.status(400).json({
        message: "No feature added to delete. Kindly add one.",
      });
    }

    const deletedCoatedFeature = await coatedFeaturesModel.findByIdAndDelete(
      coatedFeature._id
    );

    return res.status(200).json({
      message: "Coated feature deleted successfully.",
      deletedCoatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting coated feature due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedFeature,
  updateCoatedFeature,
  getCoatedFeature,
  getCoatedFeatures,
  deleteCoatedFeature,
};
