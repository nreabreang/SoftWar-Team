import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component'
import Substance from './components/substance.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Substance />
      </div>
    </Router>

  );
}

export default App;
