const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlankCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const PlankCategoryModel = mongoose.model(
  "Plank Category",
  PlankCategorySchema
);

module.exports = PlankCategoryModel;
