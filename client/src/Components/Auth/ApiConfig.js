import axios from 'axios';



axios.defaults.withCredentials = true;

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Include cookies with requests
});




export default api;
