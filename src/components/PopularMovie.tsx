'use client';

import { useState } from 'react';
import Image from 'next/image';

const movies = [
  { title: 'Jawan', src: 'https://m.media-amazon.com/images/M/MV5BMDhiYWM4NTEtOTVmMC00MzU1LWI5NjctYTMyZmJlMGYxNjEzXkEyXkFqcGc@._V1_QL75_UX820_.jpg' },
  { title: 'Atlee', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Sound_of_Freedom_%28film%29_poster.jpg/220px-Sound_of_Freedom_%28film%29_poster.jpg' },
  { title: 'Thank God', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZ2dPqLEQY28YNuFGeYAByEuVgkO02vuwQ&s' },
  { title: 'Rampage', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ099rqKi49EG52g3Cpt0kv9yhwKlKD3auyhw&s' },
  { title: 'Avatar', src: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg' },
  { title: 'Inception', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ099rqKi49EG52g3Cpt0kv9yhwKlKD3auyhw&s' },
];

export default function PopularMovie() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleMovies = movies.slice(startIndex, startIndex + 5);

  const handleNext = () => {
    if (startIndex + 4 < movies.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="bg-black text-white p-6 flex items-center overflow-hidden">
      {/* Sidebar Text (1/4 width) */}
      <div className="md:w-1/3 lg:w-1/3 w-1/2 text-left">
        <h2 className="font-['Rye'] font-bold md:text-[28px] lg:text-[50px] text-[26px] md:leading-[34.5px] lg:leading-[48px] leading-[28.3px] tracking-[0px]">POPULAR MOVIE</h2>
        <button 
          onClick={handleNext} 
          className="mt-20 text-m"
        >
          DRAG TO NEXT →
        </button>
      </div>
      
      {/* Image Carousel (3/4 width) */}
      <div className="md:w-2/4 w-1/2 lg:w-3/4 flex space-x-4">
        {visibleMovies.map((movie, index) => (
          <div key={index} className="min-w-[150px] md:min-w-[200px]">
            <Image 
              src={movie.src} 
              alt={movie.title} 
              width={200} 
              height={300} 
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}