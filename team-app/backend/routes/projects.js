const router = require('express').Router();
let Projects = require('../models/project.model');

router.route("/").get((req,res)=>{
    Projects.find()
    .then((Projects)=>res.status(200).json(Projects))
    .catch((error)=>res.status(400).json("Error: " + error))
});

router.route("/add").get((req,res)=>{
    const projName = req.body.projectname;
    const descript = req.body.description;
    const timing = Date.parse(req.body.date);

    const newProject = new Projects({
        projName,
        descript,
        timing,
    });

    newProject
    .save()
    .then(()=>res.json("Add Project is successed."))
    .catch((error)=>res.status(400).json("Error: " + error))
});

router.route("/:nameproject").get((req,res)=>{
    Projects.find(req.params.nameproject)
    .then((Proj)=>res.status(200).json(Proj))
    .catch((error)=>res.status(400).json("Error: " + error))
});

router.route("/update/:nameproject").post((req,res)=>{
    Projects.find(req.params.nameproject)
    .then((Project)=>{
        Project.projectname = req.body.projectname
        Project.description = req.body.description
        Project.date = Date.parse(req.body.date)

        Project.save()
        .then(()=>res.status(200).json("Projecy is update"))
        .catch((err)=>res.status(400).json("Error: " + err))
    })
    .catch((error)=>resp.status(400).json("Error: " + error))
});

module.exports = router;
