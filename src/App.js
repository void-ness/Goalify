import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Broken from './pages/Broken';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/fix' element={<Dashboard />}></Route>
        <Route path='/broken' element={<Broken />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
