// src/pages/LandingPage/Footer.tsx
// This file contains the Footer component for the landing page.
import React from 'react'; // Importing React library
import { BsFacebook, BsTwitterX, BsInstagram, BsWhatsapp } from 'react-icons/bs'; // Importing social media icons
import { Link } from 'react-router';

// Footer component definition
const Footer: React.FC = () => {
  return (
    // Footer container with Tailwind CSS classes, updated background color
    <footer className="bg-black text-white p-8">
      {/* Main footer content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and contact info */}
        <div className="footer-section">
          <div className="text-2xl font-bold">Hope Medicos</div>
          <p className="mt-4">Near Sarvodaya Hospital, opposite Red Cross Delhi Road, Bank Colony, Urban Estate II, Hisar, Haryana 125001</p>
          <p>admin@hopemedicos.com</p>
        </div>
        {/* Quick links */}
        <div className="footer-section">
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#home" className="hover:text-blue-500">Home</a></li>
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li> {/* Updated link to About Us page */}
            <li><a href="tel:+919812080390" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
        {/* Contact info */}
        <div className="footer-section">
          <h4 className="text-lg font-bold">Contact Info</h4>
          <p className="mt-4">Phone: <a href="tel:+919812080390" className="hover:text-blue-500">098120 80390</a></p>
          <p>Email: admin@hopemedicos.com</p>
          <p>Address: Near Sarvodaya Hospital, opposite Red Cross Delhi Road, Bank Colony, Urban Estate II, Hisar, Haryana 125001</p>
        </div>
      </div>
      {/* Social Media Icons */}
      <div className="text-center mt-8">
        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
        <div className="flex items-center justify-center gap-4 text-2xl">
          <a target="_blank" href="https://www.facebook.com/profile.php?id=61556652516460" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsFacebook /></a>
          <a target="_blank" href="https://x.com/HopeMedicos" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsTwitterX /></a>
          <a target="_blank" href="https://www.instagram.com/hope.medicos/" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsInstagram /></a>
          <a target="_blank" href="https://wa.me/919812080390?text=Hey%2C%20thanks%20for%20contacting%20Hope%20Medicos%2C%20we're%20here%20at%20your%20service..." rel="noopener noreferrer" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsWhatsapp /></a>
        </div>
      </div>
      {/* Copyright information */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2025 Hope Medicos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; // Exporting the Footer component
