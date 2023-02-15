const router = require("express").Router();
//import creatorUsers from '../models/creatorUsers.model'
const creatorUsers = require("../models/creatorUsers.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "kfqbntpwvbuypbw4va.,/ffdlt0bw7uv8bsv./z/m,mzn;dgpvq[t]";

router.route("/").get(async (req, res) => {
    res.status;
});

router.route("/creatorReg").post(async (req, res) => {
    console.log("creator register")
    const { fname, lname, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldCreatorUsers = await creatorUsers.findOne({ email });
        if (typeof(oldCreatorUsers)!=='undefined' && oldCreatorUsers!==null) {
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

    console.log("login-creator");
    const { email, password } = req.body;
    //console.log('email=' + email + ' password=' + password);

    const creatorUser = await creatorUsers.findOne({ email });
    console.log('creatorUser=' + creatorUser);
    if (typeof(creatorUsers)==='undefined' || creatorUser==null) {
        return res.json({ status: "error", error: "Creator User Not Found" });
    }

    if (await bcrypt.compare(password, creatorUser.password)) {
        const token = jwt.sign({ email: creatorUser.email }, JWT_SECRET);
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
    } catch (error) { }
});

router.route("/creatorUserbyemail/:email").get(async(req,res)=>{
    creatorUsers.find({email:req.params.email})
    .then((resp)=>res.status(200).json(resp))
    .catch((err)=>res.status(400).json("Error: "+err))
})

module.exports = router;