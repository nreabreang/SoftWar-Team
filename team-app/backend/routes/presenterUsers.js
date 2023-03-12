const router = require("express").Router();
//import presenterUsers from '../models/presenterUsers.model'
const presenterUsers = require("../models/presenterUsers.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kfqbntpwvbuypbw4va.,/ffdlt0bw7uv8bsv./z/m,mzn;dgpvq[t]";

router.route("/").get(async (req, res) => {
  res.status;
});

router.route("/presenterReg").post(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldPresenterUsers = await presenterUsers.findOne({ email });
    if (oldPresenterUsers) {
      return res.json({ error: "Presenter Users Exists" });
    }
    await presenterUsers.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

router.route("/login-presenter").post(async (req, res) => {
  const { email, password } = req.body;

  const presenterUser = await presenterUsers.findOne({ email });
  if (!presenterUser) {
    return res.json({ error: "Presenter User Not Found" });
  }

  if (await bcrypt.compare(password, presenterUser.password)) {
    const token = jwt.sign({email:presenterUser.email}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token , firstn:presenterUser.fname, lastn:presenterUser.lname,email:presenterUser.email});
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

router.route("/presenterUserData").post(async (req, res) => {
  const { token } = req.body;
  try {
    const presenterUser = jwt.verify(token, JWT_SECRET);
    const presenterUserEmail = presenterUser.email;
    presenterUsers
      .findOne({ email: presenterUserEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

module.exports = router;
