const WhoWeAreModel = require("../../models/lvt/whoWeAreModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createWhoWeAre = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content, image, alt } =
      req.body;

    let imageData = {};
    const altText = alt?.trim();
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the image field.",
      });
    }

    if (file && !altText) {
      return res.status(400).json({
        message: "Alt text is required when uploading an image.",
      });
    }

    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "who_we_are",
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

    imageData = {
      filename: uploadResult.original_filename,
      filepath: uploadResult.secure_url,
    };

    const newWhoWeAre = new WhoWeAreModel({
      image: imageData,
      alt: altText,
      yellow_title,
      black_title,
      subtitle,
      content,
    });

    await newWhoWeAre.save();

    res.status(200).json({
      message: "Who we are item added successfully.",
      newWhoWeAre,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error adding who we are item: ${error.message}`,
    });
  }
};

const updateWhoWeAre = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content, image, alt } =
      req.body;
    const currentWhoWeAre = await WhoWeAreModel.findOne({});

    if (!currentWhoWeAre) {
      return res.status(404).json({ message: "Who we are item not found." });
    }

    const file = req.file;
    const updatedFields = {};

    if (file) {
      const fileExtensionName = path.extname(file.originalname).toLowerCase();

      const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg"];

      if (!allowedExtensions.includes(fileExtensionName)) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .png, .jpg, or .jpeg image.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "who_we_are",
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

      const imageData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
      };

      updatedFields.image = imageData;
    } else {
      updatedFields.image = currentWhoWeAre.image;
    }

    if (typeof yellow_title !== "undefined")
      updatedFields.yellow_title = yellow_title;
    if (typeof black_title !== "undefined")
      updatedFields.black_title = black_title;
    if (typeof subtitle !== "undefined") updatedFields.subtitle = subtitle;
    if (typeof content !== "undefined") updatedFields.content = content;
    if (typeof alt !== "undefined") updatedFields.alt = alt;

    const updatedWhoWeAre = await WhoWeAreModel.findByIdAndUpdate(
      currentWhoWeAre._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Who we are item updated successfully.",
      updatedWhoWeAre,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating who we are item: ${error.message}`,
    });
  }
};

const getWhoWeAre = async (req, res) => {
  try {
    const whoWeAre = await WhoWeAreModel.findOne({});

    if (!whoWeAre) {
      return res.status(400).json({
        message: "No who we are is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Who we are item fetched successfully.",
      whoWeAre,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching whoWeAre due to ${error.message}`,
    });
  }
};

// const getWhoWeAres = async (req, res) => {
//   try {
//     const whoWeAres = await WhoWeAreModel.find();

//     if (whoWeAres.length === 0) {
//       return res.status(400).json({
//         message: "WhoWeAre not created. Kindly create whoWeAre.",
//       });
//     }
//     return res.status(200).json({
//       message: "WhoWeAres fetched successfully.",
//       count: whoWeAres.length,
//       whoWeAres,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in fetching whoWeAre due to ${error.message}`,
//     });
//   }
// };

const deleteWhoWeAre = async (req, res) => {
  try {
    const whoWeAre = await WhoWeAreModel.findOne({});

    if (whoWeAre.length === 0) {
      return res.status(400).json({
        message: "No who we are added to delete. Kindly add one.",
      });
    }

    const deletedWhoWeAre = await WhoWeAreModel.findByIdAndDelete(whoWeAre._id);

    return res.status(200).json({
      message: "Who we are deleted successfully.",
      deletedWhoWeAre,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting whoWeAre due to ${error.message}`,
    });
  }
};

module.exports = {
  createWhoWeAre,
  updateWhoWeAre,
  getWhoWeAre,
  //   getWhoWeAres,
  deleteWhoWeAre,
};
