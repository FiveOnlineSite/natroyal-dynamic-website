const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: { type: String },
  filepath: { type: String },
});

const CoatedProductsSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  button: {
    type: String,
  },
  brochure: {
    type: FileSchema,
  },
  application: {
    type: mongoose.Types.ObjectId,
    ref: "coatedapplications",
    required: true,
  },
});

const CoatedProductsModel = mongoose.model(
  "coatedproducts",
  CoatedProductsSchema
);

module.exports = CoatedProductsModel;
