const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ButtonSchema = new mongoose.Schema({
  technical_specification: {
    type: Array,
    required: true,
  },
  installation_maintenance: {
    type: String,
    required: true,
  },
  brochure: {
    type: Array,     
    required: true,
  },
  // category_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Vinyl Categories",
  //   required: true,
  // },
});

const ButtonModel = mongoose.model("Vinyl Buttons", ButtonSchema);

module.exports = ButtonModel;
