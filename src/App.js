import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Broken from './pages/Broken';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={`/home/void-ness`} />} />
        <Route path='/home/:username' element={<Home />}></Route>
        <Route path='/fix' element={<Dashboard />}></Route>
        <Route path='/broken' element={<Broken />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
