const router = require('express').Router()
let Guest = require('../models/guest.model')

// /guest
router.route("/").get(async(req,res)=>{
    Guest.find()
    .then((guest)=>res.json(guest))
    .catch((err)=>res.status(400).json("Error: " + err))
});

router.route("/add").post(async(req,res)=>{
    const guestName = req.body.guestName
    const newGuest = new Guest({guestName})

    newGuest.save()
    .then(()=>res.status(200).json("Guest add successe."))
    .catch((err)=>res.status(400).json("Error: "+err))
});

router.route("/:id/delete").delete(async(req,res)=>{
    Guest.findByIdAndDelete(req.params.id)
    .then(()=>res.status(200).json("Guest is deleted successeful."))
    .catch((err)=>res.status(400).json("Error: " + err))
});

module.exports = router;