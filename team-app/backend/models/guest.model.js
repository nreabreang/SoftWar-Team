const mongoose = require('mongoose');
const schema = mongoose.Schema;

const guestSchema = new schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:false,
        minlength:1,
    },
    virtualMoney:{
        type:String,
    }
},{
    timestamps:true
});

const Guest = mongoose.model("Guest",guestSchema)

module.exports = Guest