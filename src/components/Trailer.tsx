"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

// Movie Type
type Movie = {
  id: number;
  title: string;
  thumbnail: string;
};

const movies: Movie[] = [
  { id: 1, title: "Yarron", thumbnail: "/w1.png" },
  { id: 2, title: "Grown UPS", thumbnail: "/w2.png" },
  { id: 3, title: "Hall Pass", thumbnail: "/w1.png" },
  { id: 4, title: "Movie 4", thumbnail: "/w4.png" },
  { id: 5, title: "Movie 5", thumbnail: "/w2.png" },
  { id: 6, title: "Movie 6", thumbnail: "/w1.png" },
];

const Trailer = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalMovies = movies.length;

  // Determine the number of visible movies based on screen size
  const visibleMovies = typeof window !== "undefined" && window.innerWidth < 768 ? 1.2 : 3; 

  const nextSlide = () => {
    if (startIndex < totalMovies - visibleMovies) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-black text-white relative overflow-hidden">
      <h2 className="text-sm md:text-2xl pl-2 md:pl-8 font-bold">Trailer</h2>
      <div className="relative flex items-center overflow-hidden mt-4">
        {/* Left Button (Hidden when at first image) */}
        {startIndex > 0 && (
          <button
          onClick={prevSlide}
          className="absolute left-2 z-10  hover:bg-black/80 text-white p-2 rounded-full transition hidden md:flex"
        >
          <ChevronLeft size={28} />
        </button>
        )}

        {/* Movie List */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(startIndex / totalMovies) * 100}%)`,
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="w-[90%] md:w-1/4 flex-shrink-0 px-1"
              >
                <Image
                  src={movie.thumbnail}
                  alt={movie.title}
                  width={300}
                  height={150}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button (Hidden when at last image) */}
        {startIndex < totalMovies - visibleMovies && (
          <button
          onClick={nextSlide}
          className="absolute right-2 z-10  hover:bg-black/80 text-white p-2 rounded-full transition hidden md:flex"
        >
          <ChevronRight size={28} />
        </button>
        )}

        {/* Right Gradient (Always Visible) */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/90 to-transparent hidden md:block"></div>
        {startIndex > 0 && (
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/100 to-transparent hidden md:block"></div>
        )}
      </div>
    </div>
  );
};

export default Trailer;
