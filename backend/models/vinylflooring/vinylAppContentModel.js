const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylAppContentSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
  },
  content: {
    type: String,
  },
  application: {
    type: mongoose.Types.ObjectId,
    ref: "vinylapplications",
    required: true,
  },
});

const VinylAppContentModel = mongoose.model(
  "vinylappcontents",
  VinylAppContentSchema
);

module.exports = VinylAppContentModel;
