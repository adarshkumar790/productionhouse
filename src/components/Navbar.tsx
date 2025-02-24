import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch,FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [language, setLanguage] = useState<"en" | "hn" | "guj">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const handleLanguageChange = (lang: "en" | "hn" | "guj") => {
    setLanguage(lang);
    setMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/90 via-black/80 to-transparent px-6 md:px-12 py-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            height={40}
            width={60}
            alt="Logo"
            className="cursor-pointer"
          />
        </div>
        <nav className="hidden md:flex space-x-8 text-lg font-inter font-medium text-[20px] leading-[24.2px] tracking-normal">
          <Link href="/" className="text-white hover:text-red-500 transition">Home</Link>
          <Link href="/movie" className="text-white hover:text-red-500 transition">Movies</Link>
          <Link href="/webseries" className="text-white hover:text-red-500 transition">Web Series</Link>
          <Link href="/music" className="text-white hover:text-red-500 transition">Music</Link>
        </nav>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="relative">
            <button
              className="font-inter font-medium text-[20px] leading-[24.2px] tracking-normal hover:underline"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {language === "en" ? "English" : language === "hn" ? "Hindi" : "Gujarati"}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-black/80 shadow-lg rounded p-2 text-white">
                <button className="block px-4 py-2 hover:bg-red-500 rounded" onClick={() => handleLanguageChange("en")}>English</button>
                <button className="block px-4 py-2 hover:bg-red-500 rounded" onClick={() => handleLanguageChange("hn")}>Hindi</button>
                <button className="block px-4 py-2 hover:bg-red-500 rounded" onClick={() => handleLanguageChange("guj")}>Gujarati</button>
              </div>
            )}
          </div>
          <button className="text-white text-xl hover:text-gray-300 transition">
            <FaSearch />
          </button>
          <button className="text-white text-xl hover:text-gray-300 transition">
            <Image src="/profile.png" alt="profile" width={30} height={30} />
          </button>
          <button className="md:hidden text-white text-2xl" onClick={() => setNavMenuOpen(!navMenuOpen)}>
            {navMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {navMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center text-white space-y-6 z-50">
          <button className="absolute top-6 right-6 text-3xl" onClick={() => setNavMenuOpen(false)}>
            <FaTimes />
          </button>
          <Link href="/" className="text-xl hover:text-red-500 transition" onClick={() => setNavMenuOpen(false)}>Home</Link>
          <Link href="/movie" className="text-xl hover:text-red-500 transition" onClick={() => setNavMenuOpen(false)}>Movies</Link>
          <Link href="/webseries" className="text-xl hover:text-red-500 transition" onClick={() => setNavMenuOpen(false)}>Web Series</Link>
          <Link href="/music" className="text-xl hover:text-red-500 transition" onClick={() => setNavMenuOpen(false)}>Music</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
