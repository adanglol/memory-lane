// This is the entry point of our backend server

// Import the required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const validatePassword = require('./Middleware/validate_password');
const validateUsername = require('./Middleware/validate_username');
const isEmail = require('./Middleware/validate_email');



const authenticateJWT = (req, res, next) => {
  // const token = req.headers['authorization']?.split(' ')[1]; // Assumes token is in the format "Bearer token" this is sessionstorage and local storage approach by using headers 
  const token = req.cookies.accessToken; // Assumes token is in a cookie
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log('User from token:', user); // Debug statement

    next();
  });
};

const multer = require('multer');

// SCHEMAS
const User = require('./Schemas/user');
const Diary = require('./Schemas/diary');
const RefreshToken = require('./Schemas/refreshtoken');


const generateAccessToken = (user) => {
  const payload = { userId: user._id }; // Customize the payload as needed
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (user) => {
  const uniqueToken = crypto.randomBytes(64).toString('hex');
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Set the expiry date to 7 days from now
  
  


  const existingToken = await RefreshToken.findOne({ user: user._id });

  if (existingToken) {
    existingToken.token = uniqueToken;
    existingToken.expiryDate = expiryDate;
    await existingToken.save();
    // return uniqueToken;
  } else {
    const refreshToken = new RefreshToken({
      user: user._id,
      token: uniqueToken,
      expiryDate
    });
    await refreshToken.save();
    // return uniqueToken;
  }
  return uniqueToken;
}


// Load environment variables from the .env file
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;
const app = express();


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
app.use(cors({
  origin: 'https://adanglol.github.io/memory-lane/', // Your frontend URL
  credentials: true
}));
app.use(cookieParser());
const upload = multer(
  {
    storage : multer.memoryStorage(),
    limits : {fileSize: 5 * 1024 * 1024} // 5MB

  })





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

    // Generate the access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    // Send the access token and refresh token as cookies
    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'None'});
    res.cookie('accessToken', accessToken, { httpOnly: true ,secure: true, sameSite: 'None'});
    
    res.status(200).json({message: 'Logged in successfully'});


  } catch(e) {
    console.error(e);
    res.status(500).json({message: 'Error logging in'});
  }
});

// need to work on logout
app.post('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    // console.log(req.cookies);
    // console.log(res.cookies);
    res.status(200).json({message: 'Logged out successfully'});

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error logging out'});
  }
  
});

app.get('/check-auth', async (req, res) => {
  try {

    // console.log('Cookies:', req.cookies)
    // Validate access token (this example assumes it's in the Authorization header)
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.status(200).json({ isAuthenticated: true });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
});


// upload audio file
app.post('/upload', authenticateJWT,upload.single('audio'), async (req, res) => {
  // const { title, description,userId } = req.body;
  const { title, description,} = req.body;

  const userId = req.user.userId;

  const today = new Date();
  today.setHours(0,0,0,0);

  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // console.log(req..id);
    // check if existing memory for today or post 
    const existingMemory = await Diary.findOne({ user: userId,
      createdAt: 
      { $gte: today ,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
      });

    if (existingMemory) {
      console.log('Memory already exists for today');
      return res.json({postedToday: true});
    }

    // Check if the file size is greater than 5MB

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File exceeds 5-minute limit' });
    }



    // console.log('User ID:', userId);

    const audio = new Diary({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
      user: userId,
      title: title,
      description:description
    });

    await audio.save();
    res.json({ message: 'File uploaded successfully!' });

     
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }

});


// get all audio files aka memories

app.get('/memories', authenticateJWT, async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    const userId = req.user.userId;
    const memories = await Diary.find({ user: userId });

    const memoriesWithLinks = memories.map(memory => ({
      id: memory._id,
      title: memory.title,
      description: memory.description,
      link: `https://memory-lane-t90a.onrender.com//memories/${memory._id}`,
      createdAt: memory.createdAt
    }));


    res.json(memoriesWithLinks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching audio files' });
  }
});


// get audio file by id
app.get('/memories/:id', authenticateJWT, async (req, res) => {
  try {
    const memory = await Diary.findById(req.params.id);
    if (!memory) return res.status(404).json({ message: 'Memory not found' });

    res.json({
      id: memory._id,
      title: memory.title,
      description: memory.description,
      createdAt: memory.createdAt,
      audio: {
        url: `https://memory-lane-t90a.onrender.com/memories/${memory._id}/audio`, // URL to fetch the audio
        contentType: memory.contentType // MIME type for the audio
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching memory details' });
  }
});


// serve audio file - memory
app.get('/memories/:id/audio', authenticateJWT, async (req, res) => {
  try {
    const memory = await Diary.findById(req.params.id);
    if (!memory) return res.status(404).json({ message: 'Memory not found' });

    res.set('Content-Type', memory.contentType); // Set the appropriate MIME type
    res.send(memory.data); // Send the audio buffer
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching audio file' });
  }
});



// Only listen the server if we're not in a test environment
if (process.env.NODE_ENV !== 'development' || process.env.NODE_ENV === 'production') {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);

    });
}

module.exports = app;