const router = require("express").Router();
let Activity = require("../models/activity.model");

router.route("/").get((req, res) => {
  // /activity/
  Activity.find() // mongoose command
    .then((Activity) => res.status(200).json(Activity))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  // /exercises/add
  const actName = req.body.actName;
  const actDescription = req.body.actDescription;
  const virtualMoney = req.body.virtualMoney;
  const date = Date.parse(req.body.date);

  const newActivity = new Activity({
    actName,
    actDescription,
    virtualMoney,
    date,
  });

  newActivity
    .save()
    .then(() => res.json("Activity added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// get data by id
router.route("/:id").get((req, res) => {
  Activity.findById(req.params.id)
    .then((Activity) => res.json(Activity))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete by id
router.route("/:id").delete((req, res) => {
  Activity.findByIdAndDelete(req.params.id)
    .then((Activity) => res.json("Activity deleted."))
    .catch((err) => res.status(400).json("Error : " + err));
});

//Update by id
router.route("/update/:id").post((req, res) => {
  Activity.findById(req.params.id)
    .then((activity) => {
      activity.actName = req.body.actName;
      activity.actDescription = req.body.actDescription;
      activity.virtualMoney = req.body.virtualMoney;
      activity.date = Date.parse(req.body.date);

      activity
        .save()
        .then(() => res.json("Activity updated!"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
