import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function Test() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" element={<CreateExercises />} />
        <Route path="/user" component={CreateUser} />
      </Routes>
    </Router>
  );
}

export default Test;
