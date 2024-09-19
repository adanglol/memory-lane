import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Auth/ApiConfig'

const MemoryDetail = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        // const response = await axios.get(`/memories/${id}`);
        const response = await api.get(`/memories/${id}`);
        console.log(response.data, 'response')
        setMemory(response.data);
      } catch (error) {
        console.error('Error fetching memory details:', error);
      }
    };

    fetchMemory();
  }, [id]);

  if (!memory) {
    return <div>Loading...</div>;
  }
  return (
    // Display memory details
    <div className = "d-flex justify-content-center align-items-center vh-100 flex-column">

      <div className="p-4 rounded memory">
        <h1 className='mb-3 fs-1 text-center'>Title : {memory.title}</h1>
        <p className='mb-3 fs-2 text-center'>Description : {memory.description}</p>
        <audio controls className='mb-3'>
          <source src={memory.audio.url} type={memory.audio.contentType} />
          Your browser does not support the audio element.
        </audio>  
        <p className='mb-3 fs-4 text-center'>Created at: {new Date(memory.createdAt).toLocaleString()}</p>

      </div>
      
    </div>
  );
};

  

export default MemoryDetail;
