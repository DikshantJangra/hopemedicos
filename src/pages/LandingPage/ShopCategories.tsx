// src/pages/LandingPage/ShopCategories.tsx
// This file contains the ShopCategories component for the landing page.

import React from 'react'; // Importing React library

// ShopCategories component definition
const ShopCategories: React.FC = () => {
  return (
    // Shop categories section container with Tailwind CSS classes and id
    <section id="shop" className="py-16 text-center px-4">
      {/* Section title */}
      <h2 className="text-4xl font-bold">Shop Options</h2>
      {/* Section sub-heading */}
      <p className="mt-4 text-lg text-gray-600">Explore our diverse range of healthcare products and services.</p>
      {/* Categories grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Prescription Medicine category */}
        <div className="bg-[#F6ECDD] p-8 rounded-lg">
          <p className="text-xl font-bold text-black/60">Prescription Medicine</p>
        </div>
        {/* Over-the-counter category */}
        <div className="bg-[#F6ECDD] p-8 rounded-lg">
          <p className="text-xl font-bold text-black/60">Over-the-counter</p>
        </div>
        {/* Vitamins & Supplements category */}
        <div className="bg-[#F6ECDD] p-8 rounded-lg">
          <p className="text-xl font-bold text-black/60">Vitamins & Supplements</p>
        </div>
        {/* Equipment category */}
        <div className="bg-[#F6ECDD] p-8 rounded-lg">
          <p className="text-xl font-bold text-black/60">Equipment</p>
        </div>
      </div>
    </section>
  );
};

export default ShopCategories; // Exporting the ShopCategories component