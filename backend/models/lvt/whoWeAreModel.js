const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WhoWeAreSchema = new mongoose.Schema({
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

const WhoWeAreModel = mongoose.model("Who We Are", WhoWeAreSchema);

module.exports = WhoWeAreModel;
