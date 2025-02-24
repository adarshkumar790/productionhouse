"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define allowed category types
type Category = "Movie" | "Web Series" | "Music";

const categories: Category[] = ["Movie", "Web Series", "Music"];

const data: Record<Category, { id: number; title: string; src: string }[]> = {
  Movie: [
    { id: 1, title: "War", src: "https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Chhaava_film_poster.jpg/220px-Chhaava_film_poster.jpg" },
    { id: 2, title: "Hanuman", src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Marco_Malayalam_film.jpg/220px-Marco_Malayalam_film.jpg" },
    { id: 3, title: "Bandit", src: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Kraven_the_Hunter_%28film%29_poster.jpg/220px-Kraven_the_Hunter_%28film%29_poster.jpg" },
    { id: 4, title: "Bandit", src: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Baby_John_%28title_card%29.jpg/220px-Baby_John_%28title_card%29.jpg" },
    { id: 5, title: "992", src: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/The_Teacher_poster.jpg/220px-The_Teacher_poster.jpg" },
    { id: 6, title: "Bandit", src: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Forensic_Hindi_film_poster.jpg/220px-Forensic_Hindi_film_poster.jpg" },
    { id: 7, title: "Extra Movie 1", src: "https://upload.wikimedia.org/wikipedia/en/1/10/Don_Muthu_Swami.jpg" },
    { id: 8, title: "992", src: "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Anjaam_Pathiraa.jpg/220px-Anjaam_Pathiraa.jpg" },
    { id: 9, title: "Bandit", src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Joseph_film_poster.jpg/220px-Joseph_film_poster.jpg" },
    { id: 10, title: "Extra Movie 1", src: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Dirty_Hari.jpg/220px-Dirty_Hari.jpg" },
  ],
  "Web Series": [
    { id: 1, title: "Dark", src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Avrodh.jpg/220px-Avrodh.jpg" },
    { id: 2, title: "Money Heist", src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Paatal_Lok_poster.jpg/220px-Paatal_Lok_poster.jpg" },
    { id: 3, title: "Stranger Things", src: "https://upload.wikimedia.org/wikipedia/en/1/19/Reacher_TV_poster.jpg" },
    { id: 4, title: "Squid Game", src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Farzi.jpeg/220px-Farzi.jpeg" },
    { id: 5, title: "Peaky Blinders", src: "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Special_OPS_Poster.jpeg/220px-Special_OPS_Poster.jpeg" },
    { id: 6, title: "Breaking Bad", src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Title_screen_for_the_Netflix_series%2C_Delhi_Crime.png/220px-Title_screen_for_the_Netflix_series%2C_Delhi_Crime.png" },
    { id: 7, title: "The Boys", src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Jamtara_Sabka_Number_Ayega.jpg/220px-Jamtara_Sabka_Number_Ayega.jpg" },
    { id: 8, title: "992", src: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Bhaukaal.web_series.png/220px-Bhaukaal.web_series.png" },
    { id: 9, title: "Bandit", src: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Citadel-_Honey_Bunny.jpg/220px-Citadel-_Honey_Bunny.jpg" },
    { id: 10, title: "Extra Movie 1", src: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Sacred_Games_Title.png/250px-Sacred_Games_Title.png" },
  ],
  Music: [
    { id: 1, title: "Shape of You", src: "data:image/jpeg;base64,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"},
    { id: 2, title: "Blinding Lights", src: "data:image/jpeg;base64,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" },
    { id: 3, title: "Levitating", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_21uKW7pRdYCkkwYn3qWnSnS_AUCKii3zg&s" },
    { id: 4, title: "Save Your Tears", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIAHD6R2O5PmDoNZB89t020rwDSDlb8fLTw&s" },
    { id: 5, title: "Peaches", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bbo-VRVbfh2YeKLOowd0HeUTeh1W99gv3w&s" },
    { id: 6, title: "Industry Baby", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJujxdCiOCpyvtW8cbzRSVYSY2hjdEVNDH0A&s" },
    { id: 7, title: "Good 4 U", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9uS0In4ibhJThfT-t-Hbf61vsBEcBtd7ggg&s" },
    { id: 8, title: "992", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtxoiexSIX7FROwc_2aDogYBKCuCAigqAIdg&s" },
    { id: 9, title: "Bandit", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYPU1RF-LMwMnmtw5Wc0qm0sXCD-bujyh0g&s" },
    { id: 10, title: "Extra Movie 1", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7o-3xfDfpTacQS2ylzYEhpuLLnwp4XB749Q&s" },
  ],
};

const Top10India = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Movie");
  const [startIndex, setStartIndex] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const movieWidth = 160; // Width of one movie item including gap

  // Adjust movies per page based on screen size
  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth < 640) {
        setMoviesPerPage(3); // Mobile
      } else if (window.innerWidth < 1024) {
        setMoviesPerPage(5); // Tablet
      } else {
        setMoviesPerPage(7); // Desktop
      }
    };

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  const movies = data[selectedCategory];
  const totalMovies = movies.length;

  const nextMovies = () => {
    if (startIndex + moviesPerPage < totalMovies) {
      setStartIndex((prev) => prev + moviesPerPage);
    }
  };

  const prevMovies = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - moviesPerPage);
    }
  };

  return (
    <section className="bg-black text-white p-4 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm md:text-2xl pl-2 md:pl-8 font-bold">
          Top 10 in India - {selectedCategory}
        </h2>
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value as Category);
            setStartIndex(0);
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Carousel */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {startIndex > 0 && (
          <button
            onClick={prevMovies}
            className="absolute md:left-2 -left-4 p-4 z-10 bg-gray-900 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Movie Grid */}
        <div className="w-full overflow-hidden">
          <div
            className="flex flex-nowrap gap-4 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * movieWidth}px)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="relative flex-shrink-0 w-[140px] p-2 md:w-[160px]">
                <span className="absolute md:-bottom-2 md:-left-3 -left-3 -bottom-1 text-white text-5xl md:text-7xl font-bold drop-shadow-md z-10">
                  {movie.id}
                </span>

                {/* Movie Poster */}
                <Image
                  src={movie.src}
                  alt={movie.title}
                  width={160}
                  height={300}
                  className="w-full aspect-[3/4] border border-white shadow-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {startIndex + moviesPerPage < totalMovies && (
          <button
            onClick={nextMovies}
            className="absolute md:right-2 -right-4 z-10 p-2 bg-gray-900 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </section>
  );
};

export default Top10India;
