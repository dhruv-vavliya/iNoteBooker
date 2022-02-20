// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';

import { NoteComponent } from './context/notes/NoteContext';
import { AlertComponent } from './components/Alert';
import { useState } from 'react';

const App = () => {
  const [loggedin, setloggedin] = useState(false);

  return (
    <Router>
        <AlertComponent >
          <NoteComponent loggedin={loggedin} setloggedin={setloggedin}  >
            <Navbar loggedin={loggedin} setloggedin={setloggedin} />

            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login loggedin={loggedin} setloggedin={setloggedin} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </NoteComponent>
        </AlertComponent>
    </Router>

  );
}

export default App;