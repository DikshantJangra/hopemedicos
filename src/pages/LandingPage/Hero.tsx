// src/pages/LandingPage/Hero.tsx
// This file contains the Hero component for the landing page.

import React from 'react'; // Importing React library
import hmicon from '../../../public/hmicon.svg'; // Importing hmicon.svg
import { Link } from 'react-router-dom'; // Importing Link for navigation

// Hero component definition
const Hero: React.FC = () => {
  return (
    // Hero section container with Tailwind CSS classes, updated background color and id
    <section id="home" className="bg-[#F6ECDD] mt-4 pt-20 p-8 md:p-16 flex flex-col md:flex-row justify-between items-center">
      {/* Left side content */}
      <div className="max-w-lg text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Your Health, Our Hope</h1>
        {/* Sub-headline */}
        <p className="mt-4 text-lg text-gray-600">Premium pharmaceutical care with cutting-edge technology and compassionate service. Your trusted partner in health and wellness.</p>
        {/* Call to action buttons */}
        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <a href="#shop" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Shop Medicine</a>
          <Link to="/about" className="bg-gray-400 text-gray-800 px-6 py-3 rounded hover:bg-blue-300">Learn More</Link>
        </div>
      </div>
      {/* Right side placeholder for image or video */}
      <div className="w-full md:w-1/2 h-96 flex justify-center items-center">
        <img src={hmicon} alt="Hope Medicos Icon" className="h-full w-full object-contain" />
      </div>
    </section>
  );
};

export default Hero; // Exporting the Hero component