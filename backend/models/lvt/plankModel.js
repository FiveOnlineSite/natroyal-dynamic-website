const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlankSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
  },
  subtitle: {
    type: String,
    required: true,
  },
  brochure: {
    type: Array,
    required: true,
  },
});

const PlankModel = mongoose.model("Plank", PlankSchema);

module.exports = PlankModel;
