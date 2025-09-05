const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const CoatedFeatureModel = require("../../models/features/coatedFeaturesModel");

const createCoatedFeature = async (req, res) => {
  try {
    const { alt, name } = req.body;

    const featureWithSameName = await CoatedFeatureModel.findOne({
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
        folder: "coated_feature_icon",
      });

      iconData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };
      fs.unlinkSync(file.path);
    }

    const newFeature = new CoatedFeatureModel({
      icon: iconData ? [iconData] : [],
      alt,
      name,
    });

    await newFeature.save();

    res.status(200).json({
      message: "Coated Feature created successfully",
      newFeature,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating Coated Feature: ${error.message}`,
    });
  }
};

// const updateCoatedFeature = async (req, res) => {
//   try {
//     const { alt, name } = req.body;

//     const _id = req.params._id;

//     const file = req.file;

//     if (name) {
//       const duplicate = await CoatedFeatureModel.findOne({
//         name: name.trim(),
//         _id: { $ne: _id },
//       });
//       if (duplicate) {
//         return res.status(400).json({
//           message: "Another Coated feature with this name already exists.",
//         });
//       }
//     }

//     const CoatedFeature = await CoatedFeatureModel.findById(_id);
//     if (!CoatedFeature) {
//       return res.status(404).json({ message: "Coated Feature not found" });
//     }

//     if (file) {
//       const ext = path.extname(file.originalname).toLowerCase();
//       if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
//         return res
//           .status(400)
//           .json({ message: `Unsupported file type: ${file.originalname}` });
//       }
//       const uploadResult = await cloudinary.uploader.upload(file.path, {
//         folder: "coated_feature_icon",
//         resource_type: "icon",
//       });
//       try {
//         fs.unlinkSync(file.path);
//       } catch {}
//       CoatedFeature.icon = [
//         {
//           filename: uploadResult.original_filename,
//           filepath: uploadResult.secure_url,
//         },
//       ];
//     }

//     // update text fields
//     if (alt !== undefined) CoatedFeature.alt = alt;
//     if (name !== undefined) CoatedFeature.name = name;

//     await CoatedFeature.save();

//     res.status(200).json({
//       message: "Coated Feature updated successfully",
//       CoatedFeature,
//     });
//   } catch (error) {
//     // full log in backend
//     res.status(500).json({
//       message: "Error updating Coated Feature",
//       error: error.message || error.toString(),
//     });
//   }
// };


const updateCoatedFeature = async (req, res) => {
  try {
    const { icon, alt, name } = req.body;

    const currentCoatedFeature = await CoatedFeatureModel.findById(
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

    const updatedCoatedFeature = await CoatedFeatureModel.findByIdAndUpdate(
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
    const CoatedFeature = await CoatedFeatureModel.findById(req.params._id);

    if (!CoatedFeature) {
      return res.status(404).json({
        message: "Feature not found.",
      });
    }

    return res.status(200).json({
      message: "Coated Feature fetched successfully.",
      Feature: CoatedFeature,
      // parentAppId: vinylApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Coated Feature due to ${error.message}`,
    });
  }
};

const getCoatedFeatures = async (req, res) => {
  try {
    const CoatedFeature = await CoatedFeatureModel.find();

    if (CoatedFeature.length === 0) {
      return res.status(400).json({
        message: "Feature not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "Coated Features fetched successfully.",
      featureCount: CoatedFeature.length,
      CoatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Coated Features due to ${error.message}`,
    });
  }
};

const deleteCoatedFeature = async (req, res) => {
  try {
    const { _id } = req.params;

    const CoatedFeature = await CoatedFeatureModel.findById(_id);

    if (!CoatedFeature) {
      return res.status(400).json({
        message: "No Coated Feature found to delete. Kindly add one.",
      });
    }

    // Step 3: If safe, delete the Feature
    const deletedCoatedFeature = await CoatedFeatureModel.findOneAndDelete({
      _id,
    });

    return res.status(200).json({
      message: "Coated Feature deleted successfully.",
      deletedCoatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Coated Feature due to ${error.message}`,
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
