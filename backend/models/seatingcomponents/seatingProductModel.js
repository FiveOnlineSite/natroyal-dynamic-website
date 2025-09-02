const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingProductsSchema = new mongoose.Schema({
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
  sequence: {
    type: Number,
  },
  application: {
    type: mongoose.Types.ObjectId,
    ref: "seatingapplications",
    required: true,
  },
});

const SeatingProductsModel = mongoose.model(
  "seatingproducts",
  SeatingProductsSchema
);

module.exports = SeatingProductsModel;
