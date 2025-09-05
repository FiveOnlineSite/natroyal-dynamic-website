const landingBannerModel = require("../../models/banners/landingBannerModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createLandingBanner = async (req, res) => {
  try {
    const { alt, heading, heading_color, banner, page } = req.body;
    const altText = req.body.alt || ""; // move here to access earlier

    let bannerData = {};
    let fileType = "";

      const file = req.file;
          if (!file) {
            return res.status(400).json({
              message:
                "Either a file or a valid URL is required for the banner field.",
            });
          }
    
          const extname = path.extname(file.originalname).toLowerCase();
          const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
           const isVideo = [".mp4"].includes(extname);
    
          if (!isImage && !isVideo)
                  return res.status(400).json({ message: "Unsupported file type" });
          
                if (isImage && (!altText || altText.trim() === ""))
                  return res.status(400).json({ message: "Alt text required for images" });
          
          
                  const maxImageSize = 2 * 1024 * 1024; // 2 MB
              const maxVideoSize = 10 * 1024 * 1024; // 10 MB
          
                if (isImage & file.size > maxImageSize){
                  return res.status(400).json({
                    message: "Image size should be max 2 mb"
                  })
                }
          
                if (isVideo & file.size > maxVideoSize){
                  return res.status(400).json({
                    message: "Video size should be max 10 mb"
                  })
                }
          
                fileType = isImage ? "image" : "video";
               bannerData = {
                               filename: path.basename(file.key), 
                               filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                             };

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

    const existingBanner = await landingBannerModel.findById(req.params._id);

    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found." });
    }
    
     let bannerData = existingBanner.banner;
    
        let altText = alt || ""; // fallback to empty string
        let fileType = existingBanner.type; // default to existing type
    
       const file = req.file;
        if (req.file) {
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

const getLandingBannerByPage = async (req, res) => {
  try {
    let { page } = req.params;

     if (!page.startsWith("/")) {
      page = `/${page}`;
    }

    const banner = await landingBannerModel.findOne({ page });
    if (!banner) {
      return res.status(404).json({ message: "No banner found for this page" });
    }
    res.status(200).json({ banner });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
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
  getLandingBannerByPage,
  getLandingBanner,
  getLandingBanners,
  deleteLandingBanner,
};
