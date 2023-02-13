const router = require("express").Router();
//import creatorUsers from '../models/creatorUsers.model'
const presenterUsers = require("../models/presenterUsers.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "kfqbntpwvbuypbw4va.,/ffdlt0bw7uv8bsv./z/m,mzn;dgpvq[t]";

router.route("/").get(async (req, res) => {
  res.status;
});

router.route("/creatorReg").post(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldCreatorUsers = await creatorUsers.findOne({ email });
    if (oldCreatorUsers) {
      return res.json({ error: "Creator Users Exists" });
    }
    await creatorUsers.create({
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

router.route("/login-creator").post(async (req, res) => {
  const { email, password } = req.body;

  const creatorUser = await creatorUsers.findOne({ email });
  if (!creatorUsers) {
    return res.json({ error: "Creator User Not Found" });
  }

  if (await bcrypt.compare(password, creatorUser.password)) {
    const token = jwt.sign({email:creatorUser.email}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

router.route("/creatorUserData").post(async (req, res) => {
  const { token } = req.body;
  try {
    const creatorUser = jwt.verify(token, JWT_SECRET);
    const creatorUserEmail = creatorUser.email;
    creatorUsers
      .findOne({ email: creatorUserEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

module.exports = router;