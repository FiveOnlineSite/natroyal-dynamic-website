const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextilesSchema = new mongoose.Schema({
  title: {
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
  lamination_content: {
    type: String,
  },
  coating_content: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const TextilesModel = mongoose.model("Textiles", TextilesSchema);

module.exports = TextilesModel;
