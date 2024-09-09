import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './Components/nav';
import LandingPage from './Components/Views/landingpage';
import About from './Components/Views/about'; 
import SignUp from './Components/Views/signup';
import Login from './Components/Views/login';
import Hub from './Components/Views/hub';



// Define our views
function App() {
  useEffect(() => {
    document.title = "Memory Lane : Your Personal Audio Diary!";
    const token = sessionStorage.getItem('token');
    console.log(token);
  },[])
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hub" element={<Hub />} />
        </Routes>
      </Router>
    </>
  )
}





export default App;

