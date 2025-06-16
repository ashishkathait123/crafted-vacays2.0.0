'use client';

import React, { useState, useEffect } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaSkype,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { useCurrency } from '@/context/CurrencyContext';
const Header = () => {
  const { currency, setCurrency } = useCurrency();
  const currencies = ['USD', 'EUR', 'GBP', 'INR'];
  const [showOptions, setShowOptions] = useState(false);
  // const [hideHeader, setHideHeader] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //       setHideHeader(true);
  //     } else {
  //       setHideHeader(false);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] bg-black text-white transition-transform duration-300`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0 px-4 py-2">
        {/* Contact Info */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-orange-500" />
            <span>(000) 967-237-96</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-orange-500" />
            <span>touresinfo@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>290 Grand Avenue Maitland, FL 32751</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden w-full flex justify-center">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center space-x-2 text-sm font-medium text-orange-500 hover:underline focus:outline-none"
            aria-expanded={showOptions}
          >
            <span>Options</span>
            {showOptions ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Currency and Social Icons */}
        <div
          className={`w-full lg:w-auto flex-col lg:flex-row lg:flex lg:items-center lg:space-x-4 space-y-2 lg:space-y-0 mt-2 lg:mt-0 ${
            showOptions ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Currency */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-orange-500 text-white border border-gray-600 px-2 py-1 rounded text-sm cursor-pointer"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur} className="text-black">
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3 text-sm">
            <a href="/images/d1.jpg" className="text-white hover:text-orange-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaSkype />
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
