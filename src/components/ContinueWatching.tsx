"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Movie Type
type Movie = {
  id: number;
  title: string;
  thumbnail: string;
  remainingTime: string;
  progress: number; // Percentage of completion
};

const movies: Movie[] = [
  { id: 1, title: "Yarron", thumbnail: "/w1.png", remainingTime: "1h 50m left", progress: 30 },
  { id: 2, title: "Grown UPS", thumbnail: "/w2.png", remainingTime: "2h 10m left", progress: 50 },
  { id: 3, title: "Hall Pass", thumbnail: "/w1.png", remainingTime: "1h 05m left", progress: 70 },
  { id: 4, title: "Movie 4", thumbnail: "/w4.png", remainingTime: "2h 30m left", progress: 20 },
  { id: 5, title: "Movie 5", thumbnail: "/w2.png", remainingTime: "1h 15m left", progress: 60 },
  { id: 6, title: "Movie 6", thumbnail: "/w1.png", remainingTime: "2h 45m left", progress: 40 },
];

const ContinueWatching = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleMovies, setVisibleMovies] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size and update state
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleMovies(1); // Show only one movie on small screens
        setIsMobile(true); // Hide navigation icons
      } else {
        setVisibleMovies(4); // Show four movies on larger screens
        setIsMobile(false); // Show navigation icons
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (startIndex + visibleMovies < movies.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-black text-white relative h-auto md:h-auto lg:h-auto">
      <h2 className="text-sm md:text-2xl pl-2 md:pl-8 font-bold">
        Continue Watching For User
      </h2>
      <div className="relative overflow-hidden mt-4">
        <div className="flex space-x-4 transition-transform" style={{ transform: `translateX(-${startIndex * 100}%)` }}>
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`relative w-full sm:w-64 md:w-80 lg:w-80 flex-shrink-0 transition-opacity ${
                index >= startIndex && index < startIndex + visibleMovies ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* Movie Thumbnail */}
              <div className="relative">
                <Image
                  src={movie.thumbnail}
                  alt={movie.title}
                  width={300}
                  height={120}
                  className="w-full h-48 sm:h-44 md:h-40 lg:h-48 object-cover"
                />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src="/plays.png" alt="Play" width={50} height={50} className="opacity-100" />
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-700">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${movie.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm sm:text-md md:text-lg font-semibold">{movie.title}</p>
                <Image src="/remove.png" alt="icon" width={25} height={25} className="ml-2" />
              </div>
              <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                <span className="ml-1">{movie.remainingTime}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent hidden md:block"></div>
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent hidden md:block"></div>
      </div>

      {/* Navigation Buttons (Hidden on Mobile) */}
      {!isMobile && startIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-lg"
          onClick={handlePrev}
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {!isMobile && startIndex + visibleMovies < movies.length && (
        <button
          className="absolute right-6 top-1/2 transform -translate-y-1/2"
          onClick={handleNext}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};

export default ContinueWatching;