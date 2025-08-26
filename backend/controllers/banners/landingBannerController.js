const landingBannerModel = require("../../models/banners/landingBannerModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createLandingBanner = async (req, res) => {
  try {
    const { alt, heading, heading_color, banner, page } = req.body;
    const altText = req.body.alt;

    let bannerData = {};
    let fileType = "";

    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (isURL(banner)) {
      fileType = "video";
      bannerData = {
        filename: null,
        filepath: null,
        iframe: banner.trim(),
      };
    } else {
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          message:
            "Either a file or a valid URL is required for the banner field.",
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

      if (!altText || altText.trim() === "") {
        return res.status(400).json({
          message: "Alt text is required when uploading an image.",
        });
      }
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "landing_banners",
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

      fileType = "image";

      bannerData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
        iframe: null,
      };
    }

    const existingPage = await landingBannerModel.findOne({
      page: page.trim(),
    });

    if (existingPage) {
      return res.status(400).json({
        message: "Banner already created for this page",
      });
    }

    const headingColor = req.body.heading_color || "#ffffff";

    const newBanner = new landingBannerModel({
      type: fileType,
      alt: fileType === "image" ? altText : "",
      heading,
      heading_color: headingColor,
      banner: bannerData,
      page,
    });

    await newBanner.save();

    return res.status(200).json({
      message: "Added new landing banner successfully.",
      newBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding new landing banner due to ${error.message}`,
    });
  }
};

const updateLandingBanner = async (req, res) => {
  try {
    const { alt, heading, heading_color, page, banner } = req.body;
    const altText = req.body.alt;

    const existingBanner = await landingBannerModel.findById(req.params._id);

    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found." });
    }
    let fileType = "";
    let bannerData = {
      filename: existingBanner.banner.filename,
      filepath: existingBanner.banner.filepath,
      iframe: existingBanner.banner.iframe,
    };
    const file = req.file;
    // Check if banner file is provided
    if (file) {
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .jpg, or .png image.",
        });
      }

      if (!altText || altText.trim() === "") {
        return res.status(400).json({
          message: "Alt text is required when uploading an image.",
        });
      }
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "landing_banners",
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

      bannerData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
        iframe: null,
      };

      fileType = "image";
    } else if (banner !== undefined && banner !== null) {
      const trimmedBanner = banner.trim();

      // Check if banner is a URL
      const isURL = (str) => {
        try {
          fileType = "video";
          new URL(str);
          return true;
        } catch (error) {
          return false;
        }
      };

      if (trimmedBanner && !isURL(trimmedBanner)) {
        return res.status(400).json({
          message: "Invalid banner URL.",
        });
      }

      // Set banner data for video
      bannerData = {
        filename: null,
        filepath: null,
        iframe: trimmedBanner,
      };
    }

    let updatedPage = existingBanner.page;

    if (page && page !== existingBanner.page) {
      const conflictingBanner = await landingBannerModel.findOne({ page });

      if (conflictingBanner) {
        // Swap pages
        await landingBannerModel.findByIdAndUpdate(conflictingBanner._id, {
          page: existingBanner.page,
        });

        updatedPage = page; // Assign the new page to the current banner
      } else {
        // No conflict, update page normally
        updatedPage = page;
      }
    }

    // Create object with updated fields
    const updatedFields = {
      ...(heading && { heading }),
      ...(heading_color && { heading_color }),
      alt: fileType === "image" ? altText : "",
      page: updatedPage,
      banner: bannerData,
      type: fileType,
    };

    const updatedBanner = await landingBannerModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Landing banner updated successfully.",
      updatedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating landing banner due to ${error.message}`,
    });
  }
};

const getLandingBanner = async (req, res) => {
  try {
    const banner = await landingBannerModel.findById(req.params._id);

    if (!banner) {
      return res.status(400).json({
        message: "No banner is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Landing banner fetched successfully.",
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching landing banner due to ${error.message}`,
    });
  }
};

const getLandingBanners = async (req, res) => {
  try {
    const banners = await landingBannerModel.find();

    if (banners.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All landing banners fetched successfully.",
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching landing banners due to ${error.message}`,
    });
  }
};

const deleteLandingBanner = async (req, res) => {
  try {
    const bannerExists = await landingBannerModel.findById({
      _id: req.params._id,
    });

    if (bannerExists.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }

    const deletedLandingBanner = await landingBannerModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Landing banner deleted successfully.",
      deletedLandingBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting landing banner due to ${error.message}`,
    });
  }
};

module.exports = {
  createLandingBanner,
  updateLandingBanner,
  getLandingBanner,
  getLandingBanners,
  deleteLandingBanner,
};
