// src/pages/LandingPage/SpecialOffers.tsx
// This file contains the SpecialOffers component for the landing page.

import React from 'react'; // Importing React library

// SpecialOffers component definition
const SpecialOffers: React.FC = () => {
  // Coordinates for Hope Medicos
  // const destination = "29.141003,75.733547";

  // Function to handle Locate Us button click
  const handleLocateClick = () => {
    // Build the Google Maps navigation URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicos,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
    
    // Open it in a new tab (or app on mobile)
    window.open(mapsUrl, "_blank");
  };

  return (
    // Special offers section container with Tailwind CSS classes and id
    <section id="offers" className="py-16 bg-[#f0f6ff] text-center px-4">
      {/* Section title */}
      <h2 className="text-4xl font-bold mb-2">Special Offers</h2>
      {/* Section tagline */}
      <p className="mt-2 mb-10 text-lg text-gray-600">Exclusive deals on premium healthcare products.</p>
      {/* Offers grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prescription Medicines offer */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-bold mb-2 text-left">Prescription Medicines</h3>
          <p className="mt-4 text-4xl font-bold text-blue-500">18% OFF</p>
          <p className="mt-4 text-gray-600 text-left">Get 18% off on all prescription medicines with a minimum purchase of ₹999. Limited time offer!</p>
          <button onClick={handleLocateClick} className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Shop Now</button>
        </div>
        {/* Wellness Products offer */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-bold mb-2 text-left">Wellness Products</h3>
          <p className="mt-4 text-4xl font-bold text-blue-500">Buy 2 Get 1 Free</p>
          <p className="mt-4 text-gray-600 text-left">Purchase any two wellness products and get the third one free! Mix and match your favorites.</p>
          <button onClick={handleLocateClick} className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; // Exporting the SpecialOffers component
