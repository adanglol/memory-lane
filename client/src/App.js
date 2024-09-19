import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './Components/nav';
import LandingPage from './Components/Views/landingpage';
import About from './Components/Views/about'; 
import SignUp from './Components/Views/signup';
import Login from './Components/Views/login';
import Hub from './Components/Record/hub';
import RecordAudio from './Components/Record/audiorecord';
import { AuthProvider } from './Components/Auth/AuthProvider';
import PrivateRoute from './Components/Record/protectedroute';
import MemoryDetail from './Components/Record/memorydetail';



// Define our views
function App() {
  useEffect(() => {
    document.title = "Memory Lane : Your Personal Audio Diary!";
  
  },[])
  return (
    <>
        <Router>
          <AuthProvider>
          <NavBar/>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/hub" element={<PrivateRoute element={<Hub/>}/>}/>
              <Route path="/record" element={<PrivateRoute element={<RecordAudio/>}/>} />
              <Route path ='/memories/:id' element={<PrivateRoute element={<MemoryDetail/>}/>}/>
            </Routes>
          </AuthProvider>
        </Router>
    </>
  )
}





export default App;

