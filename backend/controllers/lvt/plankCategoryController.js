const path = require("path");
const fs = require("fs");
const PlankCategoryModel = require("../../models/lvt/plankCategoryModel");

const createPlankCategory = async (req, res) => {
  try {
    const { title, size } = req.body;

    const newPlankCategory = new PlankCategoryModel({
      title,
      size,
    });

    await newPlankCategory.save();

    return res.status(201).json({
      message: "plank Category data created successfully",
      newPlankCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating plank Category: ${error.message}`,
    });
  }
};

const updatePlankCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, size } = req.body;

    const updated = await PlankCategoryModel.findByIdAndUpdate(
      _id,
      { title, size },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "plank Category not found" });
    }

    return res.status(200).json({
      message: "plank Category updated successfully",
      updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating plank Category: ${error.message}`,
    });
  }
};

const getPlankCategory = async (req, res) => {
  try {
    const plankCategory = await PlankCategoryModel.findById(req.params._id);

    if (plankCategory.length === 0) {
      return res.status(400).json({
        message: "plank Category not found",
      });
    }

    return res.status(200).json({
      message: "Vinyl plank Category fetched successfully.",
      plankCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl plank Category due to ${error.message}`,
    });
  }
};

const getPlankCategories = async (req, res) => {
  try {
    const plankCategories = await PlankCategoryModel.find();

    if (plankCategories.length === 0) {
      return res.status(400).json({
        message: "plank Category not created. Kindly create plankCategory.",
      });
    }
    return res.status(200).json({
      message: "plank Categories fetched successfully.",
      count: plankCategories.length,
      plankCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching plank Categories due to ${error.message}`,
    });
  }
};

const deletePlankCategory = async (req, res) => {
  try {
    const plankCategory = await PlankCategoryModel.findById(req.params._id);

    if (plankCategory.length === 0) {
      return res.status(400).json({
        message: "No vinyl plank Category added to delete. Kindly add one.",
      });
    }

    const deletedPlankCategory = await PlankCategoryModel.findByIdAndDelete(
      plankCategory._id
    );

    return res.status(200).json({
      message: "Vinyl plank Category deleted successfully.",
      deletedPlankCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl plank Category due to ${error.message}`,
    });
  }
};

module.exports = {
  createPlankCategory,
  updatePlankCategory,
  getPlankCategory,
  getPlankCategories,
  deletePlankCategory,
};
