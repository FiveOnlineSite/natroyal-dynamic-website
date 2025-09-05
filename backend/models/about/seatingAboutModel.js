const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingAboutSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
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

const SeatingAboutModel = mongoose.model("Seating About", SeatingAboutSchema);

module.exports = SeatingAboutModel;
