const mongoose = require('mongoose');
const Comments = require('./comment.model');

const schema = mongoose.Schema;

const projectScheme = new schema({
    projectName:{
        type:String,
        require:true,
        trim:false,
        minlength:1,
    },
    description:{
        type:String,
        require:true,
        trim:false,
        minlength:1,
    },
},{
    timestamps:true,
});

const Project = mongoose.model('Project',projectScheme);

module.exports = Project;