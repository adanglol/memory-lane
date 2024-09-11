import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hub() {

    useEffect(() => {
        document.title = " Hub | Destination for all your memories!";
    },[])
    return (
    <>
        {/* <div className="text-center" style = {{marginTop:3 + "em"}}>
            <h1>HUB</h1>
        </div> */}
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
            <h1 className='fs-2'>Memories</h1>
            {/* <br /> */}
            <Link to = '/record' className="btn fs-2 cta  d-inline-block mt-3">Record</Link>
            </div>
           
        </div>
     




    </>)
}

export default Hub;

