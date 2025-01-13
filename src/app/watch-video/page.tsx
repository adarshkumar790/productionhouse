"use client"
// src/app/watch-video/page.tsx (Next.js 13+ using App Router)

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Use next/navigation

const WatchVideo = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const searchParams = useSearchParams(); // To get query parameters
  const router = useRouter();

  useEffect(() => {
    const video = searchParams.get('video');
    if (video) {
      setVideoUrl(decodeURIComponent(video)); // Decode and set the video URL
    }
  }, [searchParams]); // Watch for changes in search params

  return (
    <div className="flex justify-center items-center bg-black h-screen">
      {/* Check if videoUrl exists, and render the video */}
      {videoUrl ? (
        <div className="relative w-full max-w-4xl h-auto">
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
          {/* Optionally, you can add a back button */}
          <button
            onClick={() => router.back()} // Go back to the previous page
            className="absolute top-4 left-4 text-white bg-gray-800 p-2 rounded-md"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="text-white">Loading video...</div>
      )}
    </div>
  );
};

export default WatchVideo;
