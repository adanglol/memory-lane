import React, { useEffect } from 'react';
import useAuth from '../useAuth';

import { Link,useNavigate } from 'react-router-dom';
// import handleLogout from '../logout';

function Hub() {
    useAuth();
    // const navigate = useNavigate();

  

    
    return (
    <>
        <h1 className="text-center"style = {{marginTop:3 + "em"}}>Hub</h1>
        {/* <Link onClick={handleLogout(navigate)} className='btn'>Logout</Link> 
         */}

        {/* <Link to = "/" onClick={() => handleLogout(navigate)} className="btn">Logout</Link> */}

    </>)
}

export default Hub;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import handleLogout from '../logout'; // Adjust the path as needed

// function Hub() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <h1 className="text-center" style={{ marginTop: '3em' }}>Hub</h1>
//       <Link 
//         to="#" 
//         onClick={() => handleLogout(navigate)} 
//         className="btn"
//       >
//         Logout
//       </Link>
//     </>
//   );
// }

// export default Hub;
