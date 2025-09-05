const seatingAboutModel = require("../../models/about/seatingAboutModel");
const path = require("path");

const createSeatingAbout = async (req, res) => {
  try {
    const { title1, title2, content, subtitle, image, alt } = req.body;

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
    
    imageData = {
      filename: path.basename(file.key), // "1756968423495-2.jpg"
      filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
    };

    const newSeatingAbout = new seatingAboutModel({
      title1,
      title2,
      content,
      image: imageData,
      alt,
    });

    await newSeatingAbout.save();

    return res.status(200).json({
      message: "Added seating about content successfully.",
      newSeatingAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding seating about content due to ${error.message}`,
    });
  }
};

const updateSeatingAbout = async (req, res) => {
  try {
    const { title1, title2, content, image, alt } = req.body;

    const currentSeatingAbout = await seatingAboutModel.findOne({});

    if (!currentSeatingAbout) {
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
     
      const imageData = {
          filename: path.basename(file.key), // "1756968423495-2.jpg"
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
        };

      updatedFields.image = imageData;
    } else {
      // Preserve the existing logo if no new file uploaded
      updatedFields.image = currentSeatingAbout.image;
    }

    if (typeof title1 !== "undefined")
      updatedFields.title1 = title1;
    if (typeof title2 !== "undefined")
      updatedFields.title2 = title2;
    if (typeof content !== "undefined") updatedFields.content = content;
    if (typeof alt !== "undefined") updatedFields.alt = alt;

    const updatedSeatingAbout = await seatingAboutModel.findByIdAndUpdate(
      currentSeatingAbout._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Seating about content updated successfully.",
      updatedSeatingAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating seating about content due to ${
        error.message || error
      }`,
    });
  }
};

// const getSeatingAbout = async (req, res) => {
//   try {
//     const banner = await seatingAboutModel.findById(req.params._id);

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

const getSeatingAbout = async (req, res) => {
  try {
    const seatingAbout = await seatingAboutModel.find();

    if (seatingAbout.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "Seating about content fetched successfully.",
      count: seatingAbout.length,
      seatingAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching seating about content due to ${error.message}`,
    });
  }
};

const deleteSeatingAbout = async (req, res) => {
  try {
    const seatingAboutContent = await seatingAboutModel.findOne({});

    if (seatingAboutContent.length === 0) {
      return res.status(400).json({
        message: "No seating about content added to delete. Kindly add one.",
      });
    }

    const deletedSeatingAbout = await seatingAboutModel.findByIdAndDelete(
      seatingAboutContent._id
    );

    return res.status(200).json({
      message: "Seating about content deleted successfully.",
      deletedSeatingAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting seating about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createSeatingAbout,
  updateSeatingAbout,
  getSeatingAbout,
  //   getSeatingAbouts,
  deleteSeatingAbout,
};
