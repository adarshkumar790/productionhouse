import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
  const [language, setLanguage] = useState<'en' | 'hn' | 'guj'>('en'); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [navMenuOpen, setNavMenuOpen] = useState(false); 

  const handleLanguageChange = (lang: 'en' | 'hn' | 'guj') => { 
    console.log('Language changed to:', lang);
    setLanguage(lang); 
    setMenuOpen(false); 
  };

  return (
    <header className="flex justify-between items-center pl-8 pr-12 pb-2 pt-2 bg-gradient-to-r from-red-700/100 via-transparent to-red-800/100 bg-z-10">
      
      <div className="text-xl font-bold">
        <Image src="/logo.png" height={40} width={40} alt='' />
      </div>

      
      <div className="flex items-center space-x-6">
        
        <div className="relative">
          <button
            className="hover:underline"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {language === 'en' ? 'English' : language === 'hn' ? 'Hindi' : 'Gujarati'}
          </button>
          {menuOpen && (
            <div className="absolute right-0 shadow-lg rounded z-20">
              <button
                className="block px-4 py-2 hover:bg-red-900 hover:rounded text-red-600 w-full text-left"
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button
                className="block px-4 py-2 hover:bg-red-900 hover:rounded text-blue-900 text-red-600 w-full text-left"
                onClick={() => handleLanguageChange('hn')}
              >
                Hindi
              </button>
              <button
                className="block px-4 py-2 hover:bg-red-900 hover:rounded text-blue-900 text-red-600 w-full text-left"
                onClick={() => handleLanguageChange('guj')}
              >
               Gujrat
              </button>
            </div>
          )}
        </div>
        <button className="hover:underline">Sign in</button>
        <button
          className="flex items-center justify-center w-8 h-8 hover:bg-gray-200"
          onClick={() => setNavMenuOpen(!navMenuOpen)}
        >
          ☰
        </button>
      </div>

      
      {navMenuOpen && (
        <div className="absolute top-14 right-0   shadow-md z-20">
          <nav className="flex flex-col items-start space-y-2 p-4">
            <Link href='/'
              className="text-lg hover:bg-red-900 hover:rounded hover:p-1   text-red-500"
              
            >
              Home
            </Link>
            <Link href="/movie"
              className="text-lg hover:bg-red-900 hover:rounded hover:p-1 text-red-500"
              
            >
              Movies
            </Link>
            <Link href="/webseries"
              className="text-lg hover:bg-red-900 hover:rounded hover:p-1 text-red-500"
            >
              Web Series
            </Link>
            <Link href="/music"
              className="text-lg hover:bg-red-900 hover:rounded hover:p-1 text-red-500"
            
            >
              Music
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
