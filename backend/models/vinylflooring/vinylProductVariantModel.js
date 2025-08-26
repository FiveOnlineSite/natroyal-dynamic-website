const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductVariantSchema = new mongoose.Schema({
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
        unique: true,
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "vinylproducts",
        required: true,
      },
});

const VinylProductVariantModel = mongoose.model(
  "vinylproductvriant",
  VinylProductVariantSchema
);

module.exports = VinylProductVariantModel;
