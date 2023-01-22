const router = require('express').Router()
let Guest = require('../models/guest.model')

router.route("/").get(async(req,resp)=>{
    Guest.find()
    .then((guest)=>resp.json(guest))
    .catch((err)=>resp.status(400).json("Error: " + err))
});

router.route("/:id").get(async(req,resp)=>{
    Guest.find(req.params.id)
    .then((guest)=>resp.status(200).json(guest))
    .catch((error)=>resp.status(400).json("Error: " + error))
});

router.route("/add").post((req,resp)=>{
    const guestname = req.body.username
    const newGuest = new Guest({
        guestname,
    })
    newGuest.save()
    .then(()=>resp.status(200).json("Guest add successed."))
    .catch((err)=>resp.status(400).json("Error: " + err))
});

router.route("/delete").delete(async(req,resp)=>{
    Guest.remove()
    .then(()=>resp.status(200).json("Remove all successes."))
    .catch((error)=>resp.status(400).json("Error: " + error))
});

router.route("/delete/:id").delete(async(req,resp)=>{
    Guest.remove(req.params.id)
    .then(()=>resp.status(200).json("Delete successe."))
    .catch((err)=>resp.status(400).json("Error: " + err))
});


module.exports = router;