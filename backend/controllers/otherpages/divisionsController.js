const DivisionModel = require("../../models/otherpages/divisionModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createDivision = async (req, res) => {
  try {
    const { alt, logo_alt, title, content, button, button_url } = req.body;

    const files = req.files;

    const imageFile = files?.image?.[0];
    const logoFile = files?.logo?.[0];

    if (!imageFile || !logoFile) {
      return res.status(400).json({
        message: "Both image and logo files are required.",
      });
    }

    const validExt = [".jpg", ".jpeg", ".png", ".webp"];

    const imageExt = path.extname(imageFile.originalname).toLowerCase();
    const logoExt = path.extname(logoFile.originalname).toLowerCase();

    if (!validExt.includes(imageExt) || !validExt.includes(logoExt)) {
      return res.status(400).json({
        message: `Invalid file type for image or logo at index ${i}.`,
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "division/images",
      resource_type: "image",
    });

    const logoUpload = await cloudinary.uploader.upload(logoFile.path, {
      folder: "division/logos",
      resource_type: "image",
    });

    // Clean up
    [imageFile, logoFile].forEach((file) => {
      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    const imageData = {
      filename: imageUpload.original_filename,
      filepath: imageUpload.secure_url,
    };

    const logoData = {
      filename: logoUpload.original_filename,
      filepath: logoUpload.secure_url,
    };

    const newDivision = new DivisionModel({
      alt,
      logo_alt,
      title,
      content,
      button,
      button_url,
      image: imageData,
      logo: logoData,
    });

    await newDivision.save();

    return res.status(201).json({
      message: "Division item created successfully",
      newDivision,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating division item: ${error.message}`,
    });
  }
};

const updateDivision = async (req, res) => {
  try {
    const { alt, logo_alt, title, content, button, button_url } = req.body;

    const currentDivision = await DivisionModel.findById(req.params._id);

    if (!currentDivision) {
      return res.status(404).json({ message: "Division not found." });
    }

    const files = req.files;

    const imageFile = files?.image?.[0];
    const logoFile = files?.logo?.[0];

    let imageData;
    let logoData;

    const updatedFields = {
      alt: alt ?? currentDivision.alt,
      logo_alt: logo_alt ?? currentDivision.logo_alt,
      title: title ?? currentDivision.title,
      content: content ?? currentDivision.content,
      button: button ?? currentDivision.button,
      button_url: button_url ?? currentDivision.button_url,
    };

    if (imageFile) {
      const extname = path.extname(imageFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported image type for image: ${imageFile.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: "division/images",
        resource_type: "image",
      });

      fs.unlinkSync(path.resolve(imageFile.path));

      imageData = [
        {
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        },
      ];
    } else {
      updatedFields.image = currentDivision.image;
    }

    if (logoFile) {
      const extname = path.extname(logoFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported image type for logo: ${logoFile.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(logoFile.path, {
        folder: "division/logos",
        resource_type: "image",
      });

      fs.unlinkSync(path.resolve(logoFile.path));

      logoData = [
        {
          filename: uploadResult.original_filename,
          filepath: uploadResult.secure_url,
        },
      ];
    } else {
      updatedFields.logo = currentDivision.logo;
    }

    const updatedDivision = await DivisionModel.findByIdAndUpdate(
      currentDivision._id,
      updatedFields,
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Division item updated successfully.",
      updatedDivision,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating division item due to ${
        error.message || error
      }`,
    });
  }
};

const getDivision = async (req, res) => {
  try {
    const division = await DivisionModel.findById(req.params._id);

    if (!division) {
      return res.status(400).json({
        message: "No division is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Division item fetched successfully.",
      division,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching division item due to ${error.message}`,
    });
  }
};

const getDivisions = async (req, res) => {
  try {
    const divisions = await DivisionModel.find();

    if (divisions.length === 0) {
      return res.status(400).json({
        message: "Division not added. Kindly add one.",
      });
    }

    return res.status(200).json({
      message: "Division items fetched successfully.",
      divisionCount: divisions.length,
      divisions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching division items due to ${error.message}`,
    });
  }
};

const deleteDivision = async (req, res) => {
  try {
    const division = await DivisionModel.findById(req.params._id);

    if (division.length === 0) {
      return res.status(400).json({
        message: "No division item added to delete. Kindly add one.",
      });
    }

    const deletedDivision = await DivisionModel.findByIdAndDelete(division);

    return res.status(200).json({
      message: "Division item deleted successfully.",
      deletedDivision,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting division item due to ${error.message}`,
    });
  }
};

module.exports = {
  createDivision,
  updateDivision,
  getDivision,
  getDivisions,
  deleteDivision,
};
