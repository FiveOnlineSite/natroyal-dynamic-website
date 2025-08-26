const bannerModel = require("../../models/banners/bannerModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const { uploadToS3 } = require("../../utils/s3Uploads");

const createBanner = async (req, res) => {
  try {
    const { alt, heading, banner, page } = req.body;
    let bannerData = {};
    let fileType = "";

    const isURL = (str) => {
      try {
        new URL(str);
        return true;
      } catch {
        return false;
      }
    };

    if (isURL(banner)) {
      fileType = "video";
      bannerData = { filename: null, filepath: null, iframe: banner.trim() };
    } else {
      const file = req.file;
      if (!file) return res.status(400).json({ message: "File is required" });

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
      const isVideo = [".mp4", ".mov", ".avi"].includes(ext);

      if (!isImage && !isVideo)
        return res.status(400).json({ message: "Unsupported file type" });

      if (isImage && (!alt || alt.trim() === ""))
        return res.status(400).json({ message: "Alt text required for images" });

      // ✅ Already uploaded by multer-s3
      fileType = isImage ? "image" : "video";
      bannerData = {
        filename: file.originalname,
        filepath: file.location, // <-- S3 URL
        iframe: null,
      };
    }

    const existingPage = await bannerModel.findOne({ page: page.trim() });
    if (existingPage)
      return res.status(400).json({ message: "Banner already exists for this page" });

    const newBanner = new bannerModel({
      type: fileType,
      alt: fileType === "image" ? alt : "",
      heading,
      banner: bannerData,
      page,
    });

    await newBanner.save();
    res.status(200).json({ message: "Banner created", newBanner });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { alt, heading, page, banner } = req.body;

    const existingBanner = await bannerModel.findById(req.params._id);

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

      const altText = req.body.alt;

      if (!altText || altText.trim() === "") {
        return res.status(400).json({
          message: "Alt text is required when uploading an image.",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "banners",
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
      const conflictingBanner = await bannerModel.findOne({ page });

      if (conflictingBanner) {
        // Swap pages
        await bannerModel.findByIdAndUpdate(conflictingBanner._id, {
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
      heading,
      page: updatedPage,
      banner: bannerData,
      alt: fileType === "image" ? altText : "",
      type: fileType,
    };

    const updatedBanner = await bannerModel.findByIdAndUpdate(
      req.params._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Banner updated successfully.",
      updatedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating banner due to ${error.message}`,
    });
  }
};

const getBanner = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params._id);

    if (!banner) {
      return res.status(400).json({
        message: "No banner is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Banner fetched successfully.",
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching banner due to ${error.message}`,
    });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find();

    if (banners.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All banners fetched successfully.",
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching banners due to ${error.message}`,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const bannerExists = await bannerModel.findById({
      _id: req.params._id,
    });

    if (bannerExists.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }

    const deletedBanner = await bannerModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Banner deleted successfully.",
      deletedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting banner due to ${error.message}`,
    });
  }
};

module.exports = {
  createBanner,
  updateBanner,
  getBanner,
  getBanners,
  deleteBanner,
};
