const router = require('express').Router();
let Projects = require('../models/project.model');
let Commenty = require('../models/comment.model');

router.route("/").get((req,resp)=>{
    Projects.find()
    .then((Projects)=>resp.status(200).json(Projects))
    .catch((error)=>resp.status(400).json("Error: " + error))
})

router.route("/add").get((req,resp)=>{
    const projName = req.body.projectname;
    const descript = req.body.description;
    const comment = new Commenty({

    });
    const timing = Date.parse(req.body.date);

    const newProject = new Projects({
        projName,
        descript,
        comment,
        timing,
    });

    newProject
    .save()
    .then(()=>resp.json("Add Project is successed."))
    .catch((error)=>res.status(400).json("Error: " + error))
})

router.route("/:nameproject").get((req,resp)=>{
    Projects.find(req.params.nameproject)
    .then((Proj)=>resp.status(200).json(Proj))
    .catch((error)=>resp.status(400).json("Error: " + error))
})

router.route("/update/:nameproject").post((req,resp)=>{
    Projects.find(req.params.nameproject)
    .then((Project)=>{
        Project.projectname = req.body.projectname
        Project.description = req.body.description
        Project.date = Date.parse(req.body.date)
        Project.comment = req.body.comment

        Project.save()
        .then(()=>resp.status(200).json("Projecy is update"))
        .catch((err)=>resp.status(400).json("Error: " + err))
    })
    .catch((error)=>resp.status(400).json("Error: " + error))
})

