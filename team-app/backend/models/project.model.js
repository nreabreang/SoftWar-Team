const mongoose = require('mongoose');
const Comments = require('./comment.model');

const schema = mongoose.Schema;

const projectScheme = new schema({
    projectname:{
        type:String,
        require:true,
        unique:true,
        trim:false,
        minlength:3,
    },
    describtion:{
        type:String,
        require:true,
        unique:false,
        trim:false,
        minlength:5,
    },
},{
    timestamps:true,
});

const Project = mongoose.model('Project',projectScheme);

module.exports = Project;