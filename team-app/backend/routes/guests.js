const router = require('express').Router()
let Guest = require('../models/guest.model')

// http://localhost:5000/guest/
router.route("/").get(async(req,res)=>{
    Guest.find()
    .then((guest)=>res.json(guest))
    .catch((err)=>res.status(400).json("Error: " + err))
});

// http://localhost:5000/guest/add
router.route("/add").post(async(req,res)=>{
    const username = req.body.username;
    const newGuest = new Guest({
        username,
    });

    newGuest.save()
    .then(()=>res.status(200).json("Guest added."))
    .catch((err)=>res.status(400).json("Error: "+err))
});

// http://localhost:5000/guest/
router.route("/delete/:id").delete(async(req,res)=>{
    Guest.findByIdAndDelete(req.params.id)
    .then(()=>res.status(200).json("Guest is deleted successful."))
    .catch((err)=>res.status(400).json("Error: " + err))
});

module.exports = router;