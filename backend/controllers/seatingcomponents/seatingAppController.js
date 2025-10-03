const SeatingAppModel = require("../../models/seatingcomponents/seatingAppModel");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel");
const SeatingAppContentModel = require("../../models/seatingcomponents/seatingAppContentModel");

const createSeatingApp = async (req, res) => {
  try {
    const { alt, name, content } = req.body;

    const appWithSameName = await SeatingAppModel.findOne({
      name: name.trim(),
    });
    if (appWithSameName) {
      return res
        .status(400)
        .json({ message: "Application with this name already exists." });
    }

    let imageData = null;

    if (req.file) {
      const file = req.file;
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isImage)
        return res.status(400).json({ message: "Unsupported image type." });
      if (!alt || !alt.trim())
        return res.status(400).json({ message: "Alt text is required." });

      imageData = {
                              filename: path.basename(file.key), // "1756968423495-2.jpg"
                              filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                             }
    }

    const totalSeatingApps = await SeatingAppModel.countDocuments();

    const newSeatingApplication = new SeatingAppModel({
      image: imageData ? [imageData] : [],
      alt,
      name,
      content,
      sequence: totalSeatingApps + 1,
    });

    await newSeatingApplication.save();

    res.status(200).json({
      message: "Seating application created successfully",
      newSeatingApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating seating application: ${error.message}`,
    });
  }
};

const updateSeatingApp = async (req, res) => {
  try {
    const { alt, name, content, sequence } = req.body;

    const _id = req.params._id;

    const file = req.file;

    if (name) {
      const duplicate = await SeatingAppModel.findOne({
        name: name.trim(),
        _id: { $ne: _id },
      });
      if (duplicate) {
        return res.status(400).json({
          message: "Another seating app with this name already exists.",
        });
      }
    }

    const seatingApplication = await SeatingAppModel.findById(_id);
    if (!seatingApplication) {
      return res.status(404).json({ message: "seating application not found" });
    }

    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res
          .status(400)
          .json({ message: `Unsupported file type: ${file.originalname}` });
      }
      seatingApplication.image = [
       {
                               filename: path.basename(file.key), // "1756968423495-2.jpg"
                               filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                              }
      ];
    }

    if (sequence !== undefined) {
          const newSequence = Number(sequence);
        
          if (newSequence !== seatingApplication.sequence) {
            const otherSeatingApp = await SeatingAppModel.findOne({
              sequence: newSequence,
              _id: { $ne: seatingApplication._id },
            });
        
            if (otherSeatingApp) {
              // swap the other app's sequence to current app's sequence
              await SeatingAppModel.findByIdAndUpdate(otherSeatingApp._id, {
                sequence: seatingApplication.sequence,
              });
            }
        
            // include sequence in updateData so it's persisted
            seatingApplication.sequence = newSequence;
          }
        }

    // update text fields
    if (alt !== undefined) seatingApplication.alt = alt;
    if (name !== undefined) seatingApplication.name = name;
    if (content !== undefined) seatingApplication.content = content;
    await seatingApplication.save();

    res.status(200).json({
      message: "seating application updated successfully",
      seatingApplication,
    }); 
  } catch (error) {
    // full log in backend
    res.status(500).json({
      message: "Error updating seating application",
      error: error.message || error.toString(),
    });
  }
};

const getSeatingApp = async (req, res) => {
  try {
    const seatingApp = await SeatingAppModel.findById(req.params._id);

    if (!seatingApp) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      message: "seating application fetched successfully.",
      application: seatingApp,
      // parentAppId: vinylApp._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching seating application due to ${error.message}`,
    });
  }
};

const getSeatingApps = async (req, res) => {
  try {
    const seatingApp = await SeatingAppModel.find().sort({sequence: 1});

    if (seatingApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "seating applications fetched successfully.",
      applicationCount: seatingApp.length,
      seatingApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching seating applications due to ${error.message}`,
    });
  }
};

const deleteSeatingApp = async (req, res) => {
  try {
    const { _id } = req.params;
    const objectId = new mongoose.Types.ObjectId(_id);
    
    const seatingApp = await SeatingAppModel.findById(objectId);

    if (!seatingApp) {
      return res.status(400).json({
        message: "No seating application found to delete. Kindly add one.",
      });
    }

    const deletedSeatingApp = await SeatingAppModel.findByIdAndDelete(objectId);

    const deletedSeatingProduct = await SeatingProductModel.deleteMany({
      application: objectId,
    });

    const deletedSeatingAppContent = await SeatingAppContentModel.deleteMany({
      application: objectId,
    });

    await SeatingAppModel.updateMany(
          { sequence: { $gt: deletedSeatingApp.sequence } },
          { $inc: { sequence: -1 } }
        );

    const updatedList = await SeatingAppModel.find().sort({ sequence: 1 }).lean();

    return res.status(200).json({
      message: "seating application deleted successfully.",
      deletedSeatingApp,
      deletedSeatingAppContent,
      deletedSeatingProduct,
      updatedList
    });

  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting seating application due to ${error.message}`,
    });
  }
};

module.exports = {
  createSeatingApp,
  updateSeatingApp,
  getSeatingApp,
  getSeatingApps,
  deleteSeatingApp,
};
