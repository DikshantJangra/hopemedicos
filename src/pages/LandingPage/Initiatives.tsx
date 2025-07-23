// src/pages/LandingPage/Initiatives.tsx
// This file contains the Initiatives component for the landing page.

import React from 'react'; // Importing React library
import { FaHeartbeat, FaLeaf, FaGraduationCap } from 'react-icons/fa'; // Importing icons from react-icons

// Initiatives component definition
const Initiatives: React.FC = () => {
  return (
    // Initiatives section container with Tailwind CSS classes and id
    <section id="initiatives" className="py-16 text-center px-4">
      {/* Section title */}
      <h2 className="text-4xl font-bold">Our Initiatives</h2>
      {/* Section description */}
      <p className="mt-4 text-lg text-gray-600">Pioneering healthcare solutions for a better tomorrow.</p>
      {/* Initiatives grid */}
      <div className="mt-12 flex flex-col md:flex-row flex-wrap justify-center gap-8">
        {/* SwasthyaSync Initiative */}
        <div className="relative group flex flex-row items-center bg-white rounded-2xl shadow p-6 md:p-8 max-w-md w-full overflow-hidden">
          <div className="flex-1">
            <h3 className="font-bold text-2xl md:text-3xl mb-2 text-left">Swāsthya Sync</h3>
            <div className="text-gray-600 text-base md:text-lg leading-tight text-left">
              <div>A health initiative -</div>
              <div>Launching an intelligence platform</div>
              <div>SwasthyaSync – an initiative by Hope Medicos</div>
              <div>To track, sync and optimise your health!</div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center justify-center">
            <FaHeartbeat className="text-blue-500 text-7xl drop-shadow-lg" />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
            <span className="text-white text-2xl font-bold mb-4">Coming soon</span>
            <a href="https://swasthyasync.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-blue-600 hover:text-white transition">Visit SwasthyaSync</a>
          </div>
        </div>
        {/* Eco-friendly initiative */}
        <div className="flex flex-row items-center bg-white rounded-2xl shadow p-6 md:p-8 max-w-md w-full">
          <div className="flex-1">
            <h3 className="font-bold text-2xl md:text-3xl mb-2 text-left">Eco-friendly</h3>
            <div className="text-gray-600 text-base md:text-lg leading-tight text-left">
              <div>Committed to sustainability -</div>
              <div>Launching green pharmacy practices</div>
              <div>Hope Medicos leads with eco-friendly initiatives</div>
              <div>For a healthier you and a greener planet!</div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center justify-center">
            <FaLeaf className="text-blue-500 text-7xl drop-shadow-lg" />
          </div>
        </div>
        {/* Education initiative */}
        <div className="flex flex-row items-center bg-white rounded-2xl shadow p-6 md:p-8 max-w-md w-full">
          <div className="flex-1">
            <h3 className="font-bold text-2xl md:text-3xl mb-2 text-left">Education</h3>
            <div className="text-gray-600 text-base md:text-lg leading-tight text-left">
              <div>Empowering through knowledge -</div>
              <div>Launching health awareness programs</div>
              <div>Hope Medicos educates for better wellness</div>
              <div>Stay informed, stay healthy with us!</div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center justify-center">
            <FaGraduationCap className="text-blue-500 text-7xl drop-shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initiatives; // Exporting the Initiatives component
