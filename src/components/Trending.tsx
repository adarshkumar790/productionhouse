// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const items = [
//   {
//     title: "Pushpa-2",
//     video: "/pushpa2.mp4",
//     year: "2024",
//     category: "Movie",
//     rating: "U/A 13+",
//     language: "Hindi",
//     genre: "Action",
//     singer: "Udit Narayan",
//     poster: "/pushpa.jpeg",
//     director: "Udit Narayan",
//     description:
//       "The thrilling sequel to Pushpa that takes you deeper into the intense world of crime, passion, and ambition.",
//   },
//   {
//     title: "Deva",
//     video: "/deva.mp4",
//     poster: "/deva.jpeg",
//     year: "2023",
//     category: "Movie",
//     rating: "U/A 13+",
//     language: "Tamil",
//     genre: "Drama",
//     description: "Deva embarks on a journey of self-discovery and redemption.",
//   },
//   {
//     title: "Baghi4",
//     video: "/baghi4.mp4",
//     poster: "/baghi4.jpeg",
//     year: "2023",
//     category: "Movie",
//     rating: "U/A 16+",
//     language: "Hindi",
//     genre: "Action, Thriller",
//     description:
//       "Get ready for the fourth installment of the high-octane action-packed saga.",
//   },
//   {
//     title: "Top Music Hits",
//     video: "/anilkapoor.mp3",
//     poster: "/pushpa.jpeg",
//     year: "2023",
//     category: "Music",
//     rating: "U/A 7+",
//     language: "English",
//     genre: "Pop",
//     description: "The top charting music hits of the year.",
//   },
//   {
//     title: "Mystery Series",
//     video: "/safira.mp4",
//     poster: "/safira.jpeg",
//     year: "2023",
//     category: "Web Series",
//     rating: "U/A 13+",
//     language: "English",
//     genre: "Thriller",
//     description: "A gripping mystery series with twists and turns.",
//   },
//   {
//     title: "Shafira",
//     video: "/safira.mp4",
//     poster: "/shafira.jpeg",
//     year: "2022",
//     category: "Movie",
//     rating: "U/A 7+",
//     language: "Hindi",
//     genre: "Family, Fantasy",
//     description: "A magical adventure that will capture your imagination.",
//   },
//   {
//     title: "Azaad",
//     video: "/Azzad.mp4",
//     poster: "/azad.jpeg",
//     year: "2024",
//     category: "Movie",
//     rating: "U/A 13+",
//     language: "Hindi",
//     genre: "Historical",
//     description:
//       "An epic journey into the struggles and triumphs of freedom fighters.",
//   },
//   {
//     title: "Satya",
//     video: "/satya.mp4",
//     poster: "/satya.jpeg",
//     year: "2023",
//     category: "Movie",
//     rating: "U/A 13+",
//     language: "Telugu",
//     genre: "Thriller",
//     description: "A gripping thriller that will keep you on the edge of your seat.",
//   },
// ];

// const Trending = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("Movie");
//   const [currentPage, setCurrentPage] = useState(1); 
//   const itemsPerPage = 5; // Number of items per page
//   const router = useRouter();

//   const handleWatchNow = (videoUrl: string) => {
//     router.push(`/watch-video?video=${encodeURIComponent(videoUrl)}`);
//   };

//   const filteredItems =
//     selectedCategory === "All"
//       ? items
//       : items.filter((item) => item.category === selectedCategory);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedItems = filteredItems.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   const handleMouseEnter = (index: number) => {
//     setHoveredIndex(index);
//     const videoElement = document.getElementById(
//       `movie-video-${index}`
//     ) as HTMLVideoElement;

//     if (videoElement) {
//       videoElement.currentTime = 0;
//       videoElement.play().catch((err) => {
//         console.error("Video play error:", err);
//       });
//     }
//   };

//   const handleMouseLeave = (index: number) => {
//     setHoveredIndex(null);
//     const videoElement = document.getElementById(
//       `movie-video-${index}`
//     ) as HTMLVideoElement;

//     if (videoElement) {
//       videoElement.pause();
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div className="bg-black text-white p-2">
//       <h2 className="text-xl font-bold mb-4">Trending</h2>

      
//       <div className="mb-4 flex justify-end">
//         <select
//           value={selectedCategory}
//           onChange={(e) => {
//             setSelectedCategory(e.target.value);
//             setCurrentPage(1); 
//           }}
//           className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600"
//         >
//           <option value="All">All</option>
//           <option value="Movie">Movies</option>
//           <option value="Music">Music</option>
//           <option value="Web Series">Web Series</option>
//         </select>
//       </div>

//       <div className="relative">
//         {/* Horizontal Scroll Container */}
//         <div className="flex space-x-4 overflow-hidden w-full justify-evenly">
//           {paginatedItems.map((item, index) => (
//             <div
//               key={index}
//               className="relative w-60 cursor-pointer"
//               onMouseEnter={() => handleMouseEnter(index)}
//               onMouseLeave={() => handleMouseLeave(index)}
//             >
//               {/* Video Thumbnail */}
//               <div className="rounded-lg flex items-center justify-center">
//                 <video
//                   id={`movie-video-${index}`}
//                   src={item.video}
//                   className={`rounded-lg w-60 h-80 object-cover ${
//                     hoveredIndex === index
//                       ? "scale-100 transition-transform duration-300"
//                       : "scale-100"
//                   }`}
//                   loop={false}
//                   muted
//                   poster={item.poster}
//                 />
//               </div>

//               {/* Details Popup on Hover */}
//               {hoveredIndex === index && (
//   <div
//     className={`absolute top-0 ${
//       index === 0
//         ? "left-0" // Slightly right for the first item
//         : index === filteredItems.length - 1
//         ? "right-12" // Slightly left for the last item
//         : "left-1/2 transform -translate-x-1/2" // Center for other items
//     } w-72 h-80 bg-gray-900 rounded-lg p-4 flex flex-col z-10`}
//   >
//     <div className="rounded-lg mb-2">
//       <video
//         src={item.video}
//         className="rounded-lg w-full h-36 aspect-video object-cover"
//         loop={false}
//         muted
//         autoPlay
//       />
//     </div>
//     <div className="mb-2">
//       <button
//         className="bg-blue-600 text-black px-4 py-1 rounded-md text-sm w-full font-bold"
//         onClick={() => handleWatchNow(item.video)}
//       >
//         Watch Full Video
//       </button>
//     </div>
//     <div className="flex justify-between text-sm text-gray-400 mb-2 font-bold">
//       <span>{item.year}</span>
//       <span>{item.title}</span>
//       <span>{item.language}</span>
//     </div>
//     <div>
//       <p className="text-xs text-gray-300">{item.description}</p>
//     </div>
//   </div>
// )}

//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 mr-2 rounded-md ${
//             currentPage === 1 ? "bg-gray-900" : "bg-gray-600"
//           }`}
//         >
//           <Image src="/left.png" alt="left" width={20} height={20}  /> 
//         </button>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-md ${
//             currentPage === totalPages ? "bg-gray-900" : "bg-gray-600"
//           }`}
//         >
//           <Image src="/right.png" alt="left" width={20} height={20}  /> 
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Trending;
