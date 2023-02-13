const mongoose = require("mongoose");

const CreatorUsersSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  { collection: "creatorUsers", timestamps: true }
);

const creatorUsers = mongoose.model("creatorUsers", CreatorUsersSchema);
module.exports = creatorUsers;
