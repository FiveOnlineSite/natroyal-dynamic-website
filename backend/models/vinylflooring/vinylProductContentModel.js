const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductContentSchema = new mongoose.Schema({
  title1: {
    type: String,
  },
  title2: {
    type: String,
  },
  content: {
    type: String,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "vinylproducts",
    required: true,
  },
});

const VinylProductContentModel = mongoose.model(
  "vinylproductcontents",
  VinylProductContentSchema
);

module.exports = VinylProductContentModel;
