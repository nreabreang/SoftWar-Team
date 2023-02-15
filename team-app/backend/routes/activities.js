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
  const date = Date.parse(req.body.date);

  const newActivity = new Activity({
    actName,
    actDescription,
    virtualMoney,
    unitMoney,
    email,
    date,
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
      activity.date = Date.parse(req.body.date);

      activity
        .save()
        .then(() => res.json("Activity updated!"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});
// http://localhost:5000/activity/getbyemail/:email
router.route("/getbyemail/:email").get(async (req, res) => {
  Activity.find({ email: req.params.email })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/").get(async (req, res) => {
  Activity.find({ actName: req.body.actName })
    .then((res) => res.status(200).json(res))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
