const lvtAboutModel = require("../../models/about/lvtAboutModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createLvtAbout = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content, image, alt } =
      req.body;

    let imageData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the image field.",
      });
    }

    // Check image extension
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "lvt_about",
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

    const newLvtAbout = new lvtAboutModel({
      yellow_title,
      black_title,
      subtitle,
      content,
      image: imageData,
      alt,
    });

    await newLvtAbout.save();

    return res.status(200).json({
      message: "Added lvt about content successfully.",
      newLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding lvt about content due to ${error.message}`,
    });
  }
};

const updateLvtAbout = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content, image, alt } =
      req.body;

    const currentLvtAbout = await lvtAboutModel.findOne({});

    if (!currentLvtAbout) {
      return res.status(404).json({ message: "About content not found." });
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
        folder: "lvt_about",
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
      // Preserve the existing logo if no new file uploaded
      updatedFields.image = currentLvtAbout.image;
    }

    if (typeof yellow_title !== "undefined")
      updatedFields.yellow_title = yellow_title;
    if (typeof black_title !== "undefined")
      updatedFields.black_title = black_title;
    if (typeof subtitle !== "undefined") updatedFields.subtitle = subtitle;
    if (typeof content !== "undefined") updatedFields.content = content;
    if (typeof alt !== "undefined") updatedFields.alt = alt;

    const updatedLvtAbout = await lvtAboutModel.findByIdAndUpdate(
      currentLvtAbout._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Lvt about content updated successfully.",
      updatedLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating lvt about content due to ${
        error.message || error
      }`,
    });
  }
};

// const getLvtAbout = async (req, res) => {
//   try {
//     const banner = await lvtAboutModel.findById(req.params._id);

//     if (!banner) {
//       return res.status(400).json({
//         message: "No banner is created. Kindly create one.",
//       });
//     }
//     return res.status(200).json({
//       message: "Banner fetched successfully.",
//       banner,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in fetching banner due to ${error.message}`,
//     });
//   }
// };

const getLvtAbout = async (req, res) => {
  try {
    const lvtAbout = await lvtAboutModel.find();

    if (lvtAbout.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "Lvt about content fetched successfully.",
      count: lvtAbout.length,
      lvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching lvt about content due to ${error.message}`,
    });
  }
};

const deleteLvtAbout = async (req, res) => {
  try {
    const lvtAboutContent = await lvtAboutModel.findOne({});

    if (lvtAboutContent.length === 0) {
      return res.status(400).json({
        message: "No lvt about content added to delete. Kindly add one.",
      });
    }

    const deletedLvtAbout = await lvtAboutModel.findByIdAndDelete(
      lvtAboutContent._id
    );

    return res.status(200).json({
      message: "Lvt about content deleted successfully.",
      deletedLvtAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting lvt about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createLvtAbout,
  updateLvtAbout,
  getLvtAbout,
  //   getLvtAbouts,
  deleteLvtAbout,
};
