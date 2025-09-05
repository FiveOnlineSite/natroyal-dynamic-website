const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientsSchema = new mongoose.Schema({
  logo: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const ClientsModel = mongoose.model("Clients", ClientsSchema);

module.exports = ClientsModel;
