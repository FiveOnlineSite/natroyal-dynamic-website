const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  brochure: {
    type: Array,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const OfferModel = mongoose.model("What We Offer", OfferSchema);

module.exports = OfferModel;
