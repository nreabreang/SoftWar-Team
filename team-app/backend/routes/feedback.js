const router = require('express').Router();
let Feedback = require('../models/feedback.model');

//It must be change path, Now I write for a simple form.
// https://localhost:5000/feedback/id/add
router.route("/:id/add").post(async(req,resp)=>{
    const virtualMoney = req.body.virtualmoney
    const commentFeedback = req.body.comments
    const getVirtualMoney = Feedback.find(req.params.id).virtualmoney  //It find by id or Project name to get value
    const getComments = Feedback.find(req.params.id).comments
    if(virtualMoney == getVirtualMoney){  //if it same value,it will not change data. 

    }else{

    }

    if(commentFeedback == getComments){

    }else{

    }
});


module.exports = router;

