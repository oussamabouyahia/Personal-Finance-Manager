const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: [String],
    default: ["user"],
  },
  profilePicture: {
    type: String,
  },
});
const User = mongoose.model("User", schema);
module.exports = User;
