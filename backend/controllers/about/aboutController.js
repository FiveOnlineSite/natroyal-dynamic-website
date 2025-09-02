const aboutModel = require("../../models/about/aboutModel");

const createAbout = async (req, res) => {
  try {
    const { video_url, content } = req.body;

    const newAbout = new aboutModel({
      video_url,
      content,
    });

    await newAbout.save();

    return res.status(200).json({
      message: "Added about content successfully.",
      newAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding about content due to ${error.message}`,
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { video_url, content } = req.body;
    console.log("about", req.body);

    const currentAbout = await aboutModel.findOne({});

    if (!currentAbout) {
      return res.status(404).json({ message: "About content not found." });
    }

    const updatedFields = {
      video_url: video_url,
      content: content,
    };

    const updatedAbout = await aboutModel.findByIdAndUpdate(
      currentAbout._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "About content updated successfully.",
      updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating about content due to ${error.message}`,
    });
  }
};

// const getAbout = async (req, res) => {
//   try {
//     const banner = await aboutModel.findById(req.params._id);

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

const getAbout = async (req, res) => {
  try {
    const about = await aboutModel.find();

    if (about.length === 0) {
      return res.status(400).json({
        message: "About content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "About content fetched successfully.",
      count: about.length,
      about,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching about content due to ${error.message}`,
    });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const aboutContent = await aboutModel.findOne({});

    if (aboutContent.length === 0) {
      return res.status(400).json({
        message: "No about content added to delete. Kindly add one.",
      });
    }

    const deletedAbout = await aboutModel.findByIdAndDelete(aboutContent._id);

    return res.status(200).json({
      message: "About content deleted successfully.",
      deletedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting about content due to ${error.message}`,
    });
  }
};

module.exports = {
  createAbout,
  updateAbout,
  getAbout,
  //   getAbouts,
  deleteAbout,
};
