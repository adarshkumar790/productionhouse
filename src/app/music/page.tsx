"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const movies = [
  {
    title: "Pushpa-2",
    video: "/pushpa2.mp4",
    year: "2024",
    category: "Webseries",
    rating: "U/A 13+",
    language: "Hindi",
    genre: "Action",
    singer: "Udit Narayan",
    poster: "/pushpa.jpeg",
    director: "Udit Narayan",
    description:
      "The thrilling sequel to Pushpa that takes you deeper into the intense world of crime, passion, and ambition.",
  },
  {
    title: "Deva",
    video: "/deva.mp4",
    poster: "/deva.jpeg",
    year: "2023",
    category: "Webseries",
    rating: "U/A 13+",
    language: "Tamil",
    genre: "Drama",
    description: "Deva embarks on a journey of self-discovery and redemption.",
  },
  {
    title: "Baghi4",
    video: "/baghi4.mp4",
    poster: "/baghi4.jpeg",
    year: "2023",
    category: "Webseries",
    rating: "U/A 16+",
    language: "Hindi",
    genre: "Action, Thriller",
    description:
      "Get ready for the fourth installment of the high-octane action-packed saga.",
  },
  {
    title: "Shafira",
    video: "/safira.mp4",
    poster: "/shafira.jpeg",
    year: "2022",
    category: "Webseries",
    rating: "U/A 7+",
    language: "Hindi",
    genre: "Family, Fantasy",
    description: "A magical adventure that will capture your imagination.",
  },
  {
    title: "Azaad",
    video: "/Azzad.mp4",
    poster: "/azad.jpeg",
    year: "2024",
    category: "Webseries",
    rating: "U/A 13+",
    language: "Hindi",
    genre: "Historical",
    description:
      "An epic journey into the struggles and triumphs of freedom fighters.",
  },
  {
    title: "Satya",
    video: "/satya.mp4",
    poster: "/satya.jpeg",
    year: "2023",
    category: "Webseries",
    rating: "U/A 13+",
    language: "Telugu",
    genre: "Thriller",
    description: "A gripping thriller that will keep you on the edge of your seat.",
  },
];

const Movie = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const router = useRouter();

  const handleWatchNow = (videoUrl: string) => {
    router.push(`/watch-video?video=${encodeURIComponent(videoUrl)}`);
  };

  const displayedMovies = viewAll ? movies : movies.slice(0, 4);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const videoElement = document.getElementById(
      `movie-video-${index}`
    ) as HTMLVideoElement;

    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play().catch((err) => {
        console.error("Video play error:", err);
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const videoElement = document.getElementById(
      `movie-video-${index}`
    ) as HTMLVideoElement;

    if (videoElement) {
      videoElement.pause();
    }
  };

  return (
    <>
    <Navbar/>
    <div className="bg-black text-white p-4">
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-xl font-bold">Web Series</h2>
        {!viewAll && (
          <button
            onClick={() => setViewAll(true)}
            className="text-red-600 px-4 py-2"
          >
            View All
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {displayedMovies.map((movie, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Video Thumbnail */}
            <div className="rounded-lg flex items-center justify-center">
              <video
                id={`movie-video-${index}`}
                src={movie.video}
                className="rounded-lg w-full h-96 object-cover"
                loop={false}
                muted
                poster={movie.poster}
              />
            </div>

            {/* Details Popup on Hover */}
            {hoveredIndex === index && (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-lg p-4 flex flex-col z-10">
                <div className="rounded-lg mb-2">
                  <video
                    src={movie.video}
                    className="rounded-lg w-full h-36 aspect-video object-cover"
                    loop={false}
                    muted
                    autoPlay
                  />
                </div>
                <div className="mb-2">
                  <button
                    className="bg-blue-600 text-black px-4 py-1 rounded-md text-sm w-full font-bold"
                    onClick={() => handleWatchNow(movie.video)}
                  >
                    Watch Full Video
                  </button>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-2 font-bold">
                  <span>{movie.year}</span>
                  <span>{movie.title}</span>
                  <span>{movie.language}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-300">{movie.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Movie;
