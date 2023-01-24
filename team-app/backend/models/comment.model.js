const mongoose = require('mongoose')

const schema = mongoose.Schema;

const commentSchema = new schema({
    iLike:{
        type:String,
        require:false,
        unique:false,
        trim:false,
    },
    iWish:{
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