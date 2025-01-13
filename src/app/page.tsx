"use client";
import LatestReleased from '@/components/LatestReleased';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';



const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState({
    title: 'Safira',
    duration: '2h 40m',
    src: '/safira.mp4',
    description: "Safira's journey is a tale of love, betrayal, and redemption as she navigates a world full of secrets and lies.",

  });


  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videos = [
    {
      title: 'Safira',
      duration: '2h 40m',
      src: '/safira.mp4',
      description: "Safira's journey is a tale of love, betrayal, and redemption as she navigates a world full of secrets and lies.",
    },
    {
      title: 'Satya',
      duration: '1h 50m',
      src: '/satya.mp4',
      description: "Satya's story is a gripping drama of friendship and honor as he stands up against corruption and injustice.",
    },
    {
      title: 'Lahore',
      duration: '2h 10m',
      src: '/lahore.mp4',
      description: "Lahore chronicles the sacrifices of a soldier torn between duty and family during tumultuous times.",
    },
    {
      title: 'PM',
      duration: '2h 30m',
      src: '/pm.mp4',
      description: "PM dives deep into the life of a visionary leader battling conspiracies and striving to change the nation's future.",
    },
  ];

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };


  type Video = {
    title: string;
    duration: string;
    src: string;
    description: string;
  };
  
  const changeBackgroundVideo = (video: Video) => {
    setCurrentVideo(video);
  };
  
  

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      } else if (videoRef.current) {
        videoRef.current.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen text-white bg-black">
        <Navbar />
        {/* <Head>
          <title>Pushpa 2: The Rule</title>
        </Head> */}

        {/* Hero Section */}
        <div className="relative h-[500px]">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentVideo.src}
            autoPlay
            loop
            muted={isMuted}
          ></video>

          {/* Overlay with gradient red shadow on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-red-800/20"></div>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 bg-gray-700 p-2 rounded-full focus:outline-none hover:bg-gray-600"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Content */}
          {/* Content */}
<div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
  <div className="bg-black/50 p-6 rounded-lg max-w-3xl mt-64 mb-2">
    {/* Title */}
    {/* <h1 className="text-2xl font-bold text-yellow-500">{currentVideo.title}</h1> */}

    {/* Release Date and Duration */}
    <div className="flex justify-between items-center w-full mt-2 mb-2 text-sm text-gray-300 font-medium">
      <div className="text-left font-bold text-yellow-500">Newly added • 2024</div>
      <div className="text-right font-bold text-yellow-500">{currentVideo.duration}</div>
    </div>

    {/* Description Text */}
    <p className="text-gray-100">
      {currentVideo.description}
    </p>

    {/* Watch Button */}
    <div className='ml-56'>
      <button className="flex items-center bg-white rounded font-bold mb-16 mt-4 p-2 pl-16 pr-16 text-gray-900 text-xl">
        <Image src="/play.png" width={20} height={20} alt="play" className="mr-2" /> 
        Watch Now
      </button>
    </div>
  </div>
</div>

        </div>

        {/* Carousel Section */}
        <div className="px-4 py-4">
  <div className="flex space-x-1 overflow-x-none -mt-14 justify-center ">
    {videos.map((video, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-24 aspect-w-16 aspect-h-4 relative cursor-pointer z-20 "
        onClick={() => changeBackgroundVideo(video)}
      >
        <video
          className="w-full h-full object-cover rounded-xl" 
          src={video.src}
          loop
          muted
        ></video>
      </div>
    ))}
  </div>
</div>
      
      </div>
      <div className='mb-8'>
      <LatestReleased/>
      </div>
      
    </>
  );
};

export default Home;
