const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoatedAppContentScheme = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
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
