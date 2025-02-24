import { useState, useEffect } from "react";

export type Video = {
  id: number;
  title: string;
  // duration: string;
  src: string;
  thumbnail: string;
  description: string;
};

const API_URL = "http://localhost:5000/movies";

export const useFetchMovies = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const formattedVideos = data.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          // duration: `${movie.duration}h`,
          src: movie.videoUrl,
          thumbnail: movie.thumbnail,
          description: movie.description,
        }));

        setVideos(formattedVideos);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { videos, loading, error };
};
