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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Community Health initiative */}
        <div className="p-8 border rounded-lg">
          <div className="text-4xl flex justify-center"><FaHeartbeat /></div> {/* Using FaHeartbeat icon */}
          <h3 className="mt-4 text-2xl font-bold">Community Health</h3>
          <p className="mt-2 text-gray-600">Focuses on health challenges and initiatives.</p>
        </div>
        {/* Eco-friendly initiative */}
        <div className="p-8 border rounded-lg">
          <div className="text-4xl flex justify-center"><FaLeaf /></div> {/* Using FaLeaf icon */}
          <h3 className="mt-4 text-2xl font-bold">Eco-friendly</h3>
          <p className="mt-2 text-gray-600">Suggests a commitment to sustainability and responsible practices.</p>
        </div>
        {/* Education initiative */}
        <div className="p-8 border rounded-lg">
          <div className="text-4xl flex justify-center"><FaGraduationCap /></div> {/* Using FaGraduationCap icon */}
          <h3 className="mt-4 text-2xl font-bold">Education</h3>
          <p className="mt-2 text-gray-600">Implies providing health-related information or resources.</p>
        </div>
      </div>
    </section>
  );
};

export default Initiatives; // Exporting the Initiatives component
