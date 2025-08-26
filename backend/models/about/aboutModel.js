const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new mongoose.Schema({
  video_url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const AboutModel = mongoose.model("About", AboutSchema);

module.exports = AboutModel;
