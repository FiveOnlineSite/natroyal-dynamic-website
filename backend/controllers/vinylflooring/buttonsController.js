const ButtonModel = require("../../models/vinylflooring/buttonsModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createButton = async (req, res) => {
  try {
    const { installation_maintenance } = req.body;

    // const categoryDoc = await VinylProductModel.findOne({
    //     "category._id": product_id,
    //     });

    //     const isValidCategory = categoryDoc?.category?.some(
    //     (cat) => cat._id.toString() === product_id
    //     );

    //     if (!isValidCategory) {
    //     return res.status(400).json({ message: "Invalid product_id." });
    //     }

    const files = req.files;

    const techFile = files?.technical_specification?.[0];
    const brochureFile = files?.brochure?.[0];

    if (!techFile || !brochureFile) {
      return res.status(400).json({
        message:
          "Both technical_specification and brochure files are required.",
      });
    }

    const techExt = path.extname(techFile.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(techExt)) {
      return res
        .status(400)
        .json({ message: "Invalid image format for technical_specification." });
    }

    const brochureExt = path.extname(brochureFile.originalname).toLowerCase();
    if (brochureExt !== ".pdf") {
      return res
        .status(400)
        .json({ message: "Only PDF files are allowed for brochure." });
    }

    
    const technicalData =  {
               filename: path.basename(techFile.key), // "1756968423495-2.jpg"
               filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${techFile.key}` // keep "images/banners/..."
     }

    const brochureData = {
               filename: path.basename(brochureFile.key), // "1756968423495-2.jpg"
               filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${brochureFile.key}` // keep "images/banners/..."
              }

    const newButton = new ButtonModel({
      technical_specification: technicalData,
      installation_maintenance,
      brochure: brochureData,
      //   product_id,
    });

    await newButton.save();

    res.status(200).json({
      message: "Button added successfully.",
      newButton,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error adding button: ${error.message}`,
    });
  }
};

const updateButton = async (req, res) => {
  try {
    const { installation_maintenance, product_id } = req.body;
    // const buttonId = req.params._id;

    const currentButton = await ButtonModel.findOne({});

    if (!currentButton) {
      return res.status(404).json({ message: "Button data not found." });
    }

    // Validate category
    // const categoryDoc = await VinylProductModel.findOne({
    //   "category._id": product_id,
    // });

    // const isValidCategory = categoryDoc?.category?.some(
    //   (cat) => cat._id.toString() === product_id
    // );

    // if (!isValidCategory) {
    //   return res.status(400).json({ message: "Invalid product_id." });
    // }

    const files = req.files;
    const techFile = files?.technical_specification?.[0];
    const brochureFile = files?.brochure?.[0];

    const updatedFields = {
      installation_maintenance,
      //   product_id,
    };

    // === Update technical_specification (image to Cloudinary) ===
    if (techFile) {
      const techExt = path.extname(techFile.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(techExt)) {
        return res.status(400).json({
          message: "Invalid image format for technical_specification.",
        });
      }

     

      updatedFields.technical_specification =  {
                 filename: path.basename(techFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${techFile.key}` // keep "images/banners/..."
                }

    } else {
      updatedFields.technical_specification =
        currentButton.technical_specification;
    }

    // === Update brochure (PDF stored locally) ===
    if (brochureFile) {
      const brochureExt = path.extname(brochureFile.originalname).toLowerCase();
      if (brochureExt !== ".pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF files are allowed for brochure." });
      }

      updatedFields.brochure ={
                 filename: path.basename(brochureFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${brochureFile.key}` // keep "images/banners/..."
                }
    } else {
      updatedFields.brochure = currentButton.brochure;
    }

    const updatedButton = await ButtonModel.findByIdAndUpdate(
      currentButton._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Button data updated successfully.",
      updatedButton,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating button: ${error.message}`,
    });
  }
};

const getButton = async (req, res) => {
  try {
    const button = await ButtonModel.findOne({});

    if (!button) {
      return res.status(400).json({
        message: "No button is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Button fetched successfully.",
      button,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching button due to ${error.message}`,
    });
  }
};

// const getButtons = async (req, res) => {
//   try {
//     const buttons = await ButtonModel.find();

//     if (buttons.length === 0) {
//       return res.status(400).json({
//         message: "Button not created. Kindly create button.",
//       });
//     }
//     return res.status(200).json({
//       message: "Buttons fetched successfully.",
//       count: buttons.length,
//       buttons,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in fetching button due to ${error.message}`,
//     });
//   }
// };

const deleteButton = async (req, res) => {
  try {
    const button = await ButtonModel.findOne({});

    if (button.length === 0) {
      return res.status(400).json({
        message: "No button added to delete. Kindly add one.",
      });
    }

    const deletedButton = await ButtonModel.findByIdAndDelete(button._id);

    return res.status(200).json({
      message: "Button deleted successfully.",
      deletedButton,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting button due to ${error.message}`,
    });
  }
};

module.exports = {
  createButton,
  updateButton,
  getButton,
  //   getButtons,
  deleteButton,
};
