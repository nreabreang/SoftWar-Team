import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateActivity from "./components/create-activity.component";
import ActivityList from "./components/activity-list.component";
import EditActivity from "./components/edit-activity.component";

function Test() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ActivityList/>} />
        <Route path="/edit/:id" element={<EditActivity/>} />
        <Route path="/createActivity" element={<CreateActivity />} />
        <Route path="/activityList" element={<ActivityList/>}/>
      </Routes>
    </Router>
  );
}

export default Test;
