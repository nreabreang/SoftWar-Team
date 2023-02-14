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
    const virtualMoney = req.body.virtualMoney;
    const newGuest = new Guest({
        username,
        virtualMoney,
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

router.route("/add/virtual").post(async(req,res)=>{
    Guest.findOneAndUpdate({username:req.body.username,virtualMoney:req.body.virtualMoney})
    .then(()=>res.status(200).json("Update!"))
    .catch((err)=>res.status(400).json("Error: "+err))
})

router.route("/getName/:username").get(async(req,res)=>{
    Guest.find({username:req.params.username})
    .then((resp)=>res.status(200).json(resp))
    .catch((err)=>res.status(400).json("Error: "+err))
})

module.exports = router;