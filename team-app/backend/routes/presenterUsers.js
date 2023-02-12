const router = require("express").Router();
const presenterUsers = require("../models/presenterUsers.model");

router.route("/").get(async (req, res) => {
    res.status;
});

router.route("/presenterReg").post(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    await presenterUsers.create({
      fname,
      lname,
      email,
      password,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

module.exports = router;
