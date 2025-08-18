const CoatedApplicationModel = require("../../models/coatedfabrics/coatedAppModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createCoatedApp = async (req, res) => {
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
        folder: "coated_applications",
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
        link: application.link,
      });
    }

    const newApplication = new CoatedApplicationModel({
      yellow_title,
      black_title,
      application: uploadedApplication,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Coated application created successfully",
      coatedApplicationlication: newApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating coated application: ${error.message}`,
    });
  }
};

const updateCoatedApp = async (req, res) => {
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

    const currentCoatedApplication = await CoatedApplicationModel.findOne({});

    if (!currentCoatedApplication) {
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
          folder: "coated_applications",
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
        const existingIndex = currentCoatedApplication.application.findIndex(
          (a) => a._id.toString() === application._id
        );

        if (existingIndex !== -1) {
          const existingApplication =
            currentCoatedApplication.application[existingIndex];

          currentCoatedApplication.application[existingIndex] = {
            image: imageData ?? existingApplication.image,
            alt: application.alt ?? existingApplication.alt,
            name: application.name ?? existingApplication.name,
            link: application.link ?? existingApplication.link,
            _id: existingApplication._id,
          };

          modifiedApplication.push(
            currentCoatedApplication.application[existingIndex]
          );
        }
      } else {
        const newApplication = {
          image: imageData || [],
          alt: application.alt || "",
          name: application.name || "",
          link: application.link || "",
        };
        uploadedApplication.push(newApplication);
        modifiedApplication.push(newApplication);
      }
    }

    const updatedFields = {
      yellow_title,
      black_title: black_title ?? currentCoatedApplication.black_title,
      application: [
        ...(currentCoatedApplication.application || []),
        ...uploadedApplication,
      ],
    };

    await CoatedApplicationModel.findByIdAndUpdate(
      currentCoatedApplication._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Coated application updated successfully.",
      modifiedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating coated application due to ${
        error.message || error
      }`,
    });
  }
};

const getSingleCoatedApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const coatedApp = await CoatedApplicationModel.findOne({
      "application._id": new mongoose.Types.ObjectId(applicationId),
    });

    if (!coatedApp) {
      return res.status(404).json({
        message: "Application not found in any coated application document.",
      });
    }

    const matchedApp = coatedApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!matchedApp) {
      return res
        .status(404)
        .json({ message: "Application not found in array." });
    }

    return res.status(200).json({
      message: "Coated application fetched successfully.",
      application: matchedApp,
      // parentAppId: coatedApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated application due to ${error.message}`,
    });
  }
};

const getCoatedApp = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.find();

    if (coatedApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    const totalApps = coatedApp.reduce(
      (acc, doc) => acc + (doc.application?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Coated applications fetched successfully.",
      applicationCount: totalApps,
      coatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching coated applications due to ${error.message}`,
    });
  }
};

const deleteSingleApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const coatedApp = await CoatedApplicationModel.findOne({
      "application._id": applicationId,
    });

    if (!coatedApp) {
      return res.status(404).json({
        message: "App not found in any coated application.",
      });
    }

    const deletedCoatedApp = coatedApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!deletedCoatedApp) {
      return res.status(404).json({
        message: "Application not found in the array.",
      });
    }

    const updatedCoatedApp = await CoatedApplicationModel.findByIdAndUpdate(
      coatedApp._id,
      {
        $pull: { application: { _id: applicationId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Coated application deleted successfully.",
      deletedCoatedApp,
      updatedCoatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting application from coated application: ${error.message}`,
    });
  }
};

const deleteCoatedApp = async (req, res) => {
  try {
    const coatedApp = await CoatedApplicationModel.findOne({});

    if (coatedApp.length === 0) {
      return res.status(400).json({
        message: "No coated application added to delete. Kindly add one.",
      });
    }

    const deletedCoatedApp = await CoatedApplicationModel.findByIdAndDelete(
      coatedApp._id
    );

    return res.status(200).json({
      message: "Coated application deleted successfully.",
      deletedCoatedApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting coated application due to ${error.message}`,
    });
  }
};

module.exports = {
  createCoatedApp,
  updateCoatedApp,
  getSingleCoatedApp,
  getCoatedApp,
  deleteSingleApp,
  deleteCoatedApp,
};
