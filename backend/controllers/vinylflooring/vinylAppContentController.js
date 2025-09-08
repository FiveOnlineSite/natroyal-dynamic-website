const VinylAppContentModel = require("../../models/vinylflooring/vinylAppContentModel");
const VinylAppModel = require("../../models/vinylflooring/vinylAppModel");
const mongoose = require("mongoose");

const createVinylAppContent = async (req, res) => {
  try {
    const { title1, title2, content } = req.body;

    const { application } = req.body;
    console.log("application id", application, typeof application);

    const applicationExists = await VinylAppModel.findById(application);

    if (!applicationExists) {
      return res.status(400).json({ message: "Application not found" });
    }

    const existingContent = await VinylAppModel.findOne({ application });
    if (existingContent) {
      return res.status(400).json({
        message:
          "Content for this Application already exists. Please update it instead of adding a new one.",
      });
    }

    const newVinylAppContent = new VinylAppContentModel({
      title1,
      title2,
      content,
      application,
    });

    await newVinylAppContent.save();

    return res.status(200).json({
      message: "Added VinylAppContent content successfully.",
      newVinylAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding VinylAppContent content due to ${error.message}`,
    });
  }
};

const updateVinylAppContent = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title1, title2, content, application } = req.body;

    const currentVinylAppContent = await VinylAppContentModel.findById(_id);
    if (!currentVinylAppContent) {
      return res
        .status(404)
        .json({ message: "VinylAppContent content not found." });
    }

    if (application) {
      if (!mongoose.Types.ObjectId.isValid(application)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }

      const applicationExists = await VinylAppModel.findById(application);
      if (!applicationExists) {
        return res.status(400).json({ message: "Application not found" });
      }

      const duplicate = await VinylAppContentModel.findOne({
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

    const updatedVinylAppContent = await VinylAppContentModel.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "VinylAppContent content updated successfully.",
      updatedVinylAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating VinylAppContent content due to ${error.message}`,
    });
  }
};

const getVinylAppContentByAppName = async (req, res) => {
  try {
    let appName = req.params.name || "";

    // Normalizer → converts "royal star" / "Royal-Star" → "royal-star"
    const normalize = (str) =>
      str?.toLowerCase().replace(/[-\s]+/g, "-");

    const contents = await VinylAppContentModel.find().populate("application");

    // compare normalized names
    const appContent = contents.filter(
      (content) => normalize(content.application?.name) === normalize(appName)
    );

    if (!appContent || appContent.length === 0) {
      return res
        .status(404)
        .json({ message: "No appContent found for this application" });
    }

    res.status(200).json({
      message: "appContent fetched by application successfully",
      appContent,
    });
  } catch (err) {
    console.error("Error fetching vinyl appContent by application name:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getVinylAppContent = async (req, res) => {
  try {
    const appContent = await VinylAppContentModel.findById(
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

const getVinylAppContents = async (req, res) => {
  try {
    const VinylAppContent = await VinylAppContentModel.find().populate(
      "application",
      "name"
    );

    if (VinylAppContent.length === 0) {
      return res.status(400).json({
        message: "VinylAppContent content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "VinylAppContent content fetched successfully.",
      count: VinylAppContent.length,
      VinylAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching VinylAppContent content due to ${error.message}`,
    });
  }
};

const deleteVinylAppContent = async (req, res) => {
  try {
    const VinylAppContentContent = await VinylAppContentModel.findOne({});

    if (VinylAppContentContent.length === 0) {
      return res.status(400).json({
        message: "No VinylAppContent content added to delete. Kindly add one.",
      });
    }

    const deletedVinylAppContent = await VinylAppContentModel.findByIdAndDelete(
      VinylAppContentContent._id
    );

    return res.status(200).json({
      message: "VinylAppContent content deleted successfully.",
      deletedVinylAppContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting VinylAppContent content due to ${error.message}`,
    });
  }
};

module.exports = {
  createVinylAppContent,
  updateVinylAppContent,
  getVinylAppContentByAppName,
  getVinylAppContent,
  getVinylAppContents,
  deleteVinylAppContent,
};
