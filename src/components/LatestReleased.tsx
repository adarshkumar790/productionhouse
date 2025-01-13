"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // If using Next.js (React Router if you're not)

const movies = [
  {
    title: "Pushpa-2",
    video: "/pushpa2.mp4",
    year: "2024",
    rating: "U/A 13+",
    language: "Hindi",
    genre: "Action",
    description:
      "The thrilling sequel to Pushpa that takes you deeper into the intense world of crime, passion, and ambition.",
  },
  {
    title: "Deva",
    video: "/deva.mp4",
    year: "2023",
    rating: "U/A 13+",
    language: "Tamil",
    genre: "Drama",
    description: "Deva embarks on a journey of self-discovery and redemption.",
  },
  {
    title: "Baghi4",
    video: "/baghi4.mp4",
    year: "2023",
    rating: "U/A 16+",
    language: "Hindi",
    genre: "Action, Thriller",
    description:
      "Get ready for the fourth installment of the high-octane action-packed saga.",
  },
  {
    title: "Shafira",
    video: "/safira.mp4",
    year: "2022",
    rating: "U/A 7+",
    language: "Hindi",
    genre: "Family, Fantasy",
    description: "A magical adventure that will capture your imagination.",
  },
  {
    title: "Azaad",
    video: "/Azzad.mp4",
    year: "2024",
    rating: "U/A 13+",
    language: "Hindi",
    genre: "Historical",
    description:
      "An epic journey into the struggles and triumphs of freedom fighters.",
  },
  {
    title: "Satya",
    video: "/satya.mp4",
    year: "2023",
    rating: "U/A 13+",
    language: "Telugu",
    genre: "Thriller",
    description: "A gripping thriller that will keep you on the edge of your seat.",
  },
];

const LatestReleased = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [videoPlayDuration, setVideoPlayDuration] = useState<number>(0);
  const router = useRouter(); // Use router for navigation

  const handleWatchNow = (videoUrl: string) => {
    // Redirect to another page (e.g., /watch-video) with the video URL
    router.push(`/watch-video?video=${encodeURIComponent(videoUrl)}`);
  };

  return (
    <div className="bg-black text-white p-2">
      <h2 className="text-xl font-bold mb-4">Latest Released</h2>
      <div className="relative ">
        {/* Horizontal Scroll Container */}
        <div className="flex space-x-4 overflow-hidden w-full justify-evenly">
          {movies.map((movie, index) => {
            // Calculate popup position based on the index
            const isFirst = index === 0;
            const isLast = index === movies.length - 1;

            return (
              <div
                key={index}
                className="relative w-60 cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setVideoPlayDuration(0); // Reset the video play duration
                  const videoElement = document.getElementById(
                    `movie-video-${index}`
                  ) as HTMLVideoElement;
                  if (videoElement) {
                    videoElement.currentTime = 0;
                    videoElement.play(); // Start playing video on hover
                  }

                  // Stop the video after 10 seconds
                  setTimeout(() => {
                    if (videoElement) videoElement.pause();
                  }, 10000); // 10 seconds
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  const videoElement = document.getElementById(
                    `movie-video-${index}`
                  ) as HTMLVideoElement;
                  if (videoElement) {
                    videoElement.pause(); // Pause video on mouse leave
                  }
                }}
              >
                {/* Video Thumbnail */}
                <div className="rounded-lg  flex items-center justify-center">
                  <video
                    id={`watch-${index}`}
                    src={movie.video}
                    className={`rounded-lg w-60 h-80 object-cover ${
                      hoveredIndex === index
                        ? "scale-10 transition-transform duration-300"
                        : "scale-10"
                    }`}
                    loop={false}
                    muted
                  />
                </div>

                {/* Details Popup on Hover */}
                {hoveredIndex === index && (
                  <div
                    className={`absolute top-0 ${
                      isFirst
                        ? "left-0"
                        : isLast
                        ? "right-0"
                        : "left-1/2 transform -translate-x-1/2"
                    } w-64 h-72 bg-gray-900 rounded-lg p-4 flex flex-col z-10`}
                  >
                    {/* Video */}
                    <div className="rounded-lg mb-2">
                      <video
                        src={movie.video}
                        className="rounded-lg w-full h-36 aspect-video object-cover"
                        loop={false}
                        muted
                        autoPlay
                      />
                    </div>
                    {/* Watch Button */}
                    <div className="mb-2">
                      <button
                        className="bg-white text-black px-4 py-1 rounded-md text-sm w-full"
                        onClick={() => handleWatchNow(movie.video)}
                      >
                        Watch Now
                      </button>
                    </div>
                    {/* Date and Language */}
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{movie.year}</span>
                      <span>{movie.language}</span>
                    </div>
                    {/* Description */}
                    <div>
                      <p className="text-xs text-gray-300">
                        {movie.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Arrow Buttons */}
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block">
          {"<"}
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default LatestReleased;
