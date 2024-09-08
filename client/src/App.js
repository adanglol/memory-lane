import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';  // or the relevant path to your CSS file


import { HashRouter as Router, Routes, Route} from 'react-router-dom'

import NavBar from './Components/nav';

import memoryPhoto from './img/memories.jpg';


// Define our views
function App() {
  useEffect(() => {
    document.title = "Memory Lane : Your Personal Audio Diary!";
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

        </Routes>
      </Router>
    </>
  )
}

function LandingPage(){
  return(<>
    {/* <div className="block"><h1 className="text-center">From daily thoughts to lifelong memories, capture it all with Memory Lane. </h1></div>

    <img src="" alt="" /> */}
    <div class="container-fluid landing-page">
        <div class="row h-100">
            <div class="col-md-6 d-flex align-items-center justify-content-center text-column">
                <div className="text-center">
                    <h1 className='fs-1 text-center'>Welcome to Memory Lane</h1>
                    <br />
                    <p className='fs-2 text-center'>Your personal audio diary app.</p>
                    <p className="fs-2 text-center">From daily thoughts to lifelong memories, capture it all with Memory Lane.</p>
                    <br />
                    <Link to="/login">
                      <button type="button" class="fs-2 cta btn btn-primary align-self-center">Get Started</button>
                    </Link> 
                    
                </div>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-center image-column mt-5">
                <img src={memoryPhoto} alt="memory-image" class="img-fluid"/>
            </div>
        </div>
    </div>
  </>)
}

function About(){
  useEffect(() => {},[])
  return(<>
  <h1 className="text-center"style = {{marginTop:3 + "em"}}>About</h1>
  </>)

}



function Login(){
  useEffect(() => {},[])
  return(<>
  <h1 className="text-center"style = {{marginTop:3 + "em"}}>LOGIN</h1>
  </>)

}

function SignUp(){
  useEffect(() => {},[])
  return(<>
    <h1 className="text-center"style = {{marginTop:3 + "em"}}>SignUp</h1>
    </>)

}







export default App;


// <h1 className="text-center mt-5 mb-5">Sign in to continue!</h1>
//   {/* <h2 className="text-center mt-5 mb-5">Login</h2> */}

//   {/* Email */}
//   <div class="p-5 mb-5">
//     <label for="exampleFormControlInput1" class="form-label">Email address</label>
//     <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
//   </div>
//   {/* Password */}
//   <div class="p-5">
//     <label for="exampleFormControlTextarea1" class="form-label">Password</label>
//     <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password"></input>
//   </div>
//   {/* Login and Create Account Button */}
//   <div class="p-5 text-center">
//     <button class="btn btn-primary btn-lg pt-2 pb-2 p-5">Login</button>
//   </div>
  
//   <div style={{ display: 'flex', alignItems: 'center' ,justifyContent :'center'}} class="text-center">
//       <p style={{ margin: '0 8px 0 0' }}>Don't have an account?</p>
//       <button style={{ padding: '8px 16px', cursor: 'pointer' }} class="btn btn-info">Sign Up</button>
//   </div>

//   <h1 className="text-center">{process.env.REACT_APP_JELLO}</h1>