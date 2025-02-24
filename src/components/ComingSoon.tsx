'use client';

import { useState } from 'react';
import Image from 'next/image';

const movies = [
  { 
    title: 'Ticket to Paradise', 
    src: 'https://akamaividz2.zee5.com/image/upload/w_293,h_440,c_scale,f_webp,q_auto:eco/resources/0-6-4z5612057/portrait/1920x770e55118f9f45b4d4dad50c9c608213522afee0d7a2583446a8892e3f1822ece04f9380dd4f3ab4ff8afe150b9ca04a4d2.jpg',
    description: 'A divorced couple teams up for a mission to stop their lovestruck daughter from making the same mistake they once made.'
  },
  { 
    title: 'Bloody Daddy', 
    src: 'https://akamaividz2.zee5.com/image/upload/w_293,h_440,c_scale,f_webp,q_auto:eco/resources/0-6-4z5289752/portrait/ayaliplatformcreatives11920x770d3c49874d4c744ada10981c2d331574a.jpg',
    description: 'The movie showcases intense action sequences and emotional drama as he battles against all odds to protect his family.'
  },
  { 
    title: 'The Lost City', 
    src: 'https://akamaividz2.zee5.com/image/upload/w_293,h_440,c_scale,f_webp,q_auto:eco/resources/0-6-4z5193948/portrait/1920x7704889aa61e6de4a9fae4d04f726929a27.jpg',
    description: 'A reclusive romance novelist and her cover model get swept up in a kidnapping attempt that lands them in a cutthroat jungle adventure.'
  }
];

export default function ComingSoon() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <>
      <h2 className="text-sm md:text-2xl pl-2 md:pl-8 font-bold mt-12">
        Top Film Picks
      </h2>

      <div className="bg-black text-white flex flex-col mt-8 md:flex-row items-center justify-between h-auto px-6 py-8">
        {/* Carousel Section */}
        <div className="relative flex items-center justify-center space-x-4 w-full md:w-3/4">
          {/* Left Button - Corrected Position */}
          <button 
            onClick={handlePrev} 
            className="absolute -left-5 z-10 md:left-[30px] text-2xl md:text-2xl px-3 py-2  transition"
          >
            ❮
          </button>

          <div className="flex justify-center space-x-2">
            {movies.map((movie, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-300 ${
                  index === selectedIndex ? 'scale-110 border-2 border-white' : 'scale-90 border-2 opacity-60'
                }`}
              >
                <Image 
                  src={movie.src} 
                  alt={movie.title} 
                  width={200} 
                  height={360} 
                  className="rounded-lg cursor-pointer" 
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handleNext} 
            className="absolute -right-6 md:right-[10px] lg:right-[30px] text-xl md:text-2xl  px-3 py-2  transition"
          >
            ❯
          </button>
        </div>
        <div className="w-full md:w-1/4 text-left mt-6 md:mt-0 md:ml-6">
          <h2 className="text-2xl md:text-3xl font-bold">{movies[selectedIndex].title}</h2>
          <p className="mt-2 text-sm md:text-base text-gray-300">
            {movies[selectedIndex].description}
          </p>
        </div>
      </div>
    </>
  );
}
