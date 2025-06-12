'use client';

import React, { useEffect, useState } from 'react';
import { useDestination } from '@/context/DestinationContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/constants';
import { MapPin } from 'lucide-react';
import CountryPackage from '../ui/sliders/CountryPackage';
const DestinationDetails = ({ parentName }) => {
  const { setDestinationName } = useDestination();
  const [states, setStates] = useState([]);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDestinationName(parentName);
    fetchStates();
    fetchRelatedTours();
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

  const fetchRelatedTours = async () => {
    try {
      const res = await fetch('https://craftedvacays.grandeurnet.in/get-tours.php');
      const data = await res.json();
      const filteredTours = data.tours.filter(
        (tour) => tour.country?.toLowerCase() === parentName.toLowerCase()
      );
      setRelatedTours(filteredTours);
    } catch (err) {
      console.error('Failed to load related tours:', err);
      setRelatedTours([]);
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
      <motion.div variants={fadeInUp} className="py-8 px-4 md:px-16 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary">Explore States in {parentName}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover unforgettable travel destinations, adventure spots, and cultural escapes across the beautiful states of {parentName}.
        </p>
      </motion.div>

      <motion.section variants={fadeInUp} className="py-10 px-4 md:px-16 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {states.map((state) => (
            <motion.div
              key={state.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-yellow-400/30"
            >
              <Link
                href={`/destinations/${parentName.toLowerCase()}/${state.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={`https://craftedvacays.grandeurnet.in/${state.image}`}
                    alt={state.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-inner border border-white/20">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-300" />
                        {state.name}
                      </h3>
                      <p className="text-sm text-gray-200 mt-1">
                        Tap to explore more about {state.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Related Tour Packages */}
     <CountryPackage countryFilter={parentName} />

    </motion.div>
  );
};

export default DestinationDetails;
