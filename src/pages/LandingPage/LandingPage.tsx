// src/pages/LandingPage/LandingPage.tsx
// This file contains the main LandingPage component.

import React from 'react'; // Importing React library
import Header from './Header'; // Importing Header component
import Hero from './Hero'; // Importing Hero component
import Initiatives from './Initiatives'; // Importing Initiatives component
import SpecialOffers from './SpecialOffers'; // Importing SpecialOffers component
import ShopCategories from './ShopCategories'; // Importing ShopCategories component
import Footer from './Footer'; // Importing Footer component
// import './LandingPage.css'; // Importing CSS for the landing page

// LandingPage component definition
const LandingPage: React.FC = () => {
  return (
    // Main container for the landing page
    <div className="landing-page">
      <Header /> {/* Rendering Header component */}
      <Hero /> {/* Rendering Hero component */}
      <Initiatives /> {/* Rendering Initiatives component */}
      <SpecialOffers /> {/* Rendering SpecialOffers component */}
      <ShopCategories /> {/* Rendering ShopCategories component */}
      <Footer /> {/* Rendering Footer component */}
    </div>
  );
};

export default LandingPage; // Exporting the LandingPage component
