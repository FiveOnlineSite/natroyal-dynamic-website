const BrochureModel = require("../../models/othercomponents/brochuresModel");
const path = require("path");
const fs = require("fs");

const createBrochure = async (req, res) => {
  try {
    const { page } = req.body;

    const file = req.file;

    const brochureExist = path.extname(file.originalname).toLowerCase();
    if (brochureExist !== ".pdf") {
      return res
        .status(400)
        .json({ message: "Only PDF file are allowed for brochure." });
    }

    const brochureData = {
      filename: file.filename,
      filepath: path.join("uploads/brochures", file.filename),
    };

    const pageExist = await BrochureModel.findOne({ page: page.trim() });

    if (pageExist) {
      return res.status(400).json({
        message: "Brochure for this page already exist.",
      });
    }

    const newBrochure = new BrochureModel({
      page,
      brochure: brochureData,
    });

    await newBrochure.save();

    res.status(200).json({
      message: "Brochure added successfully.",
      newBrochure,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error adding brochure: ${error.message}`,
    });
  }
};

const updateBrochure = async (req, res) => {
  try {
    const { page } = req.body;

    const brochureId = req.params._id;

    const currentBrochure = await BrochureModel.findById(brochureId);

    if (!currentBrochure) {
      return res.status(404).json({ message: "Brochure not found." });
    }

    const file = req.file;

    let updatedPage = currentBrochure.page;

    if (page && page !== currentBrochure.page) {
      const conflictingBrochure = await BrochureModel.findOne({ page });

      if (conflictingBrochure) {
        await BrochureModel.findByIdAndUpdate(conflictingBrochure._id, {
          page: currentBrochure.page,
        });

        updatedPage = page;
      } else {
        updatedPage = page;
      }
    }

    const updatedFields = {
      page: updatedPage,
    };

    if (file) {
      const brochureExist = path.extname(file.originalname).toLowerCase();
      if (brochureExist !== ".pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF file are allowed for brochure." });
      }

      updatedFields.brochure = {
        filename: file.filename,
        filepath: path.join("uploads/brochures", file.filename),
      };
    } else {
      updatedFields.brochure = currentBrochure.brochure;
    }

    const updatedBrochure = await BrochureModel.findByIdAndUpdate(
      currentBrochure._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Brochure data updated successfully.",
      updatedBrochure,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating brochure: ${error.message}`,
    });
  }
};

const getBrochure = async (req, res) => {
  try {
    const brochure = await BrochureModel.findById(req.params._id);

    if (!brochure) {
      return res.status(400).json({
        message: "No brochure is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Brochure fetched successfully.",
      brochure,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching brochure due to ${error.message}`,
    });
  }
};

const getBrochures = async (req, res) => {
  try {
    const brochures = await BrochureModel.find();

    if (brochures.length === 0) {
      return res.status(400).json({
        message: "Brochure not created. Kindly create brochure.",
      });
    }

    return res.status(200).json({
      message: "Brochures fetched successfully.",
      count: brochures.length,
      brochures,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching brochure due to ${error.message}`,
    });
  }
};

const deleteBrochure = async (req, res) => {
  try {
    const brochure = await BrochureModel.findById(req.params._id);

    if (brochure.length === 0) {
      return res.status(400).json({
        message: "No brochure added to delete. Kindly add one.",
      });
    }

    const deletedBrochure = await BrochureModel.findByIdAndDelete(brochure);

    return res.status(200).json({
      message: "Brochure deleted successfully.",
      deletedBrochure,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting brochure due to ${error.message}`,
    });
  }
};

module.exports = {
  createBrochure,
  updateBrochure,
  getBrochure,
  getBrochures,
  deleteBrochure,
};
