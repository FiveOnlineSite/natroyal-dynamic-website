const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeatingProductsSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
    type: String,
  },
  content: {
    type: String,
  },
  product: [
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
      },
      sequence: {
        type: Number,
      },
      application_id: {
        type: mongoose.Types.ObjectId,
        ref: "Seating Application",
        required: true,
      },
    },
  ],
});

const SeatingProductsModel = mongoose.model(
  "Seating Products",
  SeatingProductsSchema
);

module.exports = SeatingProductsModel;
