const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingApplicationSchema = new mongoose.Schema({
  image: {
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
  content: {
    type: String,
    required: true,
  },
});

const SeatingApplicationModel = mongoose.model(
  "seatingapplications",
  SeatingApplicationSchema
);

module.exports = SeatingApplicationModel;
