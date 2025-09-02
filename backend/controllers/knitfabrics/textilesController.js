const TextilesModel = require("../../models/knitfabrics/textilesModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const TagsModel = require("../../models/knitfabrics/tagsModel");

const createTextile = async (req, res) => {
  try {
    let { title, content, alt, lamination_content, coating_content, tags } =
      req.body;

    // Validate exclusive condition
    const hasContent = content && content.trim() !== "";
    const hasLamination =
      lamination_content && lamination_content.trim() !== "";
    const hasCoating = coating_content && coating_content.trim() !== "";

    if (hasContent && (hasLamination || hasCoating)) {
      return res.status(400).json({
        message:
          "You can either provide 'content' or 'lamination/coating content', not both.",
      });
    }

    if ((hasLamination || hasCoating) && hasContent) {
      return res.status(400).json({
        message:
          "Provide either lamination/coating content or content, not both.",
      });
    }

    let imageData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the image field.",
      });
    }

    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "textiles",
      resource_type: "image",
    });

    const filePath = path.resolve(file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    imageData = {
      filename: uploadResult.original_filename,
      filepath: uploadResult.secure_url,
    };

    const newTextile = new TextilesModel({
      image: imageData,
      title,
      content,
      alt,
      lamination_content,
      coating_content,
    });

    await newTextile.save();

    return res.status(200).json({
      message: "Textile added successfully.",
      newTextile,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding textile: ${error.message}`,
    });
  }
};

const updateTextile = async (req, res) => {
  try {
    const { title, content, alt, lamination_content, coating_content } =
      req.body;

    const currentTextile = await TextilesModel.findById(req.params._id);
    if (!currentTextile) {
      return res.status(404).json({ message: "Textile content not found." });
    }

    const hasContent = content && content.trim() !== "";
    const hasLamination =
      lamination_content && lamination_content.trim() !== "";
    const hasCoating = coating_content && coating_content.trim() !== "";

    if (hasContent && (hasLamination || hasCoating)) {
      return res.status(400).json({
        message:
          "You can either update 'content' or 'lamination/coating content', not both.",
      });
    }

    const updatedFields = {}; // ✅ Declare early

    const file = req.file;

    if (file) {
      const fileExtensionName = path.extname(file.originalname).toLowerCase();
      const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg"];

      if (!allowedExtensions.includes(fileExtensionName)) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .png, .jpg, or .jpeg image.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "textiles",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      updatedFields.image = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };
    } else {
      updatedFields.image = currentTextile.image;
    }

    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (lamination_content)
      updatedFields.lamination_content = lamination_content;
    if (coating_content) updatedFields.coating_content = coating_content;
    if (alt) updatedFields.alt = alt;

    const updatedTextile = await TextilesModel.findByIdAndUpdate(
      currentTextile._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Textile updated successfully.",
      updatedTextile,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating textile due to ${error.message || error}`,
    });
  }
};

const getTextile = async (req, res) => {
  try {
    const textile = await TextilesModel.findById(req.params._id);

    if (!textile) {
      return res.status(400).json({
        message: "No textile is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Textile fetched successfully.",
      textile,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching textile due to ${error.message}`,
    });
  }
};

const getTextiles = async (req, res) => {
  try {
    const textiles = await TextilesModel.find();

    if (textiles.length === 0) {
      return res.status(400).json({
        message: "Textile not added. Kindly add textile.",
      });
    }

    return res.status(200).json({
      message: "Textiles fetched successfully.",
      count: textiles.length,
      textiles,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching textiles due to ${error.message}`,
    });
  }
};

const deleteTextile = async (req, res) => {
  try {
    const textile = await TextilesModel.findById({
      _id: req.params._id,
    });

    if (textile.length === 0) {
      return res.status(400).json({
        message: "No feature added to delete. Kindly add one.",
      });
    }

    const deletedTextile = await TextilesModel.findByIdAndDelete(textile._id);

    const deletedTag = await TagsModel.deleteMany({
      textiles: _id,
    });
    return res.status(200).json({
      message: "Textile deleted successfully.",
      deletedTextile,
      deletedTag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting textile due to ${error.message}`,
    });
  }
};

module.exports = {
  createTextile,
  updateTextile,
  getTextile,
  getTextiles,
  deleteTextile,
};
