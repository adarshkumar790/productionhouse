const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = "mongodb+srv://AdarshKumar:7903848803@cluster0.bpglqqv.mongodb.net/mmwmovie";
mongoose
  .connect(MONGO_URI, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Video Schema and Model
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  src: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

// Routes
// Root endpoint
app.get('/', (req, res) => {
  res.send('Video Streaming API is running...');
});

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos.', error });
  }
});

// Add a new video
app.post('/api/videos', async (req, res) => {
  const { title, description, src, duration } = req.body;

  if (!title || !description || !src || !duration) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newVideo = new Video({ title, description, src, duration });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add video.', error });
  }
});

// Delete a video by ID
app.delete('/api/videos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete video.', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
