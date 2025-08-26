const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoatedApplicationSchema = new mongoose.Schema({
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
});

const CoatedApplicationModel = mongoose.model(
  "coatedapplications",
  CoatedApplicationSchema
);

module.exports = CoatedApplicationModel;
