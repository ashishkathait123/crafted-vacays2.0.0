"use client";
import { useState } from 'react';
import { motion } from 'framer-motion'; 

import Logo from '@/components/ui/Logo';
import NavItem from './NavItem';
import DestinationsDropdown from './DestinationsDropdown';
import PagesDropdown from './PagesDropdown';
import ThemeToggle from './ThemeToggle';
import CTAButton from './CTAButton';
import { useNavScroll } from '@/hooks/useNavScroll';
import ItineraryForm from '@/components/ui/forms/ItineraryForm';
import { useDestination } from '@/context/DestinationContext';

export default function DesktopNav() {
  const { isScrolled } = useNavScroll();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { destinationName } = useDestination();

  const closeDropdowns = () => setActiveDropdown(null);

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
        style={{ 
          top: isScrolled ? '0' : '40px',
          transition: 'top 0.3s ease'
        }}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          <Logo isScrolled={isScrolled} />
          
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            <NavItem 
              title="Home"
              href="/"
              isScrolled={isScrolled}
            />
            
            <NavItem
              title="Destinations"
              isScrolled={isScrolled}
              dropdown={
                <DestinationsDropdown 
                  isOpen={activeDropdown === 'Destinations'}
                  onClose={closeDropdowns}
                />
              }
              onMouseEnter={() => setActiveDropdown('Destinations')}
              onMouseLeave={closeDropdowns}
            />
            
            <NavItem
              title="Pages"
              isScrolled={isScrolled}
              dropdown={
                <PagesDropdown 
                  isOpen={activeDropdown === 'Pages'}
                  onClose={closeDropdowns}
                />
              }
              onMouseEnter={() => setActiveDropdown('Pages')}
              onMouseLeave={closeDropdowns}
            />
            
            <NavItem
              title="Contact"
              href="/contact"
              isScrolled={isScrolled}
            />
            
            <ThemeToggle isScrolled={isScrolled} />
            <CTAButton isScrolled={isScrolled} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative h-screen w-full bg-cover bg-center"
        style={{ 
          marginTop: isScrolled ? '60px' : '120px',
          backgroundImage: "url('/images/hero-bg.jpg')"
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        
        {/* Hero Content Container */}
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero Text - Left Side */}
          <div className="absolute left-4 sm:left-10 bottom-10 z-10 max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              {destinationName ? `Explore ${destinationName}` : 'Welcome to TravelCraft'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg mb-6"
            >
              {destinationName 
                ? `Discover the best of ${destinationName} with our curated travel experiences.` 
                : 'Your journey begins here with our handcrafted travel experiences worldwide.'}
            </motion.p>
          </div>

          {/* Itinerary Form - Right Middle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-1/2 right-4 sm:right-10 transform -translate-y-1/2 z-10 w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Plan Your Trip
              </h3>
              <ItineraryForm />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}