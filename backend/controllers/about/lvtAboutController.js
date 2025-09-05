const lvtAboutModel = require("../../models/about/lvtAboutModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createLvtAbout = async (req, res) => {
  try {
    const { title1, title2, subtitle, content, image, alt } =
      req.body;

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

    imageData = {
      filename: path.basename(file.key), // "1756968423495-2.jpg"
      filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
    };

    const newLvtAbout = new lvtAboutModel({
      title1,
      title2,
      subtitle,
      content,
      image: imageData,
      alt,
    });

    await newLvtAbout.save();

    return res.status(200).json({
      message: "Added lvt about content successfully.",
      newLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding lvt about content due to ${error.message}`,
    });
  }
};

const updateLvtAbout = async (req, res) => {
  try {
    const { title1, title2, subtitle, content, image, alt } =
      req.body;

    const currentLvtAbout = await lvtAboutModel.findOne({});

    if (!currentLvtAbout) {
      return res.status(404).json({ message: "About content not found." });
    }

    const file = req.file;

    const updatedFields = {};

    if (file) {
      const fileExtensionName = path.extname(file.originalname).toLowerCase();

      const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg"];

      if (!allowedExtensions.includes(fileExtensionName)) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .png, .jpg, or .jpeg image.",
        });
      }


      const imageData = {
        filename: path.basename(file.key), // "1756968423495-2.jpg"
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
      };

      updatedFields.image = imageData;
    } else {
      // Preserve the existing logo if no new file uploaded
      updatedFields.image = currentLvtAbout.image;
    }

    if (typeof title1 !== "undefined")
      updatedFields.title1 = title1;
    if (typeof title2 !== "undefined")
      updatedFields.title2 = title2;
    if (typeof subtitle !== "undefined") updatedFields.subtitle = subtitle;
    if (typeof content !== "undefined") updatedFields.content = content;
    if (typeof alt !== "undefined") updatedFields.alt = alt;

    const updatedLvtAbout = await lvtAboutModel.findByIdAndUpdate(
      currentLvtAbout._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Lvt about content updated successfully.",
      updatedLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating lvt about content due to ${
        error.message || error
      }`,
    });
  }
};

const getLvtAbout = async (req, res) => {
  try {
    const lvtAbout = await lvtAboutModel.find();

    if (lvtAbout.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "Lvt about content fetched successfully.",
      count: lvtAbout.length,
      lvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt about content due to ${error.message}`,
    });
  }
};

const deleteLvtAbout = async (req, res) => {
  try {
    const lvtAboutContent = await lvtAboutModel.findOne({});

    if (lvtAboutContent.length === 0) {
      return res.status(400).json({
        message: "No lvt about content added to delete. Kindly add one.",
      });
    }

    const deletedLvtAbout = await lvtAboutModel.findByIdAndDelete(
      lvtAboutContent._id
    );

    return res.status(200).json({
      message: "Lvt about content deleted successfully.",
      deletedLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting lvt about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createLvtAbout,
  updateLvtAbout,
  getLvtAbout,
  //   getLvtAbouts,
  deleteLvtAbout,
};
