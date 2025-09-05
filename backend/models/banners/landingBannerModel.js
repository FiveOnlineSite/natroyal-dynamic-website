const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandingBannerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["", "image", "video"],
    default: "",
  },
  banner: {
    type: Schema.Types.Mixed,
    required: function () {
      return this.type === "image" || this.type === "video";
    },
  },
  alt: {
    type: String,
  },
  heading: {
    type: String,
    required: true,
  },
  heading_color: {
    type: String,
    default:"#ffffff"
  },
  page: {
    type: String,
    required: true,
  },
});

const LandingBannerModel = mongoose.model(
  "Landing Banners",
  LandingBannerSchema
);

module.exports = LandingBannerModel;
