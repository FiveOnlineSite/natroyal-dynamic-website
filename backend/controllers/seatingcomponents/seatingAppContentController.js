const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const SeatingApplicationModel = require("../../models/seatingcomponents/seatingAppModel");
const SeatingAppContentModel = require("../../models/seatingcomponents/seatingAppContentModel");
const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");

const createSeatingAppContent = async (req, res) => {
  try {
    const { title1, title2, content } = req.body;

    const { application } = req.body;
    console.log("application id", application, typeof application);

    const applicationExists = await SeatingApplicationModel.findById(
      application
    );

    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    const existingContent = await SeatingApplicationModel.findOne({
      application,
    });
    if (existingContent) {
      return res.status(400).json({
        message:
          "Content for this Application already exists. Please update it instead of adding a new one.",
      });
    }

    const newSeatingAppContent = new SeatingAppContentModel({
      title1,
      title2,
      content,
      application,
    });

    await newSeatingAppContent.save();

    return res.status(200).json({
      message: "Added seating App Content content successfully.",
      newSeatingAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding seating App Content content due to ${error.message}`,
    });
  }
};

const updateSeatingAppContent = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title1, title2, content, application } = req.body;

    const currentSeatingAppContent = await SeatingAppContentModel.findById(_id);
    if (!currentSeatingAppContent) {
      return res
        .status(404)
        .json({ message: "seating App Content content not found." });
    }

    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }

      const applicationExists = await SeatingApplicationModel.findById(
        application
      );
      if (!applicationExists) {
        return res.status(400).json({ message: "Application not found" });
      }

      const duplicate = await SeatingAppContentModel.findOne({
        application,
        _id: { $ne: _id },
      });

      if (duplicate) {
        return res.status(400).json({
          message:
            "Application content already exists for this application. Please use a different application or update the existing content.",
        });
      }
    }

    const updatedFields = { title1, title2, content, application };

    const updatedSeatingAppContent =
      await SeatingAppContentModel.findByIdAndUpdate(_id, updatedFields, {
        new: true,
      });

    return res.status(200).json({
      message: "seating app content updated successfully.",
      updatedSeatingAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating seating app content due to ${error.message}`,
    });
  }
};

const getSeatingAppContentByAppName = async (req, res) => {
  try {
    let appName = req.params.name || "";
    appName = appName.toLowerCase();

    // fetch all with populated application
    const contents = await SeatingAppContentModel.find().populate("application");

    // normalize both DB name and URL param by replacing spaces & dashes with a common format
    const normalize = (str) =>
      str?.toLowerCase().replace(/[-\s]+/g, "-"); // turn spaces and dashes into "-"

    const content = contents.filter(
      (c) => normalize(c.application?.name) === normalize(appName)
    );

    if (!content || content.length === 0) {
      return res
        .status(404)
        .json({ message: "No contents found for this application" });
    }

    res.status(200).json({
      message: "productContent fetched by content successfully",
      content,
    });
  } catch (err) {
    console.error("Error fetching seating content by app name:", err);
    res.status(500).json({ message: "Server error" });
  }
};



const getSeatingAppContent = async (req, res) => {
  try {
    const appContent = await SeatingAppContentModel.findById(
      req.params._id
    ).populate("application", "name");

    if (!appContent) {
      return res.status(400).json({
        message: "No appContent is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "appContent fetched successfully.",
      appContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching appContent due to ${error.message}`,
    });
  }
};

const getSeatingAppContents = async (req, res) => {
  try {
    const SeatingAppContent = await SeatingAppContentModel.find().populate(
      "application",
      "name"
    );

    if (SeatingAppContent.length === 0) {
      return res.status(400).json({
        message: "SeatingAppContent content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "SeatingAppContent content fetched successfully.",
      count: SeatingAppContent.length,
      SeatingAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching SeatingAppContent content due to ${error.message}`,
    });
  }
};

const deleteSeatingAppContent = async (req, res) => {
  try {
    const SeatingAppContent = await SeatingAppContentModel.findOne({});

    if (SeatingAppContent.length === 0) {
      return res.status(400).json({
        message:
          "No SeatingAppContent content added to delete. Kindly add one.",
      });
    }

    const deletedSeatingAppContent =
      await SeatingAppContentModel.findByIdAndDelete(SeatingAppContent._id);

    return res.status(200).json({
      message: "SeatingAppContent content deleted successfully.",
      deletedSeatingAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting SeatingAppContent content due to ${error.message}`,
    });
  }
};

module.exports = {
  createSeatingAppContent,
  updateSeatingAppContent,
  getSeatingAppContentByAppName,
  getSeatingAppContent,
  getSeatingAppContents,
  deleteSeatingAppContent,
};
