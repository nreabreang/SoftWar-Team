const router = require('express').Router(); //create route
let User = require('../models/user.model'); // call mongoose models

const SECRET = ""

// first route & handle HTTP Get & Get request
router.route("/").get(async(req, res) => {
  // "/users/"
  User.find()
    .then((users) => res.status(200).json(users))
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
  if(findUsernameInTable || findPasswordInTable || findEmailInTable){
    resp.status(400).json("Cannot be used.")
  }else{
    const newUser = new User({
    username,
    password,
    email,
  })

  newUser
  .save()
  .then(()=>resp.json("Register is successed."))
  .catch((err)=>{
    resp.status("400").json("Error: " + err)
  })
  }
});

router.route("/log-in").get(async (req,resp)=>{
  const usernameLogIn = req.body.username
  const passwordLogIn = req.body.password

  const findUsername = User.find(usernameLogIn)
  const findPassword = User.find(passwordLogIn)
  //check matching in table
  if(findUsername || findPassword){
      resp.json("Login is successed.")
  }
});

router.route("/google-sign-in").post((req,resp)=>{
   // Get the Google profile data (basic)
    //var profile = googleUser.getBasicProfile();
    
    // Retrieve the Google account data
    gapi.client.load('oauth2', 'v2', function () {
      var request = gapi.client.oauth2.userinfo.get({
          'userId': 'me'
      });
      request.execute(function (resp) {
          // Display the user details
          var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
          profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
          document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
          
          document.getElementById("gSignIn").style.display = "none";
          document.getElementsByClassName("userContent")[0].style.display = "block";
          
          // Save user data
          saveUserData(resp);
      });
    });
});

module.exports = router;
