const PlankModel = require("../../models/lvt/plankModel");
const path = require("path");

const createPlank = async (req, res) => {
  try {
    const { title1, title2, subtitle } = req.body;

    const file = req.file;

    // Check if brochure file is provided
    if (!file) {
      return res.status(400).json({ message: "Brochure file is required." });
    }

    const brochureExt = path.extname(file.originalname).toLowerCase();
    if (brochureExt !== ".pdf") {
      return res
        .status(400)
        .json({ message: "Only PDF file are allowed for brochure." });
    }

    const brochureData = {
        filename: path.basename(file.key), // "1756968423495-2.jpg"
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
      };

    const newPlank = new PlankModel({
      title1,
      title2,
      subtitle,
      brochure: brochureData,
    });

    await newPlank.save();

    res.status(200).json({
      message: "Plank added successfully.",
      newPlank,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error adding Plank: ${error.message}`,
    });
  }
};

const updatePlank = async (req, res) => {
  try {
    const { title1, title2, subtitle } = req.body;
    const currentPlank = await PlankModel.findOne({});

    if (!currentPlank) {
      return res.status(404).json({ message: "Plank not found." });
    }

    const updatedFields = {};

    const file = req.file;

    if (file) {
      const brochureExt = path.extname(file.originalname).toLowerCase();
      if (brochureExt !== ".pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF file are allowed for brochure." });
      }

      const brochureData = {
        filename: path.basename(file.key), // "1756968423495-2.jpg"
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
      };

      updatedFields.brochure = brochureData;
    }

    if (typeof title1 !== "undefined")
      updatedFields.title1 = title1;
    if (typeof title2 !== "undefined")
      updatedFields.title2 = title2;
    if (typeof subtitle !== "undefined") updatedFields.subtitle = subtitle;

    const updatedPlank = await PlankModel.findByIdAndUpdate(
      currentPlank._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Plank updated successfully.",
      updatedPlank,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating Plank: ${error.message}`,
    });
  }
};

const getPlank = async (req, res) => {
  try {
    const plank = await PlankModel.findOne({});

    if (!plank) {
      return res.status(400).json({
        message: "No plank is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Plank fetched successfully.",
      plank,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching plank due to ${error.message}`,
    });
  }
};

const deletePlank = async (req, res) => {
  try {
    const plank = await PlankModel.findOne({});

    if (plank.length === 0) {
      return res.status(400).json({
        message: "No Plank added to delete. Kindly add one.",
      });
    }

    const deletedPlank = await PlankModel.findByIdAndDelete(plank._id);

    return res.status(200).json({
      message: "Plank deleted successfully.",
      deletedPlank,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Plank due to ${error.message}`,
    });
  }
};

module.exports = {
  createPlank,
  updatePlank,
  getPlank,
  deletePlank,
};
