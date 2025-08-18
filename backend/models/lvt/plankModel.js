const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlankSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
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
