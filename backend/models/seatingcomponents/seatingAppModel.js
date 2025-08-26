const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingApplicationSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
    type: String,
  },
  application: [
    {
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
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

const SeatingApplicationModel = mongoose.model(
  "Seating Application",
  SeatingApplicationSchema
);

module.exports = SeatingApplicationModel;
