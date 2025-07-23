// src/pages/AboutUs.tsx
// This file contains the About Us page component.

import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { FaHeart, FaLightbulb, FaHandshake, FaGlobe } from 'react-icons/fa'; // Importing icons for values

// AboutUs component definition
const AboutUs: React.FC = () => {
  const founderImage = "kkj.svg"; // Placeholder for founder's image

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicoss,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f0f6ff] pt-2">
      {/* Back to Home Button - Fixed on top left */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Home</Link>
      </div>

      {/* Main About Us Heading */}
      <h1 className="text-5xl font-bold text-center text-gray-800 mt-5 mb-8">About Us</h1>

      {/* Hero Section: Our Story & Mission */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Journey: Dedicated to Your Well-being</h1>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          At Hope Medicos, we believe in a healthier tomorrow for everyone. Since our inception, we have been committed to providing premium pharmaceutical care, leveraging cutting-edge technology, and delivering compassionate service. We are more than just a pharmacy; we are your trusted partner in health and wellness.
        </p>
        <p className="text-2xl font-semibold">Your Health, Our Hope.</p>
      </section>

      {/* Who We Are: Our Values & Philosophy */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">Our Guiding Principles</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-lg text-gray-700">Our operations are built upon a foundation of core values that drive every decision and interaction:</p>
            <div className="flex items-start space-x-4">
              <FaHeart className="text-blue-500 text-3xl mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Compassion & Care</h3>
                <p className="text-gray-600">We put people first. Every prescription filled, every consultation given, is done with genuine empathy and a commitment to individual well-being.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaLightbulb className="text-blue-500 text-3xl mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Excellence & Innovation</h3>
                <p className="text-gray-600">We are dedicated to providing the highest quality pharmaceutical care. We continuously integrate cutting-edge technology and best practices to ensure accuracy, safety, and efficacy.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaHandshake className="text-blue-500 text-3xl mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Integrity & Trust</h3>
                <p className="text-gray-600">Transparency, honesty, and ethical conduct are at the heart of everything we do. We strive to be a reliable and trusted resource for our community's health needs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaGlobe className="text-blue-500 text-3xl mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Community & Responsibility</h3>
                <p className="text-gray-600">Beyond dispensing medicine, we actively engage with and support our community, promoting health education and sustainable practices for a better tomorrow.</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="/FourValues.png" alt="Our Values" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Meet Our Founder: Krishan Kumar Jangra */}
      <section className="py-16 px-4 bg-[#f0f6ff]">
        <h2 className="text-4xl font-bold text-center mb-12">About Krishan Kumar Jangra</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-8">
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <img src={founderImage} alt="Krishan Kumar Jangra" className="rounded-full w-48 h-48 object-cover shadow-lg" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold">Krishan Kumar Jangra</h3>
            <p className="text-xl text-gray-700 mb-4">Founder</p>
            <blockquote className="text-lg italic text-gray-800 border-l-4 border-blue-500 pl-4 mb-4">
              "At Hope Medicos, my vision was to create a place where health is nurtured with genuine care and accessible solutions. We are committed to being more than just a pharmacy; we are a pillar of health and hope for our community."
            </blockquote>
            <p className="text-gray-600">
              Krishan Kumar Jangra established Hope Medicos with a profound commitment to revolutionizing pharmaceutical care in Hisar and beyond. His leadership has fostered a culture of excellence, innovation, and unwavering dedication to patient well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Our Facility & Reach */}
      <section className="py-16 px-4 bg-[#f0f6ff]">
        <h2 className="text-4xl font-bold text-center mb-12">Your Local Partner in Health</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            Strategically located at the heart of Hisar, Hope Medicos is designed to be easily accessible, providing a welcoming and efficient environment for all your healthcare needs.
          </p>
          <p className="text-xl font-semibold mb-4">
            Hope Medicos<br/>
            NEAR SARVODAYA HOSPITAL OPP. RED CROSS DELHI ROAD,<br/>
            Hisar-125001, Haryana, India
          </p>
          <button onClick={handleGetDirections} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Visit Our Store</button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; // Exporting the AboutUs component
