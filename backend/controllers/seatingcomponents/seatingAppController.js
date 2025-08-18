const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createSeatingApp = async (req, res) => {
  try {
    const { yellow_title, black_title } = req.body;
    const applicationData = JSON.parse(req.body.application);

    const files = req.files;
    if (!Array.isArray(applicationData) || applicationData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one application is required." });
    }

    if (!files || files.length !== applicationData.length) {
      return res
        .status(400)
        .json({ message: "Each application must have a corresponding image." });
    }

    const uploadedApplication = [];

    for (let i = 0; i < applicationData.length; i++) {
      const application = applicationData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for application image: ${file.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "seating_applications",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Temp file deleted:", filePath);
        } else {
          console.warn("File not found for deletion:", filePath);
        }
      } catch (err) {
        console.error("Error deleting temp file:", err.message);
      }

      uploadedApplication.push({
        image: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        alt: application.alt,
        name: application.name,
        content: application.content,
        link: application.link,
      });
    }

    const newApplication = new SeatingAppModel({
      yellow_title,
      black_title,
      application: uploadedApplication,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Seating application created successfully",
      SeatingApplication: newApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating Seating application: ${error.message}`,
    });
  }
};

const updateSeatingApp = async (req, res) => {
  try {
    const { yellow_title, black_title } = req.body;

    let applicationData = [];

    if (req.body.application && req.body.application !== "undefined") {
      try {
        applicationData = JSON.parse(req.body.application);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in application field." });
      }
    }

    const files = req.files;

    const currentSeatingApplication = await SeatingAppModel.findOne({});

    if (!currentSeatingApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    const uploadedApplication = [];
    const modifiedApplication = [];

    for (let i = 0; i < applicationData.length; i++) {
      const application = applicationData[i];
      const file = files?.[i];

      let imageData;

      if (file) {
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res.status(400).json({
            message: `Unsupported image type for application: ${file.originalname}`,
          });
        }

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "seating_applications",
          resource_type: "image",
        });

        const filePath = path.resolve(file.path);
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Error deleting temp file:", err.message);
        }

        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
      }

      if (application._id) {
        const existingIndex = currentSeatingApplication.application.findIndex(
          (a) => a._id.toString() === application._id
        );

        if (existingIndex !== -1) {
          const existingApplication =
            currentSeatingApplication.application[existingIndex];

          currentSeatingApplication.application[existingIndex] = {
            image: imageData ?? existingApplication.image,
            alt: application.alt ?? existingApplication.alt,
            name: application.name ?? existingApplication.name,
            content: application.content ?? existingApplication.content,
            link: application.link ?? existingApplication.link,
            _id: existingApplication._id,
          };

          modifiedApplication.push(
            currentSeatingApplication.application[existingIndex]
          );
        }
      } else {
        const newApplication = {
          image: imageData || [],
          alt: application.alt || "",
          name: application.name || "",
          content: application.content || "",
          link: application.link || "",
        };
        uploadedApplication.push(newApplication);
        modifiedApplication.push(newApplication);
      }
    }

    const updatedFields = {
      yellow_title,
      black_title: black_title ?? currentSeatingApplication.black_title,
      application: [
        ...(currentSeatingApplication.application || []),
        ...uploadedApplication,
      ],
    };

    await SeatingAppModel.findByIdAndUpdate(
      currentSeatingApplication._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Seating application updated successfully.",
      modifiedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Seating application due to ${
        error.message || error
      }`,
    });
  }
};

const getSingleSeatingApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const SeatingApp = await SeatingAppModel.findOne({
      "application._id": new mongoose.Types.ObjectId(applicationId),
    });

    if (!SeatingApp) {
      return res.status(404).json({
        message: "Application not found in any Seating application document.",
      });
    }

    const matchedApp = SeatingApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!matchedApp) {
      return res
        .status(404)
        .json({ message: "Application not found in array." });
    }

    return res.status(200).json({
      message: "Seating application fetched successfully.",
      application: matchedApp,
      // parentAppId: SeatingApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Seating application due to ${error.message}`,
    });
  }
};

const getSeatingApp = async (req, res) => {
  try {
    const SeatingApp = await SeatingAppModel.find();

    if (SeatingApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    const totalApps = SeatingApp.reduce(
      (acc, doc) => acc + (doc.application?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Seating applications fetched successfully.",
      applicationCount: totalApps,
      SeatingApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Seating applications due to ${error.message}`,
    });
  }
};

const deleteSingleApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const SeatingApp = await SeatingAppModel.findOne({
      "application._id": applicationId,
    });

    if (!SeatingApp) {
      return res.status(404).json({
        message: "App not found in any Seating application.",
      });
    }

    const deletedSeatingApp = SeatingApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!deletedSeatingApp) {
      return res.status(404).json({
        message: "Application not found in the array.",
      });
    }

    const updatedSeatingApp = await SeatingAppModel.findByIdAndUpdate(
      SeatingApp._id,
      {
        $pull: { application: { _id: applicationId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Seating application deleted successfully.",
      deletedSeatingApp,
      updatedSeatingApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting application from Seating application: ${error.message}`,
    });
  }
};

const deleteSeatingApp = async (req, res) => {
  try {
    const SeatingApp = await SeatingAppModel.findOne({});

    if (SeatingApp.length === 0) {
      return res.status(400).json({
        message: "No Seating application added to delete. Kindly add one.",
      });
    }

    const deletedSeatingApp = await SeatingAppModel.findByIdAndDelete(
      SeatingApp._id
    );

    return res.status(200).json({
      message: "Seating application deleted successfully.",
      deletedSeatingApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Seating application due to ${error.message}`,
    });
  }
};

module.exports = {
  createSeatingApp,
  updateSeatingApp,
  getSingleSeatingApp,
  getSeatingApp,
  deleteSingleApp,
  deleteSeatingApp,
};
