const homeBannerModel = require("../../models/banners/homeBannerModel");
const path = require("path");

const createHomeBanner = async (req, res) => {
  try {
    const { heading, heading_color, button, button_url, banner } = req.body;
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
            

    if ((!button && button_url) || (!button_url && button)) {
      return res.status(400).json({
        message:
          "Both 'Button' and 'Button Url' are required if either is provided.",
      });
    }

    const headingColor = heading_color || "#ffffff";

    const totalHomeBanners = await homeBannerModel.countDocuments();

    const newBanner = new homeBannerModel({
      type: fileType,
      alt: fileType === "image" ? altText : "", // safe to use altText now
      heading,
      heading_color: headingColor,
      button,
      button_url,
      banner: bannerData,
      sequence: totalHomeBanners + 1,
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
    const { alt, heading, heading_color, button, button_url, sequence } = req.body;
    const bannerId = req.params._id;

    const existingBanner = await homeBannerModel.findById(bannerId);
    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    let altText = alt || ""; 
    let fileType = existingBanner.type;
     let bannerData = existingBanner.banner;

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

    if (
      (req.body.button && !req.body.button_url) ||
      (!req.body.button && req.body.button_url)
    ) {
      return res.status(400).json({
        message:
          "Both 'Button' and 'Button Url' are required if either is provided.",
      });
    }

   updatedFields = {
      heading,
      heading_color,
      button,
      button_url,
      banner: bannerData,
      type: fileType,
      alt: fileType === "image" ? altText : "", // clear alt if it's video
    };

    if (sequence !== undefined) {
      const newSequence = Number(sequence);

      if (newSequence !== existingBanner.sequence) {
        // Only look in the same application
        const otherBanners = await homeBannerModel.findOne({
          
          sequence: newSequence,
          _id: { $ne: existingBanner._id },
        });

        if (otherBanners) {
      // Swap their sequence values
      await homeBannerModel.findByIdAndUpdate(otherBanners._id, {
        sequence: existingBanner.sequence,
      });
    }
        updatedFields.sequence = newSequence;
      }
    }

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
    const banners = await homeBannerModel.find().sort({sequence: 1});

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
    const { _id } = req.params;

    // Find the banner first
    const deletedBanner = await homeBannerModel.findById(_id);

    if (!deletedBanner) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }

    const deletedSeq = deletedBanner.sequence;

    // Delete the banner
    await homeBannerModel.findByIdAndDelete(_id);

    // Shift sequences of other banners
    const result = await homeBannerModel.updateMany(
      { sequence: { $gt: deletedSeq } },
      { $inc: { sequence: -1 } }
    );

    console.log("Shifted", result.modifiedCount, "docs");

    // Return updated list
    const updatedList = await homeBannerModel.find().sort({ sequence: 1 }).lean();

    return res.status(200).json({
      message: "Home banner deleted & sequence updated successfully.",
      updatedCount: result.modifiedCount,
      homeBanners: updatedList,
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
