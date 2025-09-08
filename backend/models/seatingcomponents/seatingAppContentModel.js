const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingAppContentSchema = new mongoose.Schema({
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
    ref: "seatingapplications",
    required: true,
  },
});

const SeatingAppContentModel = mongoose.model(
  "seatingappcontent",
  SeatingAppContentSchema
);

module.exports = SeatingAppContentModel;
