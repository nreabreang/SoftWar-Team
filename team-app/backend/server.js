const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: false }); // if use newCreateIndex code will cannot complier because mongoose no longer supported it

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// require file and use the file
const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

// use file and add path
app.use("/exercises", exercisesRouter); // go to exercises.js file /exercises
app.use("/users", userRouter); //go to users.js file /users

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



