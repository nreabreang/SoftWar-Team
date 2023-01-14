import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component'
import Substance from './components/substance.component';
import ActivityList from './components/activity-list.component';
import EditActivity from './components/edit-activity.component';
import CreateActivity from './components/create-activity.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" exact element={<Substance/>} />
        <Route path="/edit/:id" element={<EditActivity/>} />
        <Route path="/createActivity" element={<CreateActivity />} />
        <Route path="/activityList" element={<ActivityList/>}/>
      </Routes>
      </div>
    </Router>

  );
}

export default App;
