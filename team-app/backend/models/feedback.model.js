const mongoose = require("mongoose");
const schema = mongoose.Schema;

const feedbackSchema = new schema(
  {
    virtualMoney: {
      type: String,
      require: false,
      unique: false,
      trim: false,
      // minlength: 3,
    },
    comments: {
      iLike: {
        type: String,
      },
      iWish: {
        type: String,
      },
      iQuest: {
        type: String,
      },
      iDea: {
        type: String,
      },
      // type:String,
      // require:false,
      // trim:false,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Comments",
    },
    idProject: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
