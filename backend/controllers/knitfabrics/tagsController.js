const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const TextileModel = require("../../models/knitfabrics/textilesModel");
const TagsModel = require("../../models/knitfabrics/tagsModel");

const createTag = async (req, res) => {
  try {
    const { tag } = req.body;

    const { textile } = req.body;
    console.log("textile id", textile, typeof textile);

    const textileExists = await TextileModel.findById(textile);

    if (!textileExists) {
      return res.status(400).json({ message: "textile not found" });
    }

    const newTag = new TagsModel({
      tag,
      textile,
    });

    await newTag.save();

    return res.status(200).json({
      message: "Added tag successfully.",
      newTag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding tag due to ${error.message}`,
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { _id } = req.params;
    const { tag, textile } = req.body;

    const currentTag = await TagsModel.findById(_id);
    if (!currentTag) {
      return res.status(404).json({ message: "tag not found." });
    }

    if (textile) {
      if (!mongoose.Types.ObjectId.isValid(textile)) {
        return res.status(400).json({ message: "Invalid textile ID" });
      }

      const textileExists = await TextileModel.findById(textile);
      if (!textileExists) {
        return res.status(400).json({ message: "textile not found" });
      }
    }

    const updatedFields = { tag, textile };

    const updatedTag = await TagsModel.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    return res.status(200).json({
      message: "tag updated successfully.",
      updatedTag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating tag due to ${error.message}`,
    });
  }
};

const getTag = async (req, res) => {
  try {
    const tag = await TagsModel.findById(req.params._id).populate("textile", "title");

    if (!tag) {
      return res.status(400).json({
        message: "No tag is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "tag fetched successfully.",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching tag due to ${error.message}`,
    });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await TagsModel.find().populate("textile", "title");

    if (tags.length === 0) {
      return res.status(400).json({
        message: "tags content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "tags content fetched successfully.",
      count: tags.length,
      tags,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching tags content due to ${error.message}`,
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tags = await TagsModel.findOne({});

    if (tags.length === 0) {
      return res.status(400).json({
        message: "No tags content added to delete. Kindly add one.",
      });
    }

    const deletedTag = await TagsModel.findByIdAndDelete(tags._id);

    return res.status(200).json({
      message: "tags content deleted successfully.",
      deletedTag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting tags content due to ${error.message}`,
    });
  }
};

module.exports = {
  createTag,
  updateTag,
  getTag,
  getTags,
  deleteTag,
};
