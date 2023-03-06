const router = require("express").Router();
let Feedback = require("../models/feedback.model");

//It must be change path, Now I write for a simple form.
// https://localhost:5000/feedback/id/add
// router.route("/:id/add").post(async(req,res)=>{
//     const virtualMoney = req.body.virtualmoney
//     const virtualMoneyOld = Feedback.findById(req.params.id)
//     const commentAdd = req.body.comments
//     console.log("Virtualmoney from add: "+virtualMoney)
//     console.log("Virtualmoney from old: "+virtualMoneyOld)
// //    const commentFeedback = req.body.comments
//     Feedback.find
//     if(virtualMoney >= 0){  //if it same value,it will not change data.
//         const newVirtualMoney = virtualMoney + virtualMoneyOld;
//         console.log(newVirtualMoney)
//         Feedback.findByIdAndUpdate(req.params.id,newVirtualMoney);
//     }else{
//         resp.status(400).json("Invalid!")
//     }
//     if(commentAdd.i_like&&commentAdd.i_wish&&commentAdd.question&&commentAdd.ideas){

//     }else{

//     }
// });

// http://localhost:5000/feedback/
router.route("/").get((req, res) => {
  Feedback.find() // mongoose command
    .then((Feedback) => res.status(200).json(Feedback))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/feedback/add
router.route("/add").post((req, res) => {
  // /activity/add
  const virtualMoney = req.body.virtualMoney;
  const comments = req.body.comments;
  const idProject = req.body.idProject;

  const newFeedback = new Feedback({
    virtualMoney,
    comments,
    idProject,
  });

  newFeedback
    .save()
    .then(() => res.json("Feedback added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// http://localhost:5000/feedback/:id get by id
router.route("/:id").get(async (req, res) => {
  Feedback.findById(req.params.id)
    .then((feedback) => res.status(200).json(feedback))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/feedback/:id up to database
router.route("/:id").post(async (req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Delete is successfull."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:5000/feedback/:id update to database
router.route("/update/:id").post(async (req, res) => {
  Feedback.findByIdAndUpdate(
    req.params.id,
    res.body.virtualMoney,
    res.body.comments
  )
    .then(() => res.status(200).json("Update success"))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/project/:idProject").get(async (req, res) => {
  Feedback.find({ idProject: req.params.idProject })
    .then((respond) => res.status(200).json(respond))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
