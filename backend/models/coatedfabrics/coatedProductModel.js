const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoatedProductsSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
    type: String,
  },
  content: {
    type: String,
  },
  product: [
    {
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
      product_content: {
        type: String,
      },
      button: {
        type: String,
      },
      button_url: {
        type: String,
      },
      application_id: {
        type: mongoose.Types.ObjectId,
        ref: "Coated Application",
        required: true,
      },
    },
  ],
});

const CoatedProductsModel = mongoose.model(
  "Coated Products",
  CoatedProductsSchema
);

module.exports = CoatedProductsModel;
