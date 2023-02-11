import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.component";
import Homepage from "./components/homepage.component";
import Footer from "./components/footer.component";
import CreateActivity from "./components/creator-view/create-activity.component";
import ActivityList from "./components/creator-view/activity-list.component";
import EditActivity from "./components/creator-view/edit-activity.component";
import GuestActivityList from "./components/guest-view/guest-activity-list.component";
import ActivityId from "./components/guest-view/activity-id.component";
import CreatorActivityId from "./components/creator-view/activity-id.component";
import GuestLogin from "./components/guest-view/guest-login.component";
import GuestEnter from "./components/guest-view/guest-enter";
import CreatorLogin from "./components/creator-view/creator-login.component";
import CreateProject from "./components/presenter-view/create-project.component";
import ProjectLists from "./components/guest-view/projects-list.component";
import ProjectID from "./components/guest-view/project-id.component";
import Access from "./components/access.component";
import PresenterLogin from "./components/presenter-view/login.component";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/createActivity" element={<CreateActivity />}></Route>
          <Route path="/activityList" element={<ActivityList />}></Route>
          <Route path="/activityList/:id" element={<ActivityList />}></Route>
          <Route path="/Edit/:id" element={<EditActivity />}></Route>
          <Route
            path="/guestActivityList"
            element={<GuestActivityList />}
          ></Route>
          <Route
            path="/guestActivityList/:id/:id"
            element={<ActivityId />}
          ></Route>
          <Route
            path="/creatorActivityList/:id"
            element={<CreatorActivityId />}
          ></Route>
          <Route path="/guestLogin" element={<GuestLogin />}></Route>
          <Route path="/guestEnter" element={<GuestEnter />}></Route>
          <Route path="/creatorLogin" element={<CreatorLogin />}></Route>
          <Route path="/createProject" element={<CreateProject />}></Route>
          <Route path="/projectList" element={<ProjectLists />}></Route>
          <Route path="/projectList/:id" element={<ProjectID />}></Route>
          <Route path="/access/:id" element={<Access />}></Route>
          <Route path="/presenterLogin" element={<PresenterLogin/>}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
