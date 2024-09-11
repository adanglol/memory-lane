import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthProvider';


const RecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const {token} = useAuth();



    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            setAudioBlob(e.data);
        }
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
        setIsRecording(true);
    }

    const stopRecording = () => {
        mediaRecorder.stop();
        setIsRecording(false);
    }

    const uploadAudio = async () => {
        const formData = new FormData();
        formData.append('audio', audioBlob,'recording.wav');
        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Audio uploaded successfully!');
        } catch (e) {
            console.error(e);
        }
    }

    return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {audioBlob && (
                <button onClick={uploadAudio}>Upload Audio</button>
            )}
        </div>
    </> 
    )

}

export default RecordAudio;