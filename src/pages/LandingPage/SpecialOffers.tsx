// src/pages/LandingPage/SpecialOffers.tsx
// This file contains the SpecialOffers component for the landing page.

import React from 'react'; // Importing React library

// SpecialOffers component definition
const SpecialOffers: React.FC = () => {
  // Coordinates for Hope Medicos
  const destination = "29.141003,75.733547";

  // Function to handle Locate Us button click
  const handleLocateClick = () => {
    // Build the Google Maps navigation URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open it in a new tab (or app on mobile)
    window.open(mapsUrl, "_blank");
  };

  return (
    // Special offers section container with Tailwind CSS classes and id
    <section id="offers" className="py-16 bg-[#F6ECDD] text-center px-4">
      {/* Section title */}
      <h2 className="text-4xl font-bold">Special Offers</h2>
      {/* Section tagline */}
      <p className="mt-4 text-lg text-gray-600">Exclusive deals on premium healthcare products.</p>
      {/* Offers grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prescription Medicines offer */}
        <div className="p-8 border rounded-lg bg-white">
          <h3 className="text-2xl font-bold">Prescription Medicines</h3>
          <p className="mt-4 text-4xl font-bold text-blue-500">18% OFF</p>
          <p className="mt-4 text-gray-600">Get 18% off on all prescription medicines with a minimum purchase of ₹999. Limited time offer!</p>
          <button onClick={handleLocateClick} className="mt-8 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Shop Now</button>
        </div>
        {/* Wellness Products offer */}
        <div className="p-8 border rounded-lg bg-white">
          <h3 className="text-2xl font-bold">Wellness Products</h3>
          <p className="mt-4 text-4xl font-bold text-blue-500">Buy 2 Get 1 Free</p>
          <p className="mt-4 text-gray-600">Purchase any two wellness products and get the third one free! Mix and match your favorites.</p>
          <button onClick={handleLocateClick} className="mt-8 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; // Exporting the SpecialOffers component
