const router = require('express').Router();
let Feedback = require('../models/feedback.model');

//It must be change path, Now I write for a simple form.
// https://localhost:5000/feedback/id/add
router.route("/:id/add").post(async(req,resp)=>{
    const virtualMoney = req.body.virtualmoney
    const virtualMoneyOld = Feedback.findById(req.params.id)
    const commentAdd = req.body.comments
    console.log("Virtualmoney from add: "+virtualMoney)
    console.log("Virtualmoney from old: "+virtualMoneyOld)
//    const commentFeedback = req.body.comments
    Feedback.find
    if(virtualMoney >= 0){  //if it same value,it will not change data. 
        const newVirtualMoney = virtualMoney + virtualMoneyOld;
        console.log(newVirtualMoney)
        Feedback.findByIdAndUpdate(req.params.id,newVirtualMoney);
    }else{
        resp.status(400).json("Invalid!")
    }
    if(commentAdd.i_like&&commentAdd.i_wish&&commentAdd.question&&commentAdd.ideas){

    }else{
        
    }
});


module.exports = router;

