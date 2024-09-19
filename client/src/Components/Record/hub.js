import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../Auth/ApiConfig'


function Hub() {
    const [memories, setMemories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error,setError] = React.useState(null);



    useEffect(() => {
        document.title = " Hub | Destination for all your memories!";
        // fetch memories from the server
        const fetchMemories = async (req) => {
            try {
                await api.get('/memories')
                .then((response) => {
                    setMemories(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching memories:', error);
                    setError('Failed to fetch memories');
                })
            } catch(err) {
                setError('Failed to fetch memories',err);
            } 
            finally {
                setLoading(false);
            }
        }
        fetchMemories();    
    },[])

    if(loading) {
        return <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        
        </>
    }

    // render error state
    if(error) {
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <p className="text-danger">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
                </div>
            </div>
        </>
    }



    return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center p-5">
            <h1 className='fs-2 mb-1'>Your Memories</h1>
            <hr />
            <br />
            {memories.length > 0 ?(
                <ul className="list-unstyled">
                    {memories.map((memory) => (
                        <li key={memory.id} className="mb-2">
                            <Link to={`/memories/${memory.id}`} className="text-decoration-none fs-4 link btn cta">{memory.title}</Link>
                        </li>
                    ))}

                </ul>
            ) : (
                <p>No memories found</p>
            )}
    


            <Link to = '/record' className="btn fs-2 cta  d-inline-block mt-3">Record</Link>
            </div>
           
        </div>
     




    </>)
}

export default Hub;

