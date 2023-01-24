const router = require('express').Router()
let Guest = require('../models/guest.model')

// /guest
router.route("/").get(async(req,resp)=>{
    Guest.find()
    .then((guest)=>resp.json(guest))
    .catch((err)=>resp.status(400).json("Error: " + err))
})