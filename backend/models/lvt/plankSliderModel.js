const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlankSliderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
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
  qr: {
    type: Array,
    required: true,
  },
  qr_alt: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Plank Category",
    required: true,
  },
});

const PlankSliderModel = mongoose.model("Plank Slider", PlankSliderSchema);

module.exports = PlankSliderModel;
