const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  invitecode: {
    type: String,
    trim: true,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", user);
