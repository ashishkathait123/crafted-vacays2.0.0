'use client';

import React, { useEffect, useState } from 'react';
import { useDestination } from '@/context/DestinationContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/constants';

const DestinationDetails = ({ parentName }) => {
  const { setDestinationName } = useDestination();
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDestinationName(parentName);
    fetchStates();
  }, [parentName]);

  const fetchStates = async () => {
    try {
      const res = await fetch('https://craftedvacays.grandeurnet.in/get-tours.php');
      const data = await res.json();

      const matchedCountry = data.destinations.find(
        (dest) => dest.name.toLowerCase() === parentName.toLowerCase()
      );

      if (matchedCountry && matchedCountry.states) {
        setStates(matchedCountry.states);
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-lg">Loading states for {parentName}...</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="text-gray-800 dark:text-white"
    >
      <motion.div variants={fadeInUp} className="py-8 px-4 md:px-16">
        <h1 className="text-4xl font-bold mb-4">Explore States in {parentName}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover exciting travel destinations in various states of {parentName}.
        </p>
      </motion.div>

      <motion.section variants={fadeInUp} className="py-10 px-4 md:px-16 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {states.map((state) => (
            <motion.div
              key={state.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative group h-[300px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Link
  href={`/destinations/${parentName.toLowerCase()}/${state.slug}`}
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>

                <div className="absolute inset-0">
                  <img
                    src={`https://craftedvacays.grandeurnet.in/${state.image}`}
                    alt={state.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition duration-500" />
                </div>
                <div className="relative z-10 h-full flex items-end p-6">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                    {state.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default DestinationDetails;
