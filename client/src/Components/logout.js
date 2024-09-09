
// import { navigate } from '@reach/router';


function handleLogout(navigate) {
  sessionStorage.removeItem('token');
  console.log('Logged out');
  window.location.reload();

  }

export default handleLogout;