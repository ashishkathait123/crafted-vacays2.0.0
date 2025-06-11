'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReviewCarousel from '@/components/sections/ReviewCarousel';
import DestinationCards from '@/components/ui/cards/DestinationCards';

const AllDestinationsPage = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch('https://craftedvacays.grandeurnet.in/get-tours.php');
      const data = await res.json();
      if (data.destinations) {
        setCountries(data.destinations);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center py-20 text-white relative"
        style={{ backgroundImage: 'url(/images/d8.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 container mx-auto text-center">
          <h3 className="text-4xl font-bold">Destinations</h3>
          <div className="mt-4">
            <Link href="/" className="underline hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2">//</span>
            <span>Destinations</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto mt-10 px-4">
        <input
          type="search"
          placeholder="Search for country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Country Cards */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCountries.map((country) => (
              <DestinationCards
                key={country.id}
                title={country.name}
                slug={country.name.toLowerCase()}
                image={`https://craftedvacays.grandeurnet.in/${country.image}`}
                tours={country.states?.length || 0}
                departures={country.states?.reduce((total, state) => total + (state?.cities?.length || 0), 0) || 0}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <ReviewCarousel />
    </div>
  );
};

export default AllDestinationsPage;
