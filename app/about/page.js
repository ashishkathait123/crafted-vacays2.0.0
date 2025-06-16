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

  const images = [
    { src: '/images/about/beach.png', alt: 'Couple enjoying sunset at Santorini' },
    { src: '/images/about/mountain.png', alt: 'Bungalow over crystal-clear Maldives waters' },
    { src: '/images/about/travelers.png', alt: 'Group hiking in Swiss Alps' }
  ];

  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300 min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2 w-full flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-2 gap-6 relative max-w-lg">
              <motion.div
                className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ duration: 0.4 }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-lg">Santorini Dreams</span>
                </div>
              </motion.div>

              <motion.div
                className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ duration: 0.4 }}
                initial={{ y: 70, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ margin: "-50px" }}
              >
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={600}
                  height={900}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-lg">Maldives Escape</span>
                </div>
              </motion.div>

              <motion.div
                className="relative h-56 w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all lg:absolute lg:-bottom-8 lg:-right-8 hidden lg:block"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.4 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
              >
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  width={500}
                  height={600}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-lg">Alpine Adventure</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -left-6 hidden lg:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-400/20">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="0.5"/>
                  <path d="M16 12L12 8M16 12L12 16M16 12H8M12 8L8 12M12 8V16M12 16L16 12M12 16H16" stroke="currentColor" strokeWidth="0.8"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 w-full text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Crafting Unforgettable</span><br />Travel Experiences
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              At <strong>Crafted Vacays</strong>, we don&apos;t just plan trips - we design <span className="text-orange-500 font-medium">life-changing adventures</span>. Our expert team handpicks every destination, activity, and accommodation to create <span className="underline decoration-orange-400">Instagram-worthy moments</span> you&apos;ll cherish forever.
            </motion.p>

            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 dark:text-gray-300 font-medium">4.9/5 from 2.4k+ travelers</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 italic">
                &quot;Crafted Vacays planned our honeymoon and it was absolute perfection! Every detail was curated for the ultimate experience.&quot; - @WanderlustCouple
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: 25, label: 'K+ Happy Explorers', icon: '👋' },
                { value: 300, label: 'Bucket-List Destinations', icon: '✈️' },
                { value: 29, label: 'Years of Expertise', icon: '🏆' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-orange-500 mb-1">
                    {startCount && <CountUp end={stat.value} duration={3} />}+
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="inline-block w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 flex items-center gap-6 shadow-lg hover:shadow-xl transition-all max-w-2xl mx-auto lg:mx-0">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Ready for Your Next Adventure?
                  </h3>
                  <p className="text-white/90">Let our experts craft your perfect getaway</p>
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
