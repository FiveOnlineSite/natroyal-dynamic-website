const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new mongoose.Schema({
  yellow_title: {
    type: String,
  },
  black_title: {
    type: String,
  },
  subtitle: {
    type: String,
    required: true,
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
