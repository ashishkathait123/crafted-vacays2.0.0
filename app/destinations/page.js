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
  const [filter, setFilter] = useState('all');
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
        const enhancedData = data.destinations.map((country) => {
          let type = 'cultural';
          let popularity = 3;
          const name = country.name?.toLowerCase() || '';

          if (name.includes('indonesia')) {
            type = 'beach';
          } else if (name.includes('india')) {
            type = ['mountain', 'cultural'][Math.floor(Math.random() * 2)];
            popularity = 4 + Math.floor(Math.random() * 2); // 4 or 5
          }

          return {
            ...country,
            type,
            popularity,
          };
        });
        setCountries(enhancedData);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  const filteredCountries = countries.filter((country) => {
    const name = country?.name?.toLowerCase() || '';
    const matchesSearch = name.includes(searchQuery.toLowerCase());

    if (searchQuery && !matchesSearch) return false;

    switch (filter) {
      case 'beach':
        return country.type === 'beach';
      case 'mountain':
        return country.type === 'mountain';
      case 'cultural':
        return country.type === 'cultural';
      case 'popular':
        return country.popularity >= 4;
      case 'all':
      default:
        return true;
    }
  });

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center py-32 text-white relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url(/images/destinations/d.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <motion.div
          className="relative z-10 container mx-auto text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg">Explore Our Destinations</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover your perfect getaway from breathtaking beaches to majestic mountains
          </p>
          <div className="mt-4">
            <Link href="/" className="underline hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange-300">Destinations</span>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 py-12 -mt-16 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search for country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="w-full md:w-auto flex flex-wrap gap-2 justify-center md:justify-end">
              {['all', 'popular',  'mountain', 'cultural'].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    if (f === 'all') setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {filteredCountries.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">No destinations found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 60 }}
              animate={controls}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredCountries.map((country) => (
                <DestinationCards
                  key={country.id}
                  title={country.name}
                  slug={country.name.toLowerCase().replace(/\s+/g, '-')}
                  image={`https://craftedvacays.grandeurnet.in/${country.image}`}
                  Destinatons={country.states?.length || 0}
                  departures={
                    country.states?.reduce((total, state) => total + (state?.cities?.length || 0), 0) || 0
                  }
                  popularity={country.popularity}
                  type={country.type}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-orange-500 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect vacation tailored just for you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Our Travel Experts
          </Link>
        </div>
      </div>

      <ReviewCarousel />
    </div>
  );
};

export default AllDestinationsPage;
