const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new mongoose.Schema({
  subtitle: {
    type: String,
    required: true,
  },
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
  },
  event: [
    {
      youtube_url: {
        type: String,
        required: true,
      },
      youtube_thumbnail: {
        type: Array,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },
  ],
});

const EventsModel = mongoose.model("Events", EventsSchema);

module.exports = EventsModel;
