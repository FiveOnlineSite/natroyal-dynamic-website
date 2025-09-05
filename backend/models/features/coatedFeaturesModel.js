const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoatedFeaturesSchema = new mongoose.Schema({
  icon: {
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
});

const CoatedFeaturesModel = mongoose.model(
  "Coated Features",
  CoatedFeaturesSchema
);

module.exports = CoatedFeaturesModel;
