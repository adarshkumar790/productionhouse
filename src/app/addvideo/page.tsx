"use client"
import { useState } from 'react';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [src, setSrc] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration, src, description }),
    });

    if (response.ok) {
      setMessage('Video added successfully!');
      setTitle('');
      setDuration('');
      setSrc('');
      setDescription('');
    } else {
      const error = await response.json();
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-800 rounded">
        <h1 className="text-xl font-bold mb-4">Add a New Video</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 2h 40m)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Video Link (src)"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 p-2 rounded">
          Add Video
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddVideo;
