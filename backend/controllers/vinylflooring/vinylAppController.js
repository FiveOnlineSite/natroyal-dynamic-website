const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const VinylAppContentModel = require("../../models/vinylflooring/vinylAppContentModel");
const SuitableModel = require("../../models/vinylflooring/suitableModel");

const createVinylApp = async (req, res) => {
  try {
    const { alt, icon_alt, name, content, link } = req.body;

    const existingApp = await VinylApplicationModel.findOne({
      name: name.trim(),
    });
    if (existingApp) {
      return res
        .status(400)
        .json({ message: "Application with this name already exists." });
    }

    let imageData = {};
    let iconData = {};

    if (req.files && req.files.image && req.files.image[0]) {
      const imageFile = req.files.image[0];
      const extname = path.extname(imageFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({ message: "Unsupported image type." });
      }
      if (!alt || alt.trim() === "") {
        return res
          .status(400)
          .json({ message: "Alt text is required for image." });
      }

     
      imageData =  {
                 filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageFile.key}` // keep "images/banners/..."
                }
    }

    // Handle icon upload
    if (req.files && req.files.icon && req.files.icon[0]) {
      const iconFile = req.files.icon[0];
      const extname = path.extname(iconFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({ message: "Unsupported icon type." });
      }
      if (!icon_alt || icon_alt.trim() === "") {
        return res
          .status(400)
          .json({ message: "Alt text is required for icon." });
      }


      iconData =  {
                 filename: path.basename(iconFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${iconFile.key}` // keep "images/banners/..."
                }
    }

    const newVinylApplication = new VinylApplicationModel({
      image: imageData ? [imageData] : [],
      alt,
      icon: iconData ? [iconData] : [],
      icon_alt,
      name,
      content,
      link,
    });

    await newVinylApplication.save();

    return res.status(201).json({
      message: "Vinyl application created successfully",
      newVinylApplication,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating vinyl application: ${error.message}` });
  }
};

const updateVinylApp = async (req, res) => {
  try {
    const { alt, icon_alt, name, content, link } = req.body;
    const appId = req.params._id;

    // Check duplicate name (excluding current app)
    if (name) {
      const duplicate = await VinylApplicationModel.findOne({
        name: name.trim(),
        _id: { $ne: appId },
      });
      if (duplicate) {
        return res.status(400).json({
          message: "Another application with this name already exists.",
        });
      }
    }

    let updateData = {};

    if (req.files?.image?.[0]) {
      const file = req.files.image[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type." });
      }

      updateData.image = [
        {
                         filename: path.basename(file.key), // "1756968423495-2.jpg"
                         filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                        }
      ];
    }

    if (req.files?.icon?.[0]) {
      const file = req.files.icon[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported icon type." });
      }
      updateData.icon = [
        {
                         filename: path.basename(file.key), // "1756968423495-2.jpg"
                         filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                        }
      ];
    }

    // Add text fields (only if provided)
    if (alt !== undefined) updateData.alt = alt;
    if (icon_alt !== undefined) updateData.icon_alt = icon_alt;
    if (name !== undefined) updateData.name = name;
    if (content !== undefined) updateData.content = content;
    if (link !== undefined) updateData.link = link;

    const updatedApp = await VinylApplicationModel.findByIdAndUpdate(
      appId,
      { $set: updateData },
      { new: true } // return updated doc
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found." });
    }

    return res.status(200).json({
      message: "Vinyl application updated successfully",
      updatedApplication: updatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating vinyl application: ${error.message}`,
    });
  }
};

const getVinylAppAndProduct = async (req, res) => {
  try {

    const appWithProduct = await VinylApplicationModel.find().populate("products name");

    if (!appWithProduct) {
      return res.status(404).json({ message: "Vinyl application and product not found" });
    }

    return res.status(200).json({
      message: "application and product fetched successfully.",
      appWithProduct,
    });
  } catch (err) {
    console.error("Error fetching vinyl application and product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getVinylAppByName = async (req, res) => {
  try {
    let name = req.params.name || "";

    // normalize param (convert "royal-star" → "royal-star")
    const normalize = (str) =>
      str?.toLowerCase().replace(/[-\s]+/g, "-"); 

    // fetch all applications
    const applications = await VinylApplicationModel.find();

    // find the one that matches after normalization
    const application = applications.find(
      (c) => normalize(c?.name) === normalize(name)
    );

    if (!application) {
      return res.status(404).json({ message: "Vinyl application not found" });
    }

    return res.status(200).json({
      message: "application fetched successfully.",
      application,
    });
  } catch (err) {
    console.error("Error fetching vinyl application:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getVinylApp = async (req, res) => {
  try {
    const vinylApp = await VinylApplicationModel.findById(req.params._id);

    if (!vinylApp) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      message: "Vinyl application fetched successfully.",
      application: vinylApp,
      // parentAppId: vinylApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl application due to ${error.message}`,
    });
  }
};

const getAllVinylApps = async (req, res) => {
  try {
    const vinylApp = await VinylApplicationModel.find();

    if (vinylApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "Vinyl applications fetched successfully.",
      applicationCount: vinylApp.length,
      vinylApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl applications due to ${error.message}`,
    });
  }
};

const deleteVinylApp = async (req, res) => {
  try {
    const { _id } = req.params;

    const objectId = new mongoose.Types.ObjectId(_id);

    const vinylApp = await VinylApplicationModel.findById(objectId);
    if (!vinylApp) {
      return res.status(400).json({
        message: "No vinyl application found to delete. Kindly add one.",
      });
    }

    // Step 1: Find products linked to this application
    const productsLinked = await VinylProductModel.find({
      applications: objectId,
    });

    for (const product of productsLinked) {
      
        await VinylProductModel.updateOne(
          { _id: product._id },
          { $pull: { applications: objectId } }
        );
    }

    // Step 3: delete application and related content
    const deletedVinylApp = await VinylApplicationModel.findByIdAndDelete(objectId);
    const deletedVinylAppContent = await VinylAppContentModel.deleteMany({
      application: objectId,
    });

    const deletedSuitable = await SuitableModel.deleteMany({
      application: objectId,
    });

    return res.status(200).json({
      message: "Vinyl application deleted successfully.",
      deletedVinylApp,
      deletedVinylAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl application due to ${error.message}`,
    });
  }
};


module.exports = {
  createVinylApp,
  updateVinylApp,
  getVinylAppAndProduct,
  getVinylAppByName,
  getVinylApp,
  getAllVinylApps,
  deleteVinylApp,
};
