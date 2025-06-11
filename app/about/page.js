"use client";

import Image from 'next/image';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoSection from '@/components/sections/videoSection';
export default function AboutUs() {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  // Sample image paths - replace with your actual image paths
  const images = [
    { src: '/images/about/travelers.png', alt: 'Group of travelers exploring' },
    { src: '/images/about/beach.png', alt: 'Beautiful beach destination' },
    { src: '/images/about/mountain.png', alt: 'Mountain adventure tour' }
  ];

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 min-h-screen">
      {/* About Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Images Section */}
          <motion.div
            className="lg:w-1/2 w-full flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4 relative max-w-md">
              {/* Main Image */}
              <motion.div
                className="relative h-48 w-full rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Floating Image (desktop only) */}
              <motion.div
                className="relative h-40 w-full rounded-xl overflow-hidden shadow-lg lg:absolute lg:-bottom-10 lg:-right-10 hidden lg:block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="lg:w-1/2 w-full text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              About TravelCraft
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              TravelCraft is your gateway to unforgettable experiences. We specialize in providing 
              curated travel packages, immersive local experiences, and tailor-made vacations around 
              the world.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { value: 25, label: 'Our Explorers' },
                { value: 300, label: 'Destinations' },
                { value: 29, label: 'Years Experience' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-3xl font-bold text-orange-500 mb-2">
                    {startCount && <CountUp end={stat.value} duration={2} />}+
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Experience Highlight */}
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all max-w-md">
                <div className="text-orange-500 dark:text-orange-400">
                  <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M13.6406 7.41602L28.0643 7.41602L28.0643 21.8397" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <path 
                      d="M7.86719 27.6133L27.8632 7.6173" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                    {startCount && <CountUp end={29} duration={2} />}+
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">Years of experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
               

      </section>
       <VideoSection />
    </main>
  );
}