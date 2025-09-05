const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VinylProductSchema = new mongoose.Schema({
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
    unique: true,
  },
  // link: {
  //   type: String,
  //   required: true,
  // },
  applications: [
    {
      type: mongoose.Types.ObjectId,
      ref: "vinylapplications",
      required: true,
    },
  ],
});

const VinylProductModel = mongoose.model("vinylproducts", VinylProductSchema);

module.exports = VinylProductModel;
