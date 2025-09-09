const bannerModel = require("../../models/banners/bannerModel");
const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel")
const CoatedApplicationModel = require("../../models/coatedfabrics/coatedAppModel")
const SeatingApplicationModel = require("../../models/seatingcomponents/seatingAppModel")
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel")
const CoatedProductModel = require("../../models/coatedfabrics/coatedProductModel")
const SeatingProductModel = require("../../models/seatingcomponents/seatingProductModel")

const path = require("path");

const createBanner = async (req, res) => {
  try {
    const { alt, heading, page } = req.body;
    let bannerData = {};
    let fileType = "";

    const file = req.file;
    if (!file) return res.status(400).json({ message: "File is required" });

    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
    const isVideo = [".mp4"].includes(ext);

    if (!isImage && !isVideo)
      return res.status(400).json({ message: "Unsupported file type" });

    if (isImage && (!alt || alt.trim() === ""))
      return res
        .status(400)
        .json({ message: "Alt text required for images" });

    const maxImageSize = 2 * 1024 * 1024; // 2 MB
    const maxVideoSize = 10 * 1024 * 1024; // 10 MB

    if (isImage && file.size > maxImageSize) {
      return res
        .status(400)
        .json({ message: "Image size should be max 2 MB" });
    }

    if (isVideo && file.size > maxVideoSize) {
      return res
        .status(400)
        .json({ message: "Video size should be max 10 MB" });
    }

    bannerData = {
      filename: path.basename(file.key), // "1756968423495-2.jpg"
      filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
    };

    fileType = isImage ? "image" : "video";

    const existingPage = await bannerModel.findOne({ page: page.trim() });
    if (existingPage)
      return res
        .status(400)
        .json({ message: "Banner already exists for this page" });

    const newBanner = new bannerModel({
      type: fileType,
      alt: fileType === "image" ? alt : "",
      heading,
      banner: bannerData, // { filename, filepath }
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
   let fileType = existingBanner.type;
    let bannerData = existingBanner.banner;

     const altText = req.body.alt;

    if (req.file) {
    const file = req.file;

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
      const isVideo = [".mp4"].includes(ext);

      if (!isImage && !isVideo) {
        return res.status(400).json({
          message: "Unsupported file type. Please upload an image (.webp, .jpg, .jpeg, .png) or video (.mp4).",
        });
      }

      if(isImage){
        if (!altText || altText.trim() === "") {
        return res.status(400).json({
          message: "Alt text is required when uploading an image.",
        });
      }
      }
     
       const maxImageSize = 2 * 1024 * 1024; 
    const maxVideoSize = 10 * 1024 * 1024; 

    if (isImage && file.size > maxImageSize){
        return res.status(400).json({
          message: "Image size should be max 2 mb"
        })
      }

      if (isVideo && file.size > maxVideoSize){
        return res.status(400).json({
          message: "Video size should be max 10 mb"
        })
      }

      fileType = isImage ? "image" : "video";
       bannerData = {
      filename: path.basename(file.key), // "1756968423495-2.jpg"
      filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
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

const getBannerByPage = async (req, res) => {
  try {
    let page = decodeURIComponent(req.params[0]);

    if (!page.startsWith("/")) {
      page = `/${page}`;
    }

    const banner = await bannerModel.findOne({ page });

    if (!banner) {
      return res.status(404).json({ message: "No banner found for this page" });
    }

    res.status(200).json({ banner });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};


const getPagesForBanner = async (req, res) => {
  try {
    const vinylApps = await VinylApplicationModel.find().select("name");
    const coatedApps = await CoatedApplicationModel.find().select("name");
    const seatingApps = await SeatingApplicationModel.find().select("name");
    const vinylProducts = await VinylProductModel.find().select("name");

    const slugify = (str) => {
      if (!str || typeof str !== "string") return "";
      return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/\//g, "-"); 
    };

    const safePage = (label, url) => ({
      label: label || "Untitled Page",
      url: url && typeof url === "string" && url.trim() !== "" ? url : "#",
    });

    const vinylPages = vinylApps
      .filter(app => app?.name)
      .map(app =>
        safePage(
          `Vinyl Application - ${app.name}`,
          `/vinyl-flooring/applications/${slugify(app.name)}`
        )
      );

    const coatedPages = coatedApps
      .filter(app => app?.name)
      .map(app =>
        safePage(
          `Coated Application - ${app.name}`,
          `/coated-fabrics/applications/${slugify(app.name)}`
        )
      );

    const seatingPages = seatingApps
      .filter(app => app?.name)
      .map(app =>
        safePage(
          `Seating Application - ${app.name}`,
          `/seating-components/applications/${slugify(app.name)}`
        )
      );

    const vinylProductPages = vinylProducts
      .filter(prod => prod?.name)
      .map(prod =>
        safePage(
          `Vinyl Product - ${prod.name}`,
          prod.name === "LVT"
            ? "/lvt-flooring"
            : `/vinyl-flooring/products/${slugify(prod.name)}`
        )
      );

    const pages = [
      ...vinylPages,
      ...coatedPages,
      ...seatingPages,
      ...vinylProductPages,
    ];

    res.status(200).json({
      message: "Pages fetched succesfully",
      pages
    });
  } catch (error) {
    console.error("Error in getPagesForBanner:", error);
    res
      .status(500)
      .json({ message: "Error fetching pages", error: error.message });
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
  getPagesForBanner,
  getBannerByPage,
  getBanner,
  getBanners,
  deleteBanner,
};
