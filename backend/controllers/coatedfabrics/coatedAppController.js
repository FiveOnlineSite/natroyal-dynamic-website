const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const CoatedApplicationModel = require("../../models/coatedfabrics/coatedAppModel");
const CoatedAppContentModel = require("../../models/coatedfabrics/coatedAppContentModel");
const CoatedProductModel = require("../../models/coatedfabrics/coatedProductModel");

const createCoatedApp = async (req, res) => {
  try {
    const { alt, name } = req.body;

    const appWithSameName = await CoatedApplicationModel.findOne({
      name: name.trim(),
    });
    if (appWithSameName) {
      return res
        .status(400)
        .json({ message: "Application with this name already exists." });
    }

    let imageData = null;

    if (req.file) {
      const file = req.file;
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isImage)
        return res.status(400).json({ message: "Unsupported image type." });
      if (!alt || !alt.trim())
        return res.status(400).json({ message: "Alt text is required." });

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_applications",
      });

      imageData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };
      fs.unlinkSync(file.path);
    }

    const newCoatedApplication = new CoatedApplicationModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
    });

    await newCoatedApplication.save();

    res.status(200).json({
      message: "Coated application created successfully",
      newCoatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating coated application: ${error.message}`,
    });
  }
};

const updateCoatedApp = async (req, res) => {
  try {
    const { alt, name } = req.body;

    const _id = req.params._id;

    const file = req.file;

    if (name) {
      const duplicate = await CoatedApplicationModel.findOne({
        name: name.trim(),
        _id: { $ne: _id },
      });
      if (duplicate) {
        return res.status(400).json({
          message: "Another coated app with this name already exists.",
        });
      }
    }

    const coatedApplication = await CoatedApplicationModel.findById(_id);
    if (!coatedApplication) {
      return res.status(404).json({ message: "Coated application not found" });
    }

    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_applications",
        resource_type: "image",
      });
      try {
        fs.unlinkSync(file.path);
      } catch {}
      coatedApplication.image = [
        {
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        },
      ];
    }

    // update text fields
    if (alt !== undefined) coatedApplication.alt = alt;
    if (name !== undefined) coatedApplication.name = name;

    await coatedApplication.save();

    res.status(200).json({
      message: "Coated application updated successfully",
      coatedApplication,
    });
  } catch (error) {
    // full log in backend
    res.status(500).json({
      message: "Error updating vinyl coated application",
      error: error.message || error.toString(),
    });
  }
};

const getCoatedApp = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.findById(req.params._id);

    if (!coatedApp) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      message: "coated application fetched successfully.",
      application: coatedApp,
      // parentAppId: vinylApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated application due to ${error.message}`,
    });
  }
};

const getCoatedApps = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.find();

    if (coatedApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "coated applications fetched successfully.",
      applicationCount: coatedApp.length,
      coatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated applications due to ${error.message}`,
    });
  }
};

const deleteCoatedApp = async (req, res) => {
  try {
    const { _id } = req.params;

    const coatedApp = await CoatedApplicationModel.findById(_id);

    if (!coatedApp) {
      return res.status(400).json({
        message: "No coated application found to delete. Kindly add one.",
      });
    }

    // Step 3: If safe, delete the application
    const deletedCoatedApp = await CoatedApplicationModel.findOneAndDelete({
      _id,
    });

    const deletedCoatedProduct = await CoatedProductModel.deleteMany({
      application: _id,
    });

    const deletedCoatedAppContent = await CoatedAppContentModel.deleteMany({
      application: _id,
    });

    return res.status(200).json({
      message: "Coated application deleted successfully.",
      deletedCoatedApp,
      deletedCoatedAppContent,
      deletedCoatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Coated application due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedApp,
  updateCoatedApp,
  getCoatedApp,
  getCoatedApps,
  deleteCoatedApp,
};
