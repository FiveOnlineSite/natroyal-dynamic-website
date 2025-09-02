const homeBannerModel = require("../../models/banners/homeBannerModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createHomeBanner = async (req, res) => {
  try {
    const { heading, heading_color, button, button_url, banner } = req.body;
    const altText = req.body.alt || ""; // move here to access earlier
    let bannerData = {};
    let fileType = "";

    console.log("req", req.body);

    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (isURL(banner)) {
      // It's a video
      fileType = "video";
      bannerData = {
        filename: null,
        filepath: null,
        iframe: banner.trim(),
      };
    } else {
      // It's an image file
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          message:
            "Either a file or a valid URL is required for the banner field.",
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

      // ✅ Validate alt text here
      if (!altText || altText.trim() === "") {
        return res.status(400).json({
          message: "Alt text is required when uploading an image.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "home_banners",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fileType = "image";
      bannerData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
        iframe: null,
      };
    }

    if ((!button && button_url) || (!button_url && button)) {
      return res.status(400).json({
        message:
          "Both 'Button' and 'Button Url' are required if either is provided.",
      });
    }

    const headingColor = heading_color || "#ffffff";

    const newBanner = new homeBannerModel({
      type: fileType,
      alt: fileType === "image" ? altText : "", // safe to use altText now
      heading,
      heading_color: headingColor,
      button,
      button_url,
      banner: bannerData,
    });

    await newBanner.save();

    return res.status(200).json({
      message: "Added new home banner successfully.",
      newBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding new home banner due to ${error.message}`,
    });
  }
};

const updateHomeBanner = async (req, res) => {
  try {
    const { alt, heading, heading_color, button, button_url } = req.body;
    const banner = req.body.banner;

    const existingBanner = await homeBannerModel.findById(req.params._id);
    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    let bannerData = {
      filename: existingBanner.banner.filename,
      filepath: existingBanner.banner.filepath,
      iframe: existingBanner.banner.iframe,
    };

    let altText = alt || ""; // fallback to empty string
    let fileType = existingBanner.type; // default to existing type

    let file = req.file;

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
        folder: "home_banners",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      bannerData = {
        filename: uploadResult.original_filename,
        filepath: uploadResult.secure_url,
        iframe: null,
      };

      fileType = "image";
    } else if (
      typeof banner === "string" &&
      banner.trim() !== "" &&
      banner.trim().startsWith("http")
    ) {
      try {
        new URL(banner.trim());
        bannerData = {
          filename: null,
          filepath: null,
          iframe: banner.trim(),
        };

        fileType = "video";
        altText = "";
      } catch (err) {
        return res.status(400).json({ message: "Invalid banner URL." });
      }
    }

    if (
      (req.body.button && !req.body.button_url) ||
      (!req.body.button && req.body.button_url)
    ) {
      return res.status(400).json({
        message:
          "Both 'Button' and 'Button Url' are required if either is provided.",
      });
    }

    const updatedFields = {
      heading,
      heading_color,
      button,
      button_url,
      banner: bannerData,
      type: fileType,
      alt: fileType === "image" ? altText : "", // clear alt if it's video
    };

    const updatedBanner = await homeBannerModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Home banner updated successfully.",
      updatedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating home banner due to ${error.message}`,
    });
  }
};

const getHomeBanner = async (req, res) => {
  try {
    const banner = await homeBannerModel.findById(req.params._id);

    if (!banner) {
      return res.status(400).json({
        message: "No banner is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Home banner fetched successfully.",
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching home banner due to ${error.message}`,
    });
  }
};

const getHomeBanners = async (req, res) => {
  try {
    const banners = await homeBannerModel.find();

    if (banners.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All home banners fetched successfully.",
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching home banners due to ${error.message}`,
    });
  }
};

const deleteHomeBanner = async (req, res) => {
  try {
    const bannerExists = await homeBannerModel.findById({
      _id: req.params._id,
    });

    if (bannerExists.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }

    const deletedHomeBanner = await homeBannerModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Home banner deleted successfully.",
      deletedHomeBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting home banner due to ${error.message}`,
    });
  }
};

module.exports = {
  createHomeBanner,
  updateHomeBanner,
  getHomeBanner,
  getHomeBanners,
  deleteHomeBanner,
};
