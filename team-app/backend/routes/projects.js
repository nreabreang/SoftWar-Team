const router = require('express').Router();
let Projects = require('../models/project.model');

router.route().get((req,resp)=>{
    Projects.find()
    .then((Projects)=>resp.status(200).json(Projects))
    .catch((error)=>resp.status(400).json("Error: " + error))
})



