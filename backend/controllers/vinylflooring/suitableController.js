const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const SuitableModel = require("../../models/vinylflooring/suitableModel");
const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const mongoose = require("mongoose");

const createSuitable = async (req, res) => {
  try {
    const { alt } = req.body;

   const { application } = req.body;
        console.log("application id", application, typeof application);
    
       const applicationExists = await VinylApplicationModel.findById(application);
        if (!applicationExists) {
          return res.status(400).json({ message: "application not found" });
        }

    const existingAppSuitable = await SuitableModel.findOne({ application });
        if (existingAppSuitable) {
     return res.status(400).json({
     message: "Suitable content for this Application already exists. Please update it instead of adding a new one.",
     });
}
    let imageData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the image field.",
      });
    }

    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message: "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
      });
    }

    imageData =  {
               filename: path.basename(file.key), // "1756968423495-2.jpg"
               filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
              }

    const newSuitable = new SuitableModel({
      image: imageData,
      alt,
      application: Array.isArray(application) ? application : [application],
  });

    await newSuitable.save();

    return res.status(200).json({
      message: "Suitable added successfully.",
      newSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding suitable: ${error.message}`,
    });
  }
};


const updateSuitable = async (req, res) => {
  try {
    const {_id} = req.params;
    const { alt } = req.body;

    const { application } = req.body;
        console.log("application id", application, typeof application);
    
       const applicationExists = await VinylApplicationModel.findById(application);
        if (!applicationExists) {
          return res.status(400).json({ message: "application not found" });
        }

    const currentSuitable = await SuitableModel.findById(_id);
    if (!currentSuitable) {
      return res.status(404).json({ message: "Suitable data not found." });
    }

    if (application) {
          if (!mongoose.Types.ObjectId.isValid(application)) {
            return res.status(400).json({ message: "Invalid application ID" });
          }
    
          const applicationExists = await VinylApplicationModel.findById(application);
          if (!applicationExists) {
            return res.status(400).json({ message: "Application not found" });
          }
    
          const duplicate = await VinylApplicationModel.findOne({
            application,
            _id: { $ne: _id }, 
          });
    
          if (duplicate) {
            return res.status(400).json({
              message: "Application content already exists for this application. Please use a different application or update the existing content.",
            });
          }
        }

    const file = req.file;
    const updatedFields = {};

    if (file) {
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({
          message: "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
        });
      }

      updatedFields.image =  {
                 filename: path.basename(file.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                }
                
    } else {
      updatedFields.image = currentSuitable.image;
    }

    if (alt) updatedFields.alt = alt;
    if (application) {
      updatedFields.application = Array.isArray(application) ? application : [application];
    }

    const updatedSuitable = await SuitableModel.findByIdAndUpdate(
      currentSuitable._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Suitable data updated successfully.",
      updatedSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating suitable data due to ${error.message}`,
    });
  }
};

const getSuitableProductbyAppName = async (req, res) => {
  
}

const getSuitable = async (req, res) => {
 try {
    const { _id } = req.params;

    const suitable = await SuitableModel.findById(_id).populate("application", "name").lean();

    if (!suitable) {
      return res.status(404).json({ message: "Suitable not found." });
    }

    console.log("suitable data", suitable)

    return res.status(200).json({
      message: "Suitable fetched successfully.",
      suitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching suitable",
      error: error.message,
    });
  }
};


const getSuitables = async (req, res) => {
  try {
    const suitables = await SuitableModel.find().populate("application", "name").lean();

    if (suitables.length === 0) {
      return res.status(400).json({
        message: "Suitable not created. Kindly create suitable.",
      });
    }
    return res.status(200).json({
      message: "Suitables fetched successfully.",
      count: suitables.length,
      suitables,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching suitable due to ${error.message}`,
    });
  }
};

const deleteSuitable = async (req, res) => {
  try {
    const suitable = await SuitableModel.findById({
      _id: req.params._id,
    });

    if (suitable.length === 0) {
      return res.status(400).json({
        message: "No suitable added to delete. Kindly add one.",
      });
    }

    const deletedSuitable = await SuitableModel.findByIdAndDelete(suitable._id);

    return res.status(200).json({
      message: "Suitable deleted successfully.",
      deletedSuitable,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting suitable due to ${error.message}`,
    });
  }
};

module.exports = {
  createSuitable,
  updateSuitable,
  getSuitable,
  getSuitables,
  deleteSuitable,
};
