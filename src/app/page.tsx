"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useFetchMovies, Video } from "@/helper/Helper";
import ContinueWatching from "@/components/ContinueWatching";
import Trailer from "@/components/Trailer";
import LatestReleased from "@/components/LatestReleased";
import TopFilmPicks from "@/components/TopFilm";
import Top10India from "@/components/Top10";
import PopularMovie from "@/components/PopularMovie";
import PopularWebsereries from "@/components/PopularWebseries";
import PopularMusic from "@/components/PopularMusic";
import ComingSoon from "@/components/ComingSoon";

const Home = () => {
  const { videos, loading, error } = useFetchMovies();
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videos.length > 0) setCurrentVideo(videos[0]);
  }, [videos]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) videoRef.current.pause();
      else videoRef.current?.play();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <>
    <div className="relative min-h-screen text-white bg-black">
      <Navbar />

      {currentVideo && (
        <div className="relative w-full md:h-[540px] h-[400px] flex items-center justify-center">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentVideo.src}
            autoPlay
            loop
            muted={isMuted}
          />
            <div className="absolute inset-0">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/80"></div>
            <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
            <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute md:bottom-2   right-6 z-20 bg-gray-800 p-2 rounded-full focus:outline-none hover:bg-gray-700"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <div className="absolute bottom-0 z-10 w-full md:w-[550px] max-w-full md:pl-8 mx-auto md:mx-0 text-center md:text-left left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0">

            <span className="font-bold text-center md:text-6xl text-xl text-yellow-500">Sarfira</span>
            <p className="text-gray-100 md:text-xl text-xs md:mt-2">Sarfira (transl. Crazy) is a 2024 Indian Hindi-language drama film directed by Sudha Kongara and produced by 2D Entertainment.</p>
            <div className="flex justify-center md:mt-2 md:justify-between items-center text-lg text-gray-300 font-medium md:space-x-0 space-x-4">
              <span className="text-yellow-500 md:text-xl text-xs">Newly added • 2024</span>
              <span className="font-bold text-yellow-500 md:text-sm text-xs">2.4h</span>
              
            </div>
            <p className="text-[#FDFAFA] md:text-xl text-xs md:mt-2">• Hindi  • English  • Gujrati</p>
            <button className="flex items-center justify-center bg-gradient-to-r from-[#FFE203] to-[#F50D11] 
             rounded font-bold md:mt-4 mt-2 px-8 py-3 text-gray-900 text-sm md:text-xl mx-auto md:mx-0">
             <Image src="/plays.png" width={24} height={24} alt="play" className="mr-2"/>
              Watch Now
             </button>

          </div>
          <div className="absolute right-2 bottom-0 w-full md:w-[480px] max-h-[500px] flex flex-row md:flex-row overflow-x-auto md:overflow-y-auto p-4 rounded-lg shadow-lg">
            {videos.map((video) => (
              <div
                key={video.id}
                className="w-36 h-60 relative cursor-pointer hidden md:block first:ml-0 ml-4"
                onClick={() => setCurrentVideo(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={192} 
                  height={240} 
                  className="w-40 h-60 object-cover rounded-lg transition-transform transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )} 
      <ContinueWatching/>
      <Trailer/>
      <LatestReleased/>
      <TopFilmPicks/>
      <Top10India/>
      <PopularMovie/>
      <PopularWebsereries/>
      <PopularMusic/>
      <ComingSoon/>
    </div>
    
    </>
  );
};


export default Home;
