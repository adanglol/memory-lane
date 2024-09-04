// This is the entry point of our backend server
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
console.log(process.env.MONGODB_URI);
const express = require('express');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello from the backend! ${process.env.MONGODB_URI}`);
});

app.listen(port, () => {
  console.log(`Server running on port localhost:${port}`);
});


