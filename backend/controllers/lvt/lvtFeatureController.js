const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const LvtFeatureModel = require("../../models/features/lvtFeaturesModel");

const createLvtFeature = async (req, res) => {
  try {
    const { alt, name } = req.body;

    const featureWithSameName = await LvtFeatureModel.findOne({
      name: name.trim(),
    });
    if (featureWithSameName) {
      return res
        .status(400)
        .json({ message: "Feature with this name already exists." });
    }

    let iconData = null;

    if (req.file) {
      const file = req.file;
      const extname = path.extname(file.originalname).toLowerCase();
      const isicon = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isicon)
        return res.status(400).json({ message: "Unsupported icon type." });
      if (!alt || !alt.trim())
        return res.status(400).json({ message: "Alt text is required." });

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "lvt_feature_icon",
      });

      iconData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };
      fs.unlinkSync(file.path);
    }

    const newFeature = new LvtFeatureModel({
      icon: iconData ? [iconData] : [],
      alt,
      name,
    });

    await newFeature.save();

    res.status(200).json({
      message: "lvt Feature created successfully",
      newFeature,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating lvt Feature: ${error.message}`,
    });
  }
};

const updateLvtFeature = async (req, res) => {
  try {
    const { alt, name } = req.body;

    const _id = req.params._id;

    const file = req.file;

    if (name) {
      const duplicate = await LvtFeatureModel.findOne({
        name: name.trim(),
        _id: { $ne: _id },
      });
      if (duplicate) {
        return res.status(400).json({
          message: "Another lvt feature with this name already exists.",
        });
      }
    }

    const lvtFeature = await LvtFeatureModel.findById(_id);
    if (!lvtFeature) {
      return res.status(404).json({ message: "lvt Feature not found" });
    }

    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "lvt_feature_icon",
        resource_type: "icon",
      });
      try {
        fs.unlinkSync(file.path);
      } catch {}
      lvtFeature.icon = [
        {
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        },
      ];
    }

    // update text fields
    if (alt !== undefined) lvtFeature.alt = alt;
    if (name !== undefined) lvtFeature.name = name;

    await lvtFeature.save();

    res.status(200).json({
      message: "lvt Feature updated successfully",
      lvtFeature,
    });
  } catch (error) {
    // full log in backend
    res.status(500).json({
      message: "Error updating lvt Feature",
      error: error.message || error.toString(),
    });
  }
};

const getLvtFeature = async (req, res) => {
  try {
    const lvtFeature = await LvtFeatureModel.findById(req.params._id);

    if (!lvtFeature) {
      return res.status(404).json({
        message: "Feature not found.",
      });
    }

    return res.status(200).json({
      message: "lvt Feature fetched successfully.",
      Feature: lvtFeature,
      // parentAppId: vinylApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt Feature due to ${error.message}`,
    });
  }
};

const getLvtFeatures = async (req, res) => {
  try {
    const lvtFeature = await LvtFeatureModel.find();

    if (lvtFeature.length === 0) {
      return res.status(400).json({
        message: "Feature not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "lvt Features fetched successfully.",
      featureCount: lvtFeature.length,
      lvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt Features due to ${error.message}`,
    });
  }
};

const deletelvtFeature = async (req, res) => {
  try {
    const { _id } = req.params;

    const lvtFeature = await LvtFeatureModel.findById(_id);

    if (!lvtFeature) {
      return res.status(400).json({
        message: "No lvt Feature found to delete. Kindly add one.",
      });
    }

    // Step 3: If safe, delete the Feature
    const deletedlvtFeature = await LvtFeatureModel.findOneAndDelete({
      _id,
    });

    return res.status(200).json({
      message: "lvt Feature deleted successfully.",
      deletedlvtFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting lvt Feature due to ${error.message}`,
    });
  }
};

module.exports = {
  createLvtFeature,
  updateLvtFeature,
  getLvtFeature,
  getLvtFeatures,
  deletelvtFeature,
};
