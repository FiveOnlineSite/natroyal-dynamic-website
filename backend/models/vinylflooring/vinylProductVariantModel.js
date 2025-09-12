const mongoose = require("mongoose");

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
    trim: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,   // <- use Schema.Types.ObjectId
    ref: "vinylproducts",
    required: true,
  },
});

VinylProductVariantSchema.index({ name: 1, product: 1 }, { unique: true });

const VinylProductVariantModel = mongoose.model(
  "vinylproductvariant",     // also correct the typo in model name
  VinylProductVariantSchema
);

module.exports = VinylProductVariantModel;
