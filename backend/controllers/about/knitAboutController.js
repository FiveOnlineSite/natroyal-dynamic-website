const knitAboutModel = require("../../models/about/knitAboutModel");

const createKnitAbout = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content } = req.body;

    const newKnitAbout = new knitAboutModel({
      yellow_title,
      black_title,
      subtitle,
      content,
    });

    await newKnitAbout.save();

    return res.status(200).json({
      message: "Added knit knitAbout content successfully.",
      newKnitAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding knit knitAbout content due to ${error.message}`,
    });
  }
};

const updateKnitAbout = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle, content } = req.body;

    const currentKnitAbout = await knitAboutModel.findOne({});

    if (!currentKnitAbout) {
      return res.status(404).json({ message: "About content not found." });
    }

    const updatedFields = {
      yellow_title,
      black_title,
      subtitle,
      content,
    };

    const updatedKnitAbout = await knitAboutModel.findByIdAndUpdate(
      currentKnitAbout._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Knit about content updated successfully.",
      updatedKnitAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating knit about content due to ${error.message}`,
    });
  }
};

// const getKnitAbout = async (req, res) => {
//   try {
//     const banner = await knitAboutModel.findById(req.params._id);

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

const getKnitAbout = async (req, res) => {
  try {
    const knitAbout = await knitAboutModel.find();

    if (knitAbout.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "Knit about content fetched successfully.",
      count: knitAbout.length,
      knitAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching knit about content due to ${error.message}`,
    });
  }
};

const deleteKnitAbout = async (req, res) => {
  try {
    const knitAboutContent = await knitAboutModel.findOne({});

    if (knitAboutContent.length === 0) {
      return res.status(400).json({
        message: "No knit about content added to delete. Kindly add one.",
      });
    }

    const deletedKnitAbout = await knitAboutModel.findByIdAndDelete(
      knitAboutContent._id
    );

    return res.status(200).json({
      message: "Knit about content deleted successfully.",
      deletedKnitAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting knit about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createKnitAbout,
  updateKnitAbout,
  getKnitAbout,
  //   getKnitAbouts,
  deleteKnitAbout,
};
