const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextilesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  lamination_content: {
    type: String,
  },
  coating_content: {
    type: String,
  },
});

const TextilesModel = mongoose.model("textiles", TextilesSchema);

module.exports = TextilesModel;
