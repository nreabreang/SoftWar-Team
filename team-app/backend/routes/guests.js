const router = require('express').Router()
let Guest = require('../models/guest.model')

// /guest
router.route("/").get(async(req,resp)=>{
    Guest.find()
    .then((guest)=>resp.json(guest))
    .catch((err)=>resp.status(400).json("Error: " + err))
});

router.route("/add").post(async(req,resp)=>{
    const guestName = req.body.guestName
    const newGuest = new Guest({guestName})

    newGuest.save()
    .then(()=>resp.status(200).json("Guest add successe."))
    .catch((err)=>resp.status(400).json("Error: "+err))
});

router.route("/:id/delete").delete(async(req,resp)=>{
    Guest.findByIdAndDelete(req.params.id)
    .then(()=>resp.status(200).json("Guest is deleted successeful."))
    .catch((err)=>resp.status(400).json("Error: " + err))
});

module.exports = router;