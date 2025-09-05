const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KnitAboutSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true,
  },
  // image1: {
  //   type: Array,
  //   required: true,
  // },
  // image2: {
  //   type: Array,
  //   required: true,
  // }
});

const KnitAboutModel = mongoose.model("Knit About", KnitAboutSchema);

module.exports = KnitAboutModel;
