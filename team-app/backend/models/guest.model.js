const mongoose = require('mongoose');
const schema = mongoose.Schema;

const guestSchema = new schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:false,
        minlength:5
    },
},{
    timestamps:true
});

const Guest = mongoose.model("Guest",guestSchema)

module.exports = Guest