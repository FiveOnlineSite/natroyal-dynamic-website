const mongoose = require("mongoose");

const SuitableSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  application: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vinylapplications", 
      required: true,
    },
   
});

const SuitableModel = mongoose.model("suitable", SuitableSchema);

module.exports = SuitableModel;
