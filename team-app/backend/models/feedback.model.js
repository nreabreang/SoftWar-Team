const mongoose = require('mongoose');
const Comments = require('./comment.model');
const schema = mongoose.Schema;

const feedbackSchema = new schema({
    virtualmoney:{
        type:String,
        require:false,
        unique:false,
        trim:false,
        minlenght:3,
    },
    comments:{
        type:Comments,
    }
});

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;