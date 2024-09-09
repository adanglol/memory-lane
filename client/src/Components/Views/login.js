
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(''); // Reset error
  
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username : emailOrUsername,
          email : emailOrUsername,
          password
        });
        console.log('Login successful:', response.data);
        // Handle successful login (e.g., redirect or show a success message)
        sessionStorage.setItem('token', response.data.token);
        // Redirect to hub 
        navigate('/hub');
        window.location.reload();
      } catch (err) {
        console.error('Error during login:', err);
        setError('Login failed. Please check your credentials.');
      }
    };
  
    return (
      <div className="container p-5" style={{ marginTop: '10em', minWidth: '80%' }}>
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend className="text-center fs-1">Sign in to continue!</legend>
            <div className="p-4">
              <label htmlFor="emailOrUsername" className="form-label fs-5">Email or Username</label>
              <input
                type="text"
                className="form-control fs-5"
                id="emailOrUsername"
                placeholder="Enter your email or username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>
            <div className="p-4">
              <label htmlFor="password" className="form-label fs-5">Password</label>
              <input
                type="password"
                className="form-control fs-5"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-4 mb-5">
              <button type="submit" className="fs-2 cta btn btn-primary">Login</button>
            </div>
            <div className="text-center mt-4">
              <p className="fs-3">Not a user? <Link to="/signup" className="text-primary" id="signup">Sign up</Link></p>
            </div>
            {error && <div className="text-center text-danger">{error}</div>}
          </fieldset>
        </form>
      </div>
    );
  }
  

  export default Login;
  
  
  
  
  
  
