const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", false); // or true to suppress warning
require("dotenv").config();



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const start = async () => {
  const uri = process.env.ATLAS_URI;

  console.log("mongodb url = " + uri);
  console.log("before connect db");

  // if use newCreateIndex code will cannot complier because mongoose no longer supported it
  await mongoose
    .connect(uri, { useNewUrlParser: false })
    //mongoose.connect(uri)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));

  console.log("after connect db");

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });

  // require file and use the file
  const activityRouter = require("./routes/activities");
  const exercisesRouter = require("./routes/exercises");
  const userRouter = require("./routes/users");
  const projectRouter = require("./routes/projects");
  const guestRouter = require("./routes/guests");
  const feedbackRouter = require("./routes/feedback");
  const presenterUsersRouter = require("./routes/presenterUsers");
  const creatorUsersRouter = require("./routes/creatorUsers");

  // use file and add path
  app.use("/activity", activityRouter);
  app.use("/exercises", exercisesRouter); // go to exercises.js file /exercises
  app.use("/users", userRouter); //go to users.js file /users
  app.use("/project", projectRouter); // cannot be successes
  app.use("/feedback", feedbackRouter); // cannot be successes
  app.use("/guest", guestRouter);
  app.use("/presenterUsers", presenterUsersRouter);
  app.use("/creatorUsers", creatorUsersRouter);

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();
