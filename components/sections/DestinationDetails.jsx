'use client';

import React, { useEffect, useState } from 'react';
import { useDestination } from '@/context/DestinationContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  fadeInUp,
  staggerContainer,
} from '@/lib/constants';
import {
  MapPin,
  Globe,
  Plane,
  Compass,
  Mountain,
  Landmark,
} from 'lucide-react';
import CountryPackage from '../ui/sliders/CountryPackage';
import { SparklesCore } from '../ui/sparkles';
import { WavyBackground } from '../ui/wavy-background';
import ItineraryForm from '../ui/forms/ItineraryForm';

const DestinationDetails = ({ parentName }) => {
  const { setDestinationName } = useDestination();
  const [states, setStates] = useState([]);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

      setStates(matchedCountry?.states || []);
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

  const travelIcons = [Globe, Plane, Compass, Mountain, Landmark];
  const getRandomIcon = () => {
    const Icon = travelIcons[Math.floor(Math.random() * travelIcons.length)];
    return <Icon className="w-5 h-5 text-yellow-300" />;
  };

  if (loading) {
    return (
      <div className="w-full h-[40vh] flex flex-col items-center justify-center dark:text-white">
        <div className="w-10 h-10 rounded-full border-4 border-t-yellow-400 border-r-yellow-400 border-b-transparent border-l-transparent animate-spin" />
        <p className="mt-4 text-lg font-medium">Discovering {parentName} for you...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative text-gray-900 dark:text-white overflow-hidden"
    >
      {/* Background waves */}
      <div className="absolute inset-0 -z-10">
        <WavyBackground
          colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
          waveOpacity={0.03}
        />
      </div>

      {/* Sparkle header */}
      <div className="relative">
        <div className="w-full absolute top-0 h-[20vh]">
          <SparklesCore
            id="tsparticlesheader"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <motion.div
          variants={fadeInUp}
          className="py-12 px-4 md:px-16 text-center relative z-10"
        >
          <motion.h1
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
          >
            Explore {parentName}
          </motion.h1>
          <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover breathtaking destinations, hidden gems, and unforgettable adventures across {parentName}'s most beautiful states.
          </motion.p>
        </motion.div>
      </div>

      {/* States grid */}
      <motion.section
        variants={fadeInUp}
        className="py-10 px-4 md:px-16 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Compass className="text-yellow-500 animate-pulse" />
          States to Explore
          <Compass className="text-yellow-500 animate-pulse" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {states.map((state, index) => (
            <motion.div
              key={state.id || index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(234,179,8,0.1), 0 10px 10px -5px rgba(234,179,8,0.04)',
              }}
              className="relative group rounded-3xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md transition-all"
            >
              <Link
                href={`/destinations/${parentName.toLowerCase()}/${state.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="relative h-[280px]">
                  <img
                    src={`https://craftedvacays.grandeurnet.in/${state.image}`}
                    alt={state.name || 'State Image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/fallback.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        {getRandomIcon()}
                        {state.name}
                      </h3>
                      <p className="text-sm text-gray-200 mt-1 animate-pulse">
                        ✨ {Math.floor(Math.random() * 50) + 10} amazing spots waiting
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Country package slider */}
      <div className="relative py-16">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-2 rounded-full shadow-lg">
          <Plane className="text-white animate-[bounce_3s_infinite]" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="pt-10"
        >
          <CountryPackage countryFilter={parentName} />
        </motion.div>
      </div>

      {/* CTA section */}
      <motion.div
        className="py-16 px-4 text-center bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl mx-4 md:mx-16 my-16 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
          Ready for Your {parentName} Adventure?
        </h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Let us craft your perfect itinerary with exclusive deals and local insights!
        </p>
         <button
        onClick={() => setShowForm(true)}
        className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-yellow-400/30 transition-all"
      >
        Contact Our Travel Experts
      </button>

     {showForm && (
  <div className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto mt-12">
    <div className="relative w-full max-w-lg mx-auto my-auto">
      <ItineraryForm onClose={() => setShowForm(false)} />
    </div>
  </div>
)}
      </motion.div>
    </motion.div>
  );
};

export default DestinationDetails;
