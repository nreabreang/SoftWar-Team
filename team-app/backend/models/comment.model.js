const mongoose = require('mongoose')

const schema = mongoose.Schema;

const commentSchema = new schema({
    i_like:{
        type:String,
        require:false,
        unique:false,
        trim:false,
    },
    i_wish:{
        type:String,
        require:false,
        unique:false,
        trim:false,
    },
    question:{
        type:String,
        require:false,
        unique:false,
        trim:false,
    },
    ideas:{
        type:String,
        require:false,
        unique:false,
        trim:false,
    }

})

const Comments = mongoose.model('Comments',commentSchema);

module.exports = Comments;