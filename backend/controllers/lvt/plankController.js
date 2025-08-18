const PlankModel = require("../../models/lvt/plankModel");
const path = require("path");

const createPlank = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle } = req.body;

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
      filename: file.filename,
      filepath: path.join("uploads/plank_brochure", file.filename),
    };

    const newPlank = new PlankModel({
      yellow_title,
      black_title,
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
    const { yellow_title, black_title, subtitle } = req.body;
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
        filename: file.filename,
        filepath: path.join("uploads/plank_brochure", file.filename),
      };

      updatedFields.brochure = brochureData;
    }

    if (typeof yellow_title !== "undefined")
      updatedFields.yellow_title = yellow_title;
    if (typeof black_title !== "undefined")
      updatedFields.black_title = black_title;
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
