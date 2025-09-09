const CoatedAppContentModel = require("../../models/coatedfabrics/coatedAppContentModel");
const CoatedAppModel = require("../../models/coatedfabrics/coatedAppModel");
const mongoose = require("mongoose");

const createCoatedAppContent = async (req, res) => {
  try {
    const { title1, title2, content } = req.body;

    const { application } = req.body;
    console.log("application id", application, typeof application);

    const applicationExists = await CoatedAppModel.findById(application);

    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    const existingContent = await CoatedAppModel.findOne({ application });
    if (existingContent) {
      return res.status(400).json({
        message:
          "Content for this Application already exists. Please update it instead of adding a new one.",
      });
    }

    const newCoatedAppContent = new CoatedAppContentModel({
      title1,
      title2,
      content,
      application,
    });

    await newCoatedAppContent.save();

    return res.status(200).json({
      message: "Added Coated App Content content successfully.",
      newCoatedAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding Coated App Content content due to ${error.message}`,
    });
  }
};

const updateCoatedAppContent = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title1, title2, content, application } = req.body;

    const currentCoatedAppContent = await CoatedAppContentModel.findById(_id);
    if (!currentCoatedAppContent) {
      return res
        .status(404)
        .json({ message: "Coated App Content content not found." });
    }

    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }

      const applicationExists = await CoatedAppModel.findById(application);
      if (!applicationExists) {
        return res.status(400).json({ message: "Application not found" });
      }

      const duplicate = await CoatedAppContentModel.findOne({
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

    const updatedCoatedAppContent =
      await CoatedAppContentModel.findByIdAndUpdate(_id, updatedFields, {
        new: true,
      });

    return res.status(200).json({
      message: "CoatedAppContent content updated successfully.",
      updatedCoatedAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating CoatedAppContent content due to ${error.message}`,
    });
  }
};

const getCoatedAppContentByAppName = async (req, res) => {
  try {
    let appName = req.params.name || ""; // "education" or "royal-star"
     appName = appName.toLowerCase();

     const contents = await CoatedAppContentModel.find().populate("application", "name");

     const normalize = (str) =>
           str?.toLowerCase().replace(/[-\s]+/g, "-").replace(/\//g, "-"); // turn spaces and dashes into "-"
     
     const appContent = contents.filter(
      (c) => normalize(c.application?.name) === normalize(appName)
    );

    if (!appContent || appContent.length === 0) {
      return res.status(404).json({ message: "No appContent found for this app" });
    }

    res.status(200).json({
      message: "appContent fetched by app successfully",
      appContent
    });
  } catch (err) {
    console.error("Error fetching coated appContent by app name:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCoatedAppContent = async (req, res) => {
  try {
    const appContent = await CoatedAppContentModel.findById(
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

const getCoatedAppContents = async (req, res) => {
  try {
    const CoatedAppContent = await CoatedAppContentModel.find().populate(
      "application",
      "name"
    );

    if (CoatedAppContent.length === 0) {
      return res.status(400).json({
        message: "CoatedAppContent content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "CoatedAppContent content fetched successfully.",
      count: CoatedAppContent.length,
      CoatedAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching CoatedAppContent content due to ${error.message}`,
    });
  }
};

const deleteCoatedAppContent = async (req, res) => {
  try {
    const CoatedAppContentContent = await CoatedAppContentModel.findOne({});

    if (CoatedAppContentContent.length === 0) {
      return res.status(400).json({
        message: "No CoatedAppContent content added to delete. Kindly add one.",
      });
    }

    const deletedCoatedAppContent =
      await CoatedAppContentModel.findByIdAndDelete(
        CoatedAppContentContent._id
      );

    return res.status(200).json({
      message: "CoatedAppContent content deleted successfully.",
      deletedCoatedAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting CoatedAppContent content due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedAppContent,
  updateCoatedAppContent,
  getCoatedAppContentByAppName,
  getCoatedAppContent,
  getCoatedAppContents,
  deleteCoatedAppContent,
};
