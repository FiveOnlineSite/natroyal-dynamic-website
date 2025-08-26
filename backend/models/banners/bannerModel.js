const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new mongoose.Schema({
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
  page: {
    type: String,
    required: true,
  },
});

const BannerModel = mongoose.model("Banner", BannerSchema);

module.exports = BannerModel;
