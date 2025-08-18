const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const AuthModel = mongoose.model("Authentication", AuthSchema);

module.exports = AuthModel;
