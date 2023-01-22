const router = require('express').Router()
let Guest = require('../models/guest.model')

// /guest
router.route("/").get(async(req,resp)=>{
    Guest.find()
    .then((guest)=>resp.json(guest))
    .catch((err)=>resp.status(400).json("Error: " + err))
})

// /guest/add
router.route("/add").post((req, res) => {
    // /activity/add
    const guestName = req.body.guestName;
    
    const newGuest = new Guest({
      guestName,
    });

    newGuest
    .save()
    .then(() => res.status(200).json("Guest added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});