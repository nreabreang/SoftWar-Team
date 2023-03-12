const router = require("express").Router();
let Activity = require("../models/activity.model");

// http://localhost:5000/activity/
router.route("/").get((req, res) => {
  // /activity/
  Activity.find() // mongoose command
    .then((Activity) => res.status(200).json(Activity))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/activity/add
router.route("/add").post((req, res) => {
  // /activity/add
  const actName = req.body.actName;
  const actDescription = req.body.actDescription;
  const virtualMoney = req.body.virtualMoney;
  const unitMoney = req.body.unitMoney;
  const email = req.body.email;
  const code = req.body.code;
  const startTime = Date.parse(req.body.startTime);
  const endTime = Date.parse(req.body.endTime);

  const newActivity = new Activity({
    actName,
    actDescription,
    virtualMoney,
    unitMoney,
    code,
    email,
    startTime,
    endTime,
  });

  newActivity
    .save()
    .then(() => res.json("Activity added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// get data by id
// http://localhost:5000/activity/:id
router.route("/:id").get((req, res) => {
  Activity.findById(req.params.id)
    .then((Activity) => res.json(Activity))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete by id
// http://localhost:5000/activity/:id
router.route("/:id").delete((req, res) => {
  Activity.findByIdAndDelete(req.params.id)
    .then((Activity) => res.json("Activity deleted."))
    .catch((err) => res.status(400).json("Error : " + err));
});

//Update by id
// http://localhost:5000/activity/update/:id
router.route("/update/:id").post((req, res) => {
  Activity.findById(req.params.id)
    .then((activity) => {
      activity.actName = req.body.actName;
      activity.actDescription = req.body.actDescription;
      activity.virtualMoney = req.body.virtualMoney;
      activity.unitMoney = req.body.unitMoney;
      activity.startTime = Date.parse(req.body.startTime);
      activity.endTime = Date.parse(req.body.endTime)

      activity
        .save()
        .then(() => res.json("Activity updated!"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});
// http://localhost:5000/activity/getbyemail/:email
router.route("/getbyemail/:email").get(async (req, res) => {
  // console.log(req.params.email);
  Activity.find({ email: req.params.email })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/activity/name/:id
router.route("/name/:nameProject").get(async (req, res) => {
  // console.log(req.params.nameProject)
  Activity.find({ code: req.params.nameProject })
  .then((resp) => res.status(200).json(resp))
  .catch((err) => res.status(401).json("Error: " + err))
});

module.exports = router;
