const mongoose = require('mongoose');

const schema = mongoose.Schema;

const projectScheme = new schema({
    projectName:{
        type:String,
        require:true,
        unique:false,
        trim:false,
        minlength:1,
    },
    description:{
        type:String,
        require:true,
        unique:false,
        trim:false,
        minlength:1,
    },
    idActivity:{
        type:String
    },
    members:[{
        name:String,
        email:String,
    }]
},{
    timestamps:true,
});

const Project = mongoose.model('Project',projectScheme);

module.exports = Project;