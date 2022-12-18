const router = require('express').Router(); //create route
let User = require('../models/user.model'); // call mongoose models

// first route & handle HTTP Get & Get request
router.route("/").get((req, res) => {
  // "/users/"
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  // /users/add
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save() //already save
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
