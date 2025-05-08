'use client';

import Image from 'next/image';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoSection from '../components/Home/VideoSection';
import CustomerTestimonials from './CustomerTestimonials';
const AboutUs = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  return (
    <section className="it-about-area inner-about-style pt-[60px] pb-[120px] bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Images Section */}
          <motion.div
            className="lg:w-1/2 w-full flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-wrap justify-center gap-4 relative">
              <Image
                src="/images/n3.jpg"
                alt="About Img 1"
                width={220}
                height={220}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <Image
                src="/images/n1.jpg"
                alt="About Img 2"
                width={280}
                height={320}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <Image
                src="/images/n4.jpg"
                alt="About Img 3"
                width={200}
                height={200}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 absolute bottom-[-40px] right-[-40px] hidden lg:block"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="lg:w-1/2 w-full text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
              style={{ fontFamily: 'var(--it-ff-gloss)' }}
            >
              About Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Crafted Vacays is your gateway to unforgettable experiences. We specialize in providing the most curated travel packages, immersive local experiences, and tailor-made vacations around the world.
            </p>

            {/* Counter Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-center">
              <div className="it-about-counter-text">
                <h3 className="text-4xl font-extrabold text-primary drop-shadow-lg">
                  {startCount && <CountUp end={25} duration={2} />}+
                </h3>
                <p className="text-gray-700 mt-2 dark:text-gray-200">Our Explorers</p>
              </div>
              <div className="it-about-counter-text">
                <h3 className="text-4xl font-extrabold text-primary drop-shadow-lg">
                  {startCount && <CountUp end={300} duration={2.5} />}+
                </h3>
                <p className="text-gray-700 mt-2 dark:text-gray-200">Destinations</p>
              </div>
              <div className="it-about-counter-text">
                <h3 className="text-4xl font-extrabold text-primary drop-shadow-lg">
                  {startCount && <CountUp end={29} duration={2} />}+
                </h3>
                <p className="text-gray-700 mt-2 dark:text-gray-200">Years Experience</p>
              </div>
            </div>

            {/* Experience Highlight */}
            <div className="mt-10 flex justify-center lg:justify-start">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl transition duration-300">
                <div className="text-primary">
                  <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6406 7.41602L28.0643 7.41602L28.0643 21.8397" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.86719 27.6133L27.8632 7.6173" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">
                    {startCount && <CountUp end={29} duration={2} />}+
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">years of experience.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <VideoSection />
      <CustomerTestimonials />
    </section>
  );
};

export default AboutUs;
