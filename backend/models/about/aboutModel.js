const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new mongoose.Schema({
  video: {
    filename: { type: String },
    filepath: { type: String },
  },
  content: {
    type: String,
    required: true,
  },
});


const AboutModel = mongoose.model("About", AboutSchema);

module.exports = AboutModel;
