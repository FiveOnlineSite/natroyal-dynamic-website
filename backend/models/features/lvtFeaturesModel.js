const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LvtFeaturesSchema = new mongoose.Schema({
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
const LvtFeaturesModel = mongoose.model("Lvt Features", LvtFeaturesSchema);

module.exports = LvtFeaturesModel;
