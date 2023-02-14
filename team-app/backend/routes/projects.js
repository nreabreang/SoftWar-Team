const router = require("express").Router();
let Projects = require("../models/project.model");
// let bodyParser = require('body-parser');
let express = require("express");
router.route(express.json({ limit: "50mb" }));
router.route(express.urlencoded({ limit: "50mb" }));

// http://localhost:5000/project/
router.route("/").get((req, res) => {
  Projects.find()
    .then((Projects) => res.status(200).json(Projects))
    .catch((error) => res.status(400).json("Error: " + error));
});

// http://localhost:5000/project/add
router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const description = req.body.description;
  const idActivity = req.body.idActivity;

  const newProject = new Projects({
    projectName,
    description,
    idActivity,
  });

  newProject
    .save()
    .then(() => res.json("Add Project is successfully."))
    .catch((error) => res.status(400).json("Error: " + error));
});

// http://localhost:5000/project/:id
router.route("/:id").get((req, res) => {
  Projects.findById(req.params.id)
    .then((Proj) => res.status(200).json(Proj))
    .catch((error) => res.status(400).json("Error: " + error));
});

// http://localhost:5000/project/update/:id
router.route("/update/:id").post((req, res) => {
  Projects.findById(req.params.id)
    .then((Project) => {
      Project.projectName = req.body.projectName;
      Project.description = req.body.description;

      Project.save()
        .then(() => res.status(200).json("Project is updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/delete/:id").delete((req, res) => {
  Projects.findByIdAndDelete(req.params.id)
    .then(() => console.log("Delete successfully."))
    .catch((err) => console.log("Error: " + err));
});

// http://localhost:5000/project/activity/:id
router.route("/activity/:id").get(async (req, res) => {
  Projects.find({ idActivity: req.params.id })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => console.log("Error: " + err));
});

module.exports = router;
