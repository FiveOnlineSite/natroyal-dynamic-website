const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LvtAboutSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const LvtAboutModel = mongoose.model("LVT About", LvtAboutSchema);

module.exports = LvtAboutModel;
