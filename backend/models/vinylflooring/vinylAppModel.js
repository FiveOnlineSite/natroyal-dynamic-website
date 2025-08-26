const mongoose = require("mongoose");

const VinylApplicationSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  icon: {
    type: Array,
    required: true,
  },
  icon_alt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
     unique: true,
  },
  content: {  
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vinylproducts",
    },
  ],
});


const VinylApplication = mongoose.model(
  "vinylapplications",
  VinylApplicationSchema
);

module.exports = VinylApplication;
