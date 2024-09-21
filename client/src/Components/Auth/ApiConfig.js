import axios from 'axios';



axios.defaults.withCredentials = true;

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://memory-lane-t90a.onrender.com/',
  withCredentials: true, // Include cookies with requests
});




export default api;
