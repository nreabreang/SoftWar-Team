const router = require('express').Router();
let Feedback = require('../models/feedback.model');

router.route("/").get(async(req,resp)=>{
    Feedback.find()
    .then((file)=>resp.json(file))
    .catch((err)=>resp.status(404).json("Error: " + err))
})

module.exports = router;

