const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuitableSchema = new mongoose.Schema({
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
  link: {
    type: String,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Vinyl Categories",
    required: true,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "Vinyl Products",
    required: true,
  },
});

const SuitableModel = mongoose.model("Suitable", SuitableSchema);

module.exports = SuitableModel;
