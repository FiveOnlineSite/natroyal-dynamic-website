const PlankSliderModel = require("../../models/lvt/plankSliderModel");
const PlankCategoryModel = require("../../models/lvt/plankCategoryModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createPlankSlider = async (req, res) => {
  try {
    const { name, code, alt, qr_alt, category_id } = req.body;

    const category = await PlankCategoryModel.findById(category_id);
    if (!category) {
      return res.status(404).json({ message: "Plank category not found." });
    }

    const imageFile = req.files?.image?.[0];
    const qrFile = req.files?.qr?.[0];

    const altText = alt?.trim();
    const qrAltText = qr_alt?.trim();

    if (imageFile && !altText) {
      return res.status(400).json({
        message: "Alt text is required when uploading an image.",
      });
    }

    if (qrFile && !qrAltText) {
      return res.status(400).json({
        message: "Alt text is required when uploading a QR image.",
      });
    }

    if (!imageFile) {
      return res.status(400).json({
        message: "Image file is required.",
      });
    }

    if (!qrFile) {
      return res.status(400).json({
        message: "QR image file is required.",
      });
    }

    // Validate file types only if files are provided
    const validExt = [".jpg", ".jpeg", ".png", ".webp"];

    if (imageFile) {
      const imageExt = path.extname(imageFile.originalname).toLowerCase();
      if (!validExt.includes(imageExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for image." });
      }
    }

    if (qrFile) {
      const qrExt = path.extname(qrFile.originalname).toLowerCase();
      if (!validExt.includes(qrExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for QR image." });
      }
    }

    const imageData = {
            filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
            filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageFile.key}` // keep "images/banners/..."
          };

    const qrData ={
            filename: path.basename(qrFile.key), // "1756968423495-2.jpg"
            filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${qrFile.key}` // keep "images/banners/..."
          };

    const newPlank = new PlankSliderModel({
      name,
      code,
      alt: altText,
      qr_alt: qrAltText,
      image: [imageData],
      qr: [qrData],
      category_id,
    });

    await newPlank.save();

    const populatedPlank = await PlankSliderModel.findById(
      newPlank._id
    ).populate("category_id", "title size");

    return res.status(200).json({
      message: "Added new plank successfully.",
      newPlank: populatedPlank,
    });
  } catch (error) {
    console.error("Error in createPlankSlider:", error);
    return res.status(500).json({
      message: `Error in adding new plank due to ${error.message}`,
    });
  }
};

const updatePlankSlider = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, code, alt, qr_alt, category_id } = req.body;

    // Check if plank exists
    const existingPlank = await PlankSliderModel.findById(_id);
    if (!existingPlank) {
      return res.status(404).json({ message: "Plank not found" });
    }

    let updatedCategoryId = existingPlank.category_id; // default to existing

    if (category_id) {
      const category = await PlankCategoryModel.findById(category_id);
      if (!category) {
        return res.status(404).json({ message: "Plank category not found." });
      }
      updatedCategoryId = category_id;
    }

    const imageFile = req.files?.image?.[0];
    const qrFile = req.files?.qr?.[0];

    const validExt = [".jpg", ".jpeg", ".png", ".webp"];

    let imageData = existingPlank.image?.[0] || null;
    let qrData = existingPlank.qr?.[0] || null;

    // Handle image update
    if (imageFile) {
      const imageExt = path.extname(imageFile.originalname).toLowerCase();
      if (!validExt.includes(imageExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for image." });
      }

      imageData = {
              filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
              filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageFile.key}` // keep "images/banners/..."
            };
    }

    // Handle QR update
    if (qrFile) {
      const qrExt = path.extname(qrFile.originalname).toLowerCase();
      if (!validExt.includes(qrExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for QR image." });
      }

      qrData = {
              filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
              filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${qrFile.key}` // keep "images/banners/..."
            };
    }

    // Validation if files were never uploaded before
    if (!imageData) {
      return res.status(400).json({ message: "Image file is required." });
    }
    if (!qrData) {
      return res.status(400).json({ message: "QR image file is required." });
    }

    const updated = await PlankSliderModel.findByIdAndUpdate(
      _id,
      {
        name,
        code,
        alt: alt,
        qr_alt: qr_alt,
        image: [imageData],
        qr: [qrData],
        category_id: updatedCategoryId,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Plank updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Error in updatePlankSlider:", error);
    return res.status(500).json({
      message: `Error updating plank: ${error.message}`,
    });
  }
};

const getPlankSlider = async (req, res) => {
  try {
    const plankSlider = await PlankSliderModel.findById(
      req.params._id
    ).populate("category_id");

    if (plankSlider.length === 0) {
      return res.status(400).json({
        message: "plank Slider not found",
      });
    }

    return res.status(200).json({
      message: "Vinyl plank Slider fetched successfully.",
      plankSlider,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl plank Slider due to ${error.message}`,
    });
  }
};

const getPlankSliders = async (req, res) => {
  try {
    const plankSliders = await PlankSliderModel.find().populate("category_id");

    if (plankSliders.length === 0) {
      return res.status(400).json({
        message: "Plank not created. Kindly create plank.",
      });
    }
    return res.status(200).json({
      message: "Planks fetched successfully.",
      count: plankSliders.length,
      plankSliders,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching planks due to ${error.message}`,
    });
  }
};

const deletePlankSlider = async (req, res) => {
  try {
    const plank = await PlankSliderModel.findById(req.params._id);

    if (plank.length === 0) {
      return res.status(400).json({
        message: "No vinyl plank added to delete. Kindly add one.",
      });
    }

    const deletedPlank = await PlankSliderModel.findByIdAndDelete(plank._id);

    return res.status(200).json({
      message: "Vinyl plank deleted successfully.",
      deletedPlank,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl plank due to ${error.message}`,
    });
  }
};

module.exports = {
  createPlankSlider,
  updatePlankSlider,
  getPlankSlider,
  getPlankSliders,
  deletePlankSlider,
};
