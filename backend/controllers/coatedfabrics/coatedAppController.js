const CoatedApplicationModel = require("../../models/coatedfabrics/coatedAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createCoatedApp = async (req, res) => {
  try {
    const { alt, name } = req.body;

   // Check if variant with same name exists
    const appWithSameName = await CoatedApplicationModel.findOne({ name: name.trim() });
    if (appWithSameName) {
      return res.status(400).json({ message: "Application with this name already exists." });
    }

    let imageData = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res.status(400).json({ message: "Unsupported image type." });
        }

        if (!alt || !alt.trim()) {
          return res.status(400).json({ message: "Alt text is required." });
        }

        console.log("Uploading file to Cloudinary:", req.file?.path || req.body?.image);

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "coated_applications",
        });
        console.log("Cloudinary upload result:", uploadResult);


        imageData.push({
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        });

        fs.unlinkSync(file.path); 
      }
    }

    const newCoatedApplication = new CoatedApplicationModel({
      image: imageData,
      alt,
      name,
    });

    await newCoatedApplication.save();
            
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

    if (name) {
      const duplicate = await CoatedApplicationModel.findOne({
        name: name.trim(),
        _id: { $ne: _id },
      });
      if (duplicate) {
        return res.status(400).json({ message: "Another coated app with this name already exists." });
      }
    }

    const coatedApplication = await CoatedApplicationModel.findById(_id);
    if (!coatedApplication) {
      return res.status(404).json({ message: "Coated application not found" });
    }

    if (req.files && req.files.length > 0) {
    const images = [];
    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "coated_applications",
        resource_type: "image",
      });

      console.log("Cloudinary upload result:", uploadResult);

      try { fs.unlinkSync(file.path); } catch {}

      images.push({
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      });
    }

    coatedApplication.image = images; // overwrite existing images
  }

      // update text fields
      if (alt !== undefined) coatedApplication.alt = alt;
      if (name !== undefined) coatedApplication.name = name;
    
      await coatedApplication.save();

      res.status(200).json({
        message: "Coated application updated successfully",
        coatedApplication
      });

    } catch (error) {
    console.error("Update variant error:", error); // full log in backend
    res.status(500).json({ 
      message: "Error updating vinyl product variant", 
      error: error.message || error.toString() 
    });
  }
};

const getSingleCoatedApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const coatedApp = await CoatedApplicationModel.findOne({
      "application._id": new mongoose.Types.ObjectId(applicationId),
    });

    if (!coatedApp) {
      return res.status(404).json({
        message: "Application not found in any coated application document.",
      });
    }

    const matchedApp = coatedApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!matchedApp) {
      return res
        .status(404)
        .json({ message: "Application not found in array." });
    }

    return res.status(200).json({
      message: "Coated application fetched successfully.",
      application: matchedApp,
      // parentAppId: coatedApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated application due to ${error.message}`,
    });
  }
};

const getCoatedApp = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.find();

    if (coatedApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    const totalApps = coatedApp.reduce(
      (acc, doc) => acc + (doc.application?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Coated applications fetched successfully.",
      applicationCount: totalApps,
      coatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated applications due to ${error.message}`,
    });
  }
};

const deleteSingleApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const coatedApp = await CoatedApplicationModel.findOne({
      "application._id": applicationId,
    });

    if (!coatedApp) {
      return res.status(404).json({
        message: "App not found in any coated application.",
      });
    }

    const deletedCoatedApp = coatedApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!deletedCoatedApp) {
      return res.status(404).json({
        message: "Application not found in the array.",
      });
    }

    const updatedCoatedApp = await CoatedApplicationModel.findByIdAndUpdate(
      coatedApp._id,
      {
        $pull: { application: { _id: applicationId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Coated application deleted successfully.",
      deletedCoatedApp,
      updatedCoatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting application from coated application: ${error.message}`,
    });
  }
};

const deleteCoatedApp = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.findOne({});

    if (coatedApp.length === 0) {
      return res.status(400).json({
        message: "No coated application added to delete. Kindly add one.",
      });
    }

    const deletedCoatedApp = await CoatedApplicationModel.findByIdAndDelete(
      coatedApp._id
    );

    return res.status(200).json({
      message: "Coated application deleted successfully.",
      deletedCoatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting coated application due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedApp,
  updateCoatedApp,
  getSingleCoatedApp,
  getCoatedApp,
  deleteSingleApp,
  deleteCoatedApp,
};
