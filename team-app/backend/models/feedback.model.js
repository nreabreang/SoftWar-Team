const mongoose = require('mongoose');
const Comments = require('./comment.model');
const schema = mongoose.Schema;

const feedbackSchema = new schema({
    virtualmoney:{
        type:String,
        require:false,
        unique:false,
        trim:false,
        minlength:3,
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId, ref:'Comments'
    },
    
});

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;