const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    page: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
