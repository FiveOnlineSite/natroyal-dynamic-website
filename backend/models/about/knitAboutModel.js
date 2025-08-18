const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KnitAboutSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
  },
});

const KnitAboutModel = mongoose.model("Knit About", KnitAboutSchema);

module.exports = KnitAboutModel;
