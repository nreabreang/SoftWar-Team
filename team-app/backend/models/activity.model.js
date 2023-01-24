const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    actName: {
      type: String,
      required: true,
    },
    actDescription: {
      type: String,
      required: true,
    },
    virtualMoney: {
      type: Number,
      required: true,
      minlength: 3,
    },
    unitMoney: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
