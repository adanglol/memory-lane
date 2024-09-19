# Memory Lane - Audio Diary Web Application

# Created by: Aaron Dangc or adanglol

# Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Possible Future Features](#possible-future-features)
- [Least Likely Features](#least-likely-features---point-of-memory-lane-is-to-reflect-on-the-day-and-to-provide-a-space-for-users-to-express-themselves-would-loss-authenticity)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Testing](#testing)
- [API Documentation](#api-documentation)
- [Attributions](#attributions)

# Project Overview
Memory Lane is a web application that allows users to record audio diaries. Users can record their thoughts, feelings, and experiences, and save them from their device. Users can also listen to their recordings, and delete them if they choose. Users are limited to one recording per day to reflect on their day. Goal is to provide a platform for users to reflect on their day, and to provide a space for users to express themselves.

# Features
- Record audio diaries with title and description
- Limit of one recording per day 5 minutes max
- Saves audio diaries
- Download audio diaries
- Listen to audio diaries
- User authentication - register, login, logout
- No editing or deleting  of audio diaries - to encourage authenticity and reflection on the day

# Possible Future Features
- User profile page
- User settings
- User statistics on audio diaries
- User badges for recording streaks
- Encouragement notifications to record audio diaries / Email reminders to record audio diaries
- Daily prompts for audio diaries
- Search audio diaries
- Filter audio diaries by date
- Reflection comments on past audio diaries
- Share audio diaries with friends
- paginate audio diaries
- User feedback form

# Least Likely Features
(Point of Memory Lane is to reflect on the day and to provide a space for users to express themselves would loss authenticity)
- Delete Diaries: Users might be able to remove unwanted entries (to be considered based on user feedback and feature requirements).
- Edit Diaries: Users might be able to edit their entries (to be considered based on user feedback and feature requirements).


# Technologies Used
- Frontend: React Native, Bootstrap, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT and bcrypt
- Audio Recording: MediaRecorder API
- Testing: Jest

# Getting Started

# Prerequisites

- Node.js v14 or later
- npm (comes with Node.js)
- MongoDB (MongoDB Atlas account for cloud database)

# Setup

1. Clone the repository
- git clone <repository-url>
- cd <repository-name>

2. In the root directory, should see the client and server directories and package.json files now,
install the dependencies for both the client and server directories in your terminal as well as the root directory :
- npm install
- cd client
- npm install
- cd ../server
- npm install
- cd ..

3. In root directory, create a .env file and add the following environment variables
- MONGODB_URI=your_mongodb_uri (from MongoDB Atlas)
- JWT_SECRET=your_jwt_secret  (can be any string for encryption)
- NODE_ENV = development (for development environment as well as testing also change to production for production environment)

4. Start the server in the root directory
- npm start

5. Access the application 

- Frontend: Open your browser and go to http://localhost:3000 to see the frontend of the application.
- Backend API: The backend API will be accessible at http://localhost:5000 (or whichever port you've configured).

6. Troubleshooting
- Backend Issues: Check the server logs for errors and ensure the MongoDB server is running. (also Postman is a good tool to test API endpoints)
- Frontend Issues: Verify that the frontend development server is correctly pointing to the backend API and that both servers are running.

# Testing
- To run tests, navigate to the server directory and run the following command:
- npm test
- This will run the Jest test suite and display the results in the terminal. 
(authentication for now)
(need to add more tests for the audio recording and diary creation)


# API Documentation

## User Routes

### Register User
### Request type: POST
/register
```json
{
    "username": "TestUser",
    "email": "email@example.com",
    "password": "password"
}
```

### Login User
### Request type: POST
/login
```json
{
    "emailorusername": "TestUser or email@example.com",
    "password": "password"
}
```

### Logout User
### Request type: POST
/logout


## Diary Routes - Requires Authentication (Tokens stored in cookies after login)

### Get All Diaries 
### Request type: GET
/memories

### Get Diary by ID and generate audio file link
### Request type: GET
/memories/:id

### Serve Audio Diary link
### Request type: GET
/memories/:id/audio


### Create Diary
### Request type: POST
/upload
```json
{
    "title": "Title",
    "description": "Description",
    
}
```
to also note that upload will also include the audio file as well


# Final Notes 
- This project is still in development and will be updated with more features and improvements in the future.
- This project was created as a personal project to learn more about full-stack development and to create a platform for users to reflect on their day.
- Hopefully get this project deployed on Heroku or AWS in the future.
- Learned a lot about React Native, Node.js, Express, MongoDB, and audio recording in this project.
- Feel free to contribute to this project by forking the repository and submitting a pull request.
- If you have any questions or feedback, please feel free to reach out to me at adraging@gmail.com




# Attributions
Photo by <a href="https://unsplash.com/@joshhild?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Josh Hild</a> on <a href="https://unsplash.com/photos/person-holding-four-photos-JYQkVLOPy8U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  