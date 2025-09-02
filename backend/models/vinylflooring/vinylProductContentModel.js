const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductContentSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
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
