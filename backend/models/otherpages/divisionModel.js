const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DivisionSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  logo: {
    type: Array,
    required: true,
  },
  logo_alt: {
    type: String,
    required: true,
  },
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
  button: {
    type: String,
    required: true,
  },
  button_url: {
    type: String,
    required: true,
  },
});

const DivisionModel = mongoose.model("Division", DivisionSchema);

module.exports = DivisionModel;
