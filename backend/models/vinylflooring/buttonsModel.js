const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD
const FileSchema = new Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
});

const ButtonSchema = new mongoose.Schema({
  technical_specification: {
   type: FileSchema,
=======
const ButtonSchema = new mongoose.Schema({
  technical_specification: {
    type: Array,
>>>>>>> 675aa5d28d69229c64ae4cf3c6d451333337b16e
    required: true,
  },
  installation_maintenance: {
    type: String,
    required: true,
  },
  brochure: {
<<<<<<< HEAD
    type: FileSchema,  
    required: true,
  },
=======
    type: Array,     
    required: true,
  },
  // category_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Vinyl Categories",
  //   required: true,
  // },
>>>>>>> 675aa5d28d69229c64ae4cf3c6d451333337b16e
});

const ButtonModel = mongoose.model("Vinyl Buttons", ButtonSchema);

module.exports = ButtonModel;
