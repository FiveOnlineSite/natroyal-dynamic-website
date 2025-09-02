const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetaDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
  },
  page: {
    type: String,
    required: true,
  },
});

const MetaDataModel = mongoose.model("Meta Data", MetaDataSchema);

module.exports = MetaDataModel;
