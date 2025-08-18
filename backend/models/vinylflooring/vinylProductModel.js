const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductSchema = new mongoose.Schema({
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
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      applications: [
        {
        type: mongoose.Types.ObjectId,
        ref: "vinylapplications",
        required: true,
        },
      ],
      
    },
  ],
});

const VinylProductModel = mongoose.model(
  "vinylproduct",
  VinylProductSchema
);

module.exports = VinylProductModel;
