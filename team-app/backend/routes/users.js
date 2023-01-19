const router = require('express').Router(); //create route
let User = require('../models/user.model'); // call mongoose models

const SECRET = ""

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

router.route("/register").post((req,resp)=>{
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  const findUsernameInTable = User.find(username)
  const findPasswordInTable = User.find(password)
  const findEmailInTable = User.find(email)
  //check matching in tables
  if(findUsernameInTable == null || findPasswordInTable == null || findEmailInTable == null){
    resp.status(400).json("")
  }else{
    const newUser = new User({
    username,
    password,
    email,
  })

  newUser
  .save()
  .then(()=>resp.json("Register is successed.")).catch((err)=>{
    resp.status("400").json("Error: " + err)
  })
  }
});

router.route("/log-in").get((req,resp)=>{
  const usernameLogIn = req.body.username
  const passwordLogIn = req.body.password
  //check matching in table
  if(true){

  }
});

module.exports = router;
