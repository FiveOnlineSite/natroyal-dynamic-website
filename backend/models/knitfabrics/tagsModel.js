const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  textile: {
    type: mongoose.Types.ObjectId,
    ref: "textiles",
    required: true,
  },
});

const TagsModel = mongoose.model("tags", TagsSchema);

module.exports = TagsModel;
