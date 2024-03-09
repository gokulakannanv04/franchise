// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example model
const Example = mongoose.model('Example', { message: String });

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/api/examples', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/examples', async (req, res) => {
  try {
    const { message } = req.body;
    const newExample = new Example({ message });
    const savedExample = await newExample.save();
    res.status(201).json(savedExample);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
