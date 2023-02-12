const mongoose = require("mongoose");

const PresenterUsersSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  { collection: "presenterUsers", timestamps: true }
);

const presenterUsers = mongoose.model("presenterUsers", PresenterUsersSchema);
module.exports = presenterUsers;
