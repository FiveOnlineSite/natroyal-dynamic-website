const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductVariantSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
    type: String,
  },
  content: {
    type: String,
  },
  variant: [
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
        required: true,
      },
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "vinylproduct",
        required: true,
      },
    },
  ],
});

const VinylProductVariantModel = mongoose.model(
  "vinylproductvriant",
  VinylProductVariantSchema
);

module.exports = VinylProductVariantModel;
