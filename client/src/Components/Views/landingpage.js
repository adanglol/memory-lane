

import React from 'react';
import { Link } from 'react-router-dom';
import memoryPhoto from '../../img/memories.jpg';


function LandingPage(){
    return(<> 
      <div className="container-fluid landing-page">
          <div className="row h-100">
              <div className="col-md-6 d-flex align-items-center justify-content-center text-column">
                  <div className="text-center">
                      <h1 className='fs-1 text-center'>Welcome to Memory Lane</h1>
                      <br />
                      <p className='fs-2 text-center'>Your personal audio diary app.</p>
                      <p className="fs-2 text-center">From daily thoughts to lifelong memories, capture it all with Memory Lane.</p>
                      <br />
                      <Link to="/login">
                        <button type="button" className="fs-2 cta btn btn-primary align-self-center">Get Started</button>
                      </Link> 
                      
                  </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center image-column mt-5">
                  <img src={memoryPhoto} alt="memory-image" className="img-fluid"/>
              </div>
          </div>
      </div>
    </>)
  }

  export default LandingPage;