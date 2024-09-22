import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from  '../Auth/AuthProvider';



function SignUp(){
  useEffect(() => {
    document.title = "Sign Up | Memory Lane";
    window.scrollTo(0, 0);
  },[])

  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const {register} = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error

    try {
      await register({
        email : email,
        username : username,
        password : password
      })
      alert('Signup successful');
      setEmail('');
      setUsername('');
      setPassword('');
      // navigate('/login');
    } catch (err) {
      console.error('Error during signup:', err);
      // setError('Signup failed. Please check your credentials.');
      setError(err.response?.data?.message || 'Signup failed. Please check your credentials.');
    }
  }



  return(
  <>
    <div className="container p-5" style={{marginTop :'10em', minWidth:'80%'}}>
      <form onSubmit = {handleSignUp}>
          <fieldset>
            <legend className="text-center fs-1">Let's Get Started!</legend>
            <div className="p-2">
              <label htmlFor="email" className="form-label fs-5">Email</label>
              <input
                type="text"
                className="form-control fs-5"
                id="email"
                placeholder="Enter your email"
                title = "Enter a valid email address"
                name = "email"
                autoComplete="email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="username" className="form-label fs-5">Username</label>
              <input
                type="text"
                className="form-control fs-5"
                id="username"
                placeholder="Enter your username"
                title="3-20 chars, letters, numbers, '.' or '_', no consecutive '.' or '_'" 
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="password" className="form-label fs-5">Password</label>
              <input
                type="password"
                className="form-control fs-5"
                id="password"
                placeholder="Enter your password" 
                title="At least 8 characters 1 uppercase, 1 lowercase, 1 number and 1 special character"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-4 ">
              <button type="submit" className="fs-2 cta btn btn-primary">Signup</button>
            </div>
            <div className="text-center mt-4">
              <p className="fs-3">Already a user? <Link to="/login" className="text-primary" id="below-link">Login</Link></p>
            </div>
            {error && <div className="text-center text-danger">{error}</div>}
          </fieldset>
      </form>
    </div>



  </>)
  
}

export default SignUp;