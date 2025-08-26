const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeBannerSchema = new mongoose.Schema({
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
    default: "#ffffff"
  },
  button: {
    type: String,
  },
  button_url: {
    type: String,
  },
});

const HomeBannerModel = mongoose.model("Home Banner", HomeBannerSchema);

module.exports = HomeBannerModel;
