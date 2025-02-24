"use client";
import { useRef } from "react";
import Image from "next/image";

const movies = [
  { id: 1, src: "/t1.png", video: "https://cdn.pixabay.com/video/2023/03/24/155892-811426871_tiny.mp4", alt: "Padmaavat" },
  { id: 2, src: "/t2.png", video: "https://cdn.pixabay.com/video/2024/12/21/247980_tiny.mp4", alt: "Dilwale" },
  { id: 3, src: "/t3.png", video: "https://cdn.pixabay.com/video/2023/02/14/150725-798877546_tiny.mp4", alt: "Shaitaan" },
  { id: 4, src: "/t4.png", video: "https://cdn.pixabay.com/video/2017/03/07/8222-207359908_tiny.mp4", alt: "Kaala" },
  { id: 5, src: "/t5.png", video: "https://cdn.pixabay.com/video/2022/08/10/127433-738466676_tiny.mp4", alt: "Welcome Back" },
  { id: 6, src: "/t6.png", video: "https://cdn.pixabay.com/video/2024/12/23/248336_tiny.mp4", alt: "Gadar" },
  { id: 7, src: "/t7.png", video: "https://cdn.pixabay.com/video/2015/11/30/1469-147538044_tiny.mp4", alt: "Chennai Express" },
  { id: 8, src: "/t2.png", video: "https://cdn.pixabay.com/video/2020/05/06/38270-415950888_tiny.mp4", alt: "Lingaa" },
  { id: 9, src: "/t1.png", video: "https://cdn.pixabay.com/video/2024/12/21/247983_tiny.mp4", alt: "State" },
  { id: 10, src: "/t5.png", video: "https://cdn.pixabay.com/video/2023/06/04/165701-833149511_tiny.mp4", alt: "Welcome Back" },
  { id: 11, src: "/t6.png", video: "https://cdn.pixabay.com/video/2024/05/05/210707_tiny.mp4", alt: "Gadar" },
  { id: 12, src: "/t7.png", video: "https://cdn.pixabay.com/video/2021/04/19/71566-538962843_tiny.mp4", alt: "Chennai Express" },
  { id: 13, src: "/t2.png", video: "https://cdn.pixabay.com/video/2021/04/19/71565-538962840_tiny.mp4", alt: "Lingaa" },
  { id: 14, src: "/t1.png", video: "https://cdn.pixabay.com/video/2021/04/19/71567-538962845_tiny.mp4", alt: "State" },
];

const TopFilmPicks = () => {
  return (
    <section className="relative bg-black text-white p-6 md:p-12 flex flex-col md:flex-row items-center">
      {/* Left Section */}
      <div className="md:w-1/2 w-30px">
        <h2 className="text-sm md:text-2xl pl-2 md:pl-8 font-bold">
          Top Film Picks
        </h2>
        <p className="mt-2 text-gray-300 text-sm md:text-lg">
          Discover must-watch movies with our <br /> top film picks for every mood and genre!
        </p>
        <button className="mt-4 bg-white text-black px-6 py-3 flex items-center shadow-md hover:bg-gray-200 transition">
          <Image src="/Exp.png" alt="Explore" width={24} height={24} className="mr-2" />
          Explore Collection
        </button>
      </div>

      {/* Right Section - Hexagonal Grid */}
      <div className="md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
        {[0, 5, 9].map((start, index) => (
          <div key={index} className={`grid ${index === 1 ? "grid-cols-4" : "grid-cols-5"} gap-3 md:gap-6 mt-3`}>
            {movies.slice(start, start + (index === 1 ? 4 : 5)).map((movie) => {
              const videoRef = useRef<HTMLVideoElement | null>(null); // ✅ Correctly typed useRef

              return (
                <div
                  key={movie.id}
                  className="hexagon relative overflow-hidden"
                  onMouseEnter={() => videoRef.current?.play()} // ✅ No TypeScript error
                  onMouseLeave={() => videoRef.current?.pause()} // ✅ No TypeScript error
                >
                  {/* Thumbnail Image (Fallback) */}
                  <Image
                    src={movie.src}
                    alt={movie.alt}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-md absolute top-0 left-0"
                  />

                  {/* Video (Auto-play on hover) */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-md absolute top-0 left-0"
                    muted
                    loop
                    playsInline
                  >
                    <source src={movie.video} type="video/mp4" />
                    <source src={movie.video.replace(".mp4", ".webm")} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFilmPicks;
