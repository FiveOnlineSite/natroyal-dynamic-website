const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingAppContentSchema = new mongoose.Schema({
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
    ref: "seatingapplications",
    required: true,
  },
});

const SeatingAppContentModel = mongoose.model(
  "seatingappcontent",
  SeatingAppContentSchema
);

module.exports = SeatingAppContentModel;
