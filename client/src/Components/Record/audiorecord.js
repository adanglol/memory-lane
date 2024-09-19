

import React, { useState,useEffect } from 'react';
// import axios from 'axios';
import { useAuth } from '../Auth/AuthProvider';
import api from '../Auth/ApiConfig'
// import { set } from 'mongoose';

const RecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {token} = useAuth();

    const MAX_RECORD_TIME = 5 * 60 * 1000;

    




    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            setAudioBlob(e.data);
        }
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
        setIsRecording(true);

        // Stop recording after MAX_RECORD_TIME
        const stopRecordingTimeout = setTimeout(() => {
            if (mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop(); // Properly stop the recording
                alert('Recording stopped after 5 minutes please restart recording');
            }   
        }, MAX_RECORD_TIME);

        // Clear timeout if recording is stopped manually
        mediaRecorder.onstop = () => {
            clearTimeout(stopRecordingTimeout);
            setIsRecording(false);
        };
    }

    const stopRecording = () => {
        mediaRecorder.stop();
        setIsRecording(false);
    }

    const restartRecording = () => {

        if (isRecording) {
            stopRecording();
        }

        // reset recording
        setAudioBlob(null);
        // setAudioUrl(null);

        startRecording();
    }
         

    const uploadAudio = async (e) => {
        // const mimeType = audioBlob.type;
        // const fileExtension = mimeType.split('/')[1];
        e.preventDefault();

        const filename = `${title || 'untitled'}.webm`;

        const formData = new FormData();
        formData.append('audio', audioBlob,filename);
        formData.append('title', title);
        formData.append('description', description);
        try {
            // await axios.post('http://localhost:5000/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${token}`
            //     }
            // });

            // if 

            const response = await api.post('/upload', formData, {
                withCredentials: true,
            });

            if (response.data.postedToday) {
                alert('You have already posted a memory today. Please try again tomorrow!');
                // return;
            } else {
                alert('Audio uploaded successfully!');
            }
            // alert('Audio uploaded successfully!');
            setAudioBlob(null);
            // setAudioUrl(null);
        } catch (e) {
            console.error(e);
        }
    }

    return (
    <>
        <div className="d-flex justify-content-center align-items-center p-3">

            {/* If there is not audio stored in blob begin with start recording */}
            {!audioBlob && (
                <button onClick={isRecording ? stopRecording : startRecording} 
                className = "btn fs-2 cta"style={{ marginTop: '10em'}}>  
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
            )}
            
            {!isRecording && audioBlob && (
                <div className="container p-2" style={{ marginTop: '10em', minWidth: '50%' }}>
                    <form onSubmit = {uploadAudio}>
                        <div className="text-center">
                            <legend className=" fs-1">Preview</legend>
                            
                            <audio controls src={URL.createObjectURL(audioBlob)} className = "w-100"></audio>
                        </div>
                    <div className="text-center p-2">
                        <legend className=" fs-1">Title</legend>
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control fs-5 w-100" required/>
                    </div>

                    <div className="text-center p-2">
                        <legend className=" fs-1">Description</legend>
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control fs-5 w-100"required/>
                        
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-center"> */}
                    {/* div */}
                    <br />
                    <div className="text-center">
                        <button type = "submit" className = "btn fs-2 cta">Upload Audio</button>
                        {/* <button onClick={restartRecording} className = "btn fs-2 cta">Restart Recording</button> */}
                    </div>
                    <br />
                    <div className="text-center">
                        <button onClick={restartRecording} className = "btn fs-2 cta">Restart Recording</button>

                    </div>
                        

                    {/* </div> */}
                    
                </form>

                </div>
                
                
            )}
        </div>
    </> 
    )

}






export default RecordAudio;