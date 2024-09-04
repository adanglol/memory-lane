import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';


// Define our views
function App() {
  useEffect(() => {
    document.title = "Welcome!";
  },[])

  
  return (<>
  <h1 className="text-center mt-5 mb-5">Sign in to continue!</h1>
  {/* <h2 className="text-center mt-5 mb-5">Login</h2> */}

  {/* Email */}
  <div class="p-5 mb-5">
    <label for="exampleFormControlInput1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
  </div>
  {/* Password */}
  <div class="p-5">
    <label for="exampleFormControlTextarea1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password"></input>
  </div>
  {/* Login and Create Account Button */}
  <div class="p-5 text-center">
    <button class="btn btn-primary btn-lg pt-2 pb-2 p-5">Login</button>
  </div>
  
  <div style={{ display: 'flex', alignItems: 'center' ,justifyContent :'center'}} class="text-center">
      <p style={{ margin: '0 8px 0 0' }}>Don't have an account?</p>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }} class="btn btn-info">Sign Up</button>
  </div>

  <h1 className="text-center">{process.env.MONGODB_URI}</h1>
  
  
  </>);

  
}

function Login(){

}

function SignUp(){

}





export default App;
