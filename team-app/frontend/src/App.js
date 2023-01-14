import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component'
import Homepage from './components/homepage.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Homepage />
      </div>
    </Router>

  );
}

export default App;
