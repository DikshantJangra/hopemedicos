// src/pages/LandingPage/Header.tsx
// This file contains the Header component for the landing page.

import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect hooks
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons

// Header component definition
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu
  const [scrolled, setScrolled] = useState(false); // State to track scroll position

  // Coordinates for Hope Medicos
  // const destination = "29.141003,75.733547";

  // Function to handle Locate Us button click
  const handleLocateClick = () => {
    // Build the Google Maps navigation URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicos,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
    
    // Open it in a new tab (or app on mobile)
    window.open(mapsUrl, "_blank");
  };

  // Effect to handle scroll event for blur effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { // Adjust this value as needed for when the blur effect should start
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Header container with Tailwind CSS classes, fixed position, and conditional blur
    <header className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[#F6ECDD] backdrop-blur-md bg-opacity-80 shadow-md' : 'bg-[#F6ECDD]'}`}>
      {/* Logo */}
      <div className="text-2xl font-bold">Hope Medico</div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-4">
        <a href="#home" className="text-gray-700 hover:text-blue-500">Home</a>
        <a href="#initiatives" className="text-gray-700 hover:text-blue-500">Initiatives</a>
        <a href="#offers" className="text-gray-700 hover:text-blue-500">Offers</a>
        <a href="#shop" className="text-gray-700 hover:text-blue-500">Shop Now</a>
      </nav>
      {/* CTA Button */}
      <button onClick={handleLocateClick} className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Locate Us</button>
      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <nav className={`absolute top-full left-0 w-full flex flex-col items-center md:hidden transition-all duration-300 ${scrolled ? 'bg-[#F6ECDD] backdrop-blur-md bg-opacity-80 shadow-md' : 'bg-[#F6ECDD]'}`}>
          <a href="#home" className="py-2 text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#initiatives" className="py-2 text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>Initiatives</a>
          <a href="#offers" className="py-2 text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>Offers</a>
          <a href="#shop" className="py-2 text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>Shop Now</a>
          <button onClick={handleLocateClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Locate Us</button>
        </nav>
      )}
    </header>
  );
};

export default Header; // Exporting the Header component
