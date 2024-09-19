
import {React,  useState, useEffect}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';

function Login() {
  useEffect(() => {
    document.title = "Login | Memory Lane";
    window.scrollTo(0, 0);
  },[])

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    try {
      await login({
        username : emailOrUsername,
        email : emailOrUsername,
        password
      }, {withCredentials: true});
      // navigate('/hub');
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
              title = "Please enter your email or username"
              name = "emailOrUsername"
              autoComplete="emailOrUsername"
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
              title = "Please enter your password"
              name = "password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center mt-4 mb-5">
            <button type="submit" className="fs-2 cta btn btn-primary">Login</button>
          </div>
          <div className="text-center mt-4">
            <p className="fs-3">Not a user? <Link to="/signup" className="text-primary" id="below-link">Sign up</Link></p>
          </div>
            {error && <div className="text-center text-danger">{error}</div>}
        </fieldset>
      </form>
    </div>
  );
}
  

  export default Login;
  
  
  
  
  
  
