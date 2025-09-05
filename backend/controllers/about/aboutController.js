const aboutModel = require("../../models/about/aboutModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createAbout = async (req, res) => {
  try {
    const { video, content } = req.body;
    
    let aboutVideo = {};

    const file = req.file;
    if (!file) return res.status(400).json({ message: "File is required" });

        console.log(req.body)

    const ext = path.extname(file.originalname).toLowerCase();
    const isVideo = [".mp4"].includes(ext);

    if (!isVideo) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload an video (.mp4).",
        });
      }

    const maxVideoSize = 10 * 1024 * 1024; // 10 MB

    if (isVideo & file.size > maxVideoSize){
    return res.status(400).json({
      message: "Video size should be max 10 mb"
      })}

      aboutVideo = {
        filename: path.basename(file.key), // "1756968423495-2.jpg"
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
      };

    const newAbout = new aboutModel({
      video: aboutVideo,
      content,
    });

    await newAbout.save();

    return res.status(200).json({
      message: "Added about content successfully.",
      newAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding about content due to ${error.message}`,
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const content = req.body?.content;

    const currentAbout = await aboutModel.findOne({});
    if (!currentAbout) {
      return res.status(404).json({ message: "About content not found." });
    }

    let aboutVideo = currentAbout.video;

    if (req.file) {
      const file = req.file;
      const ext = path.extname(file.originalname).toLowerCase();

      if (ext !== ".mp4") {
        return res.status(400).json({
          message: "Unsupported file type. Please upload a video (.mp4).",
        });
      }

      if (file.size > 10 * 1024 * 1024) {
        return res.status(400).json({ message: "Video size should be max 10 MB" });
      }

      aboutVideo = {
        filename: path.basename(file.key), // "1756968423495-2.jpg"
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
      };
    }

    if (aboutVideo) currentAbout.video = aboutVideo;
    if (content) currentAbout.content = content;

    await currentAbout.save();

    return res.status(200).json({
      message: "About content updated successfully.",
      updatedAbout: currentAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating about content due to ${error.message}`,
    });
  }
};

const getAbout = async (req, res) => {
  try {
    const about = await aboutModel.find();

    if (about.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "About content fetched successfully.",
      count: about.length,
      about,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching about content due to ${error.message}`,
    });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const aboutContent = await aboutModel.findOne({});

    if (aboutContent.length === 0) {
      return res.status(400).json({
        message: "No about content added to delete. Kindly add one.",
      });
    }

    const deletedAbout = await aboutModel.findByIdAndDelete(aboutContent._id);

    return res.status(200).json({
      message: "About content deleted successfully.",
      deletedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createAbout,
  updateAbout,
  getAbout,
  //   getAbouts,
  deleteAbout,
};
