const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// http://localhost:5000/exercises/ get all
router.route("/").get((req, res) => {
  // /exercises/
  Exercise.find() // mongoose command
    .then((exercises) => res.status(200).json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/exercises/add up to database
router.route("/add").post((req, res) => {
  // /exercises/add
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// http://localhost:5000/exercises/:id get by id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete by id
// http://localhost:5000/exercises/:id 
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((exercises) => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error : " + err));
});

//Update by id
// http://localhost:5000/exercises/update/:id
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercises) => {
      exercises.username = req.body.username;
      exercises.description = req.body.description;
      exercises.duration = Number(req.body.duration);
      exercises.date = Date.parse(req.body.date);

      exercises
        .save()
        .then(() => res.json("Exercises updated!"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
