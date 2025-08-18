const OfferModel = require("../../models/lvt/whatWeOfferModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createWhatWeOffer = async (req, res) => {
  try {
    const { yellow_title, black_title, alt, subtitle, brochure, image } =
      req.body;

    const imageFile = req.files?.image?.[0];
    const brochureFile = req.files?.brochure?.[0];

    const altText = alt?.trim();
    if (imageFile && !altText) {
      return res.status(400).json({
        message: "Alt text is required when uploading an image.",
      });
    }
    const brochureExist = path.extname(brochureFile.originalname).toLowerCase();
    if (brochureExist !== ".pdf") {
      return res
        .status(400)
        .json({ message: "Only PDF file are allowed for brochure." });
    }

    const validExt = [".jpg", ".jpeg", ".png", ".webp"];

    if (imageFile) {
      const imageExt = path.extname(imageFile.originalname).toLowerCase();
      if (!validExt.includes(imageExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for image." });
      }
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "what-we-offer/images",
      resource_type: "image",
    });

    const imageData = {
      filename: imageUpload.original_filename,
      filepath: imageUpload.secure_url,
    };

    const brochureData = {
      filename: brochureFile.filename,
      filepath: path.join("uploads/offer_brochure", brochureFile.filename),
    };

    const newWhatWeOffer = new OfferModel({
      yellow_title,
      black_title,
      subtitle,
      brochure: brochureData,
      image: imageData,
      alt: altText,
    });

    await newWhatWeOffer.save();

    res.status(200).json({
      message: "WhatWeOffer added successfully.",
      newWhatWeOffer,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error adding WhatWeOffer: ${error.message}`,
    });
  }
};

const updateWhatWeOffer = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, alt } = req.body;
    const currentWhatWeOffer = await OfferModel.findOne({});

    if (!currentWhatWeOffer) {
      return res.status(404).json({ message: "WhatWeOffer not found." });
    }

    const updatedFields = {};
    const imageFile = req.files?.image?.[0];
    const brochureFile = req.files?.brochure?.[0];

    const validExt = [".jpg", ".jpeg", ".png", ".webp"];

    // Handle image upload
    if (imageFile) {
      const imageExt = path.extname(imageFile.originalname).toLowerCase();
      if (!validExt.includes(imageExt)) {
        return res
          .status(400)
          .json({ message: "Invalid file type for image." });
      }

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "what-we-offer/images",
        resource_type: "image",
      });

      updatedFields.image = [
        {
          filename: imageUpload.original_filename,
          filepath: imageUpload.secure_url,
          alt: alt || currentWhatWeOffer.image?.[0]?.alt || "",
        },
      ];
    }

    // Handle brochure upload
    if (brochureFile) {
      const brochureExt = path.extname(brochureFile.originalname).toLowerCase();
      if (brochureExt !== ".pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF files are allowed for brochure." });
      }

      updatedFields.brochure = [
        {
          filename: brochureFile.filename,
          filepath: path.join("uploads/offer_brochure", brochureFile.filename),
        },
      ];
    }

    // Update text fields
    if (typeof yellow_title !== "undefined")
      updatedFields.yellow_title = yellow_title;
    if (typeof black_title !== "undefined")
      updatedFields.black_title = black_title;
    if (typeof subtitle !== "undefined") updatedFields.subtitle = subtitle;

    // Update the model
    const updatedWhatWeOffer = await OfferModel.findByIdAndUpdate(
      currentWhatWeOffer._id,
      { $set: updatedFields },
      { new: true }
    );

    return res.status(200).json({
      message: "WhatWeOffer updated successfully.",
      updatedWhatWeOffer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating WhatWeOffer: ${error.message}`,
    });
  }
};

const getWhatWeOffer = async (req, res) => {
  try {
    const whatWeOffer = await OfferModel.findOne({});

    if (!whatWeOffer) {
      return res.status(400).json({
        message: "No WhatWeOffer is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "WhatWeOffer fetched successfully.",
      whatWeOffer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching WhatWeOffer due to ${error.message}`,
    });
  }
};

const deleteWhatWeOffer = async (req, res) => {
  try {
    const whatWeOffer = await OfferModel.findOne({});

    if (whatWeOffer.length === 0) {
      return res.status(400).json({
        message: "No WhatWeOffer added to delete. Kindly add one.",
      });
    }

    const deletedWhatWeOffer = await OfferModel.findByIdAndDelete(
      whatWeOffer._id
    );

    return res.status(200).json({
      message: "WhatWeOffer deleted successfully.",
      deletedWhatWeOffer,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting WhatWeOffer due to ${error.message}`,
    });
  }
};

module.exports = {
  createWhatWeOffer,
  updateWhatWeOffer,
  getWhatWeOffer,
  deleteWhatWeOffer,
};
