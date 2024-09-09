// This is the entry point of our backend server

// Import the required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

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

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialCharacters = /[!@#$%^&*]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters;
}

function validateUsername(username){
  const minLength = 3;
  const maxLength = 20;
  const usernamePattern = /^(?!.*__.*)(?!.*\.\..*)[a-zA-Z0-9._]{3,20}$/;
  
  return username.length >= minLength &&
         username.length <= maxLength &&
         usernamePattern.test(username);
}


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


// Connect to the MongoDB database with mongoose
const connectDB  = async () => {
  try{
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch(e) {
    console.log('Error connecting to MongoDB',e)
  }
}
if (require.main === module){
  connectDB().catch(console.error);
}


app.use(express.json());
// app.use(cors());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Define routes for user registration and login and entries
// 8 characters with special characer for password - regex think can do for frontend
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email is valid
    if (!isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    // Check if the password is valid
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password must have length least 8 char have one upper a number and a special char' });
    }
    // Check if the username is valid
    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'Invalid username' });
    }
    // Check if the email or username already exists
    const [emailExists, usernameExists] = await Promise.all([
      User.exists({ email }),
      User.exists({ username })
    ]);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // if not exists create user
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


    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token, message: 'Logged in successfully' });


  } catch(e) {
    console.error(e);
    res.status(500).json({message: 'Error logging in'});
  }


});




// app.post('/entries', authenticateJWT ,async (req, res) => {});




module.exports = app;

// Only listen the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
}