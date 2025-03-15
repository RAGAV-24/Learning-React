// models/Profile.js
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  zipCode: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  profilePicture: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("profile", ProfileSchema);