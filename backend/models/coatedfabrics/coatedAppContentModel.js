const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoatedAppContentScheme = new mongoose.Schema({
  title1: {
    type: String,
  },
  title2: {
    type: String,
  },
  content: {
    type: String,
  },
  application: {
    type: mongoose.Types.ObjectId,
    ref: "coatedapplications",
    required: true,
  },
});

const CoatedAppContentModel = mongoose.model(
  "coatedappcontents",
  CoatedAppContentScheme
);

module.exports = CoatedAppContentModel;
