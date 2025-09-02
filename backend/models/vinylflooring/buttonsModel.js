const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
});

const ButtonSchema = new mongoose.Schema({
  technical_specification: {
    type: FileSchema,
    required: true,
  },
  installation_maintenance: {
    type: String,
    required: true,
  },
  brochure: {
    type: FileSchema,
    required: true,
  },
});

const ButtonModel = mongoose.model("Vinyl Buttons", ButtonSchema);

module.exports = ButtonModel;
