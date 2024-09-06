// This is the entry point of our backend server

// Import the required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// SCHEMAS
const User = require('./Schemas/user');
// const Entry = require('./Schemas/diary');

// Load environment variables from the .env file
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;
const app = express();

// Function to check if a string is an email
const isEmail = (str) => /\S+@\S+\.\S+/.test(str);

// Connect to the MongoDB database with mongoose
async function connectDB(){
  try{
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch(e) {
    console.log('Error connecting to MongoDB',e)
  }
}

connectDB().catch(console.error);

app.use(express.json());

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes token is in the format "Bearer token"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Define routes for user registration and login and entries
// 8 characters with special characer for password - regex think can do for frontend
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log("recieved body req", req.body);
  try {
    // await mongoose.connect(mongoUri)
    const newUser = new User({username,email,password});
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error creating user' });
  }
});


// need work on login - need to check if user exists pw is correct
app.post('/login', async (req, res) => {
  const {email,username,password} = req.body;
  try {
    // Find the user by email or username
    const user = await User.findOne({
    $or:[{email},{username}]});
    if(!user) {
      return res.status(401).json({message: 'Invalid credentials either email or username'});
    }
    // Compare the password
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
      return res.status(401).json({message: 'Invalid credentials pw'});
    }
    // Create a JWT token
    const payload = {userId: user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
  } catch(e) {
    console.error(e);
    res.status(500).json({message: 'Error logging in'});
  }


});




// app.post('/entries', authenticateJWT ,async (req, res) => {});








app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});



