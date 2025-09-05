const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrochureSchema = new mongoose.Schema(
  {
    brochure: {
      type: Array,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BrochureModel = mongoose.model("Brochure", BrochureSchema);

module.exports = BrochureModel;
