"use client";
import { useState } from "react";

const AddMovie = ({ onMovieAdded }: { onMovieAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newMovie = {
      title,
      duration: parseFloat(duration),
      videoUrl,
      thumbnail,
      description,
    };

    try {
      const response = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTitle("");
      setDuration("");
      setVideoUrl("");
      setThumbnail(""); 
      setDescription("");
    } catch (error) {
      console.error("Error adding movie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
      <form onSubmit={handleAddMovie} className="space-y-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="number"
          placeholder="Duration (hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-500 p-2 rounded font-bold hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
