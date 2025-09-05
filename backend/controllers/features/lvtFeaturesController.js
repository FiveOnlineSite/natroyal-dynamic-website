const lvtFeaturesModel = require("../../models/features/lvtFeaturesModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createLvtFeature = async (req, res) => {
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
      folder: "lvt_features_icons",
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

    const newLvtFeature = new lvtFeaturesModel({
      icon: iconData,
      alt,
      name,
    });

    await newLvtFeature.save();

    return res.status(200).json({
      message: "Lvt feature added successfully.",
      newLvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding lvt feature: ${error.message || error}`,
    });
  }
};

const updateLvtFeature = async (req, res) => {
  try {
    const { icon, alt, name } = req.body;

    const currentLvtFeature = await lvtFeaturesModel.findById(req.params._id);

    if (!currentLvtFeature) {
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
        folder: "lvt_features_icons",
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
      updatedFields.icon = currentLvtFeature.icon;
    }

    if (name) updatedFields.content = name;
    if (alt) updatedFields.alt = alt;

    const updatedLvtFeature = await lvtFeaturesModel.findByIdAndUpdate(
      currentLvtFeature._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Lvt feature updated successfully.",
      updatedLvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating lvt feature due to ${error.message || error}`,
    });
  }
};

const getLvtFeature = async (req, res) => {
  try {
    const lvtFeature = await lvtFeaturesModel.findById(req.params._id);

    if (!lvtFeature) {
      return res.status(400).json({
        message: "No feature is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Lvt feature fetched successfully.",
      lvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt feature due to ${error.message}`,
    });
  }
};

const getLvtFeatures = async (req, res) => {
  try {
    const lvtFeatures = await lvtFeaturesModel.find();

    if (lvtFeatures.length === 0) {
      return res.status(400).json({
        message: "Feature not added. Kindly add feature.",
      });
    }
    return res.status(200).json({
      message: "Lvt features fetched successfully.",
      count: lvtFeatures.length,
      lvtFeatures,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt features due to ${error.message}`,
    });
  }
};

const deleteLvtFeature = async (req, res) => {
  try {
    const lvtFeature = await lvtFeaturesModel.findById({
      _id: req.params._id,
    });

    if (lvtFeature.length === 0) {
      return res.status(400).json({
        message: "No feature added to delete. Kindly add one.",
      });
    }

    const deletedLvtFeature = await lvtFeaturesModel.findByIdAndDelete(
      lvtFeature._id
    );

    return res.status(200).json({
      message: "Lvt feature deleted successfully.",
      deletedLvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting lvt feature due to ${error.message}`,
    });
  }
};

module.exports = {
  createLvtFeature,
  updateLvtFeature,
  getLvtFeature,
  getLvtFeatures,
  deleteLvtFeature,
};
