const router = require('express').Router();
let Feedback = require('../models/feedback.model');

router.route("/").get(async(req,resp)=>{
    Feedback.find()
})

