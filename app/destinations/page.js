'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReviewCarousel from '@/components/sections/ReviewCarousel';
import DestinationCards from '@/components/ui/cards/DestinationCards';

const AllDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    const fetchData = async () => {
      const { fetchDestinationsFromWP } = await import('@/lib/api/destinations');
      const data = await fetchDestinationsFromWP();
      setDestinations(data);
      setCurrentImages(data.map((d) => d.images?.[0] || '/images/n1.jpg'));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prevImages) =>
        prevImages.map((img, i) => {
          const images = destinations[i]?.images || ['/images/d3.jpg'];
          const currentIndex = images.indexOf(img);
          return images[(currentIndex + 1) % images.length];
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [destinations]);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  const filteredDestinations = destinations.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero / Breadcrumb */}
      <div
        className="bg-cover bg-center py-20 text-white relative"
        style={{ backgroundImage: 'url(/images/d8.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 container mx-auto text-center">
          <h3 className="text-4xl font-bold">Destination</h3>
          <div className="mt-4">
            <Link href="/" className="underline hover:text-orange-500">
              Home
            </Link>
            <span className="mx-2">//</span>
            <span>Destination</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto mt-10 px-4">
        <input
          type="search"
          placeholder="Search for location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Destination Cards */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((dest, i) => (
              <DestinationCards
                key={dest.id || `${dest.slug}-${i}`}
                title={dest.title}
                slug={dest.slug}
                image={currentImages[i]}
                tours={dest.tours}
                departures={dest.departures}
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
