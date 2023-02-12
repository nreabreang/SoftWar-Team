const mongoose = require("mongoose");

const PresenterUsersSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    password: String,
  },
  { collection: "presenterUsers" }
);

const presenterUsers = mongoose.model("presenterUsers", PresenterUsersSchema);
module.exports = presenterUsers;
