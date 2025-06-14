"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaTimes, FaMapMarkerAlt, FaCampground, FaStar } from "react-icons/fa";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center bg-gradient-to-r from-blue-900/70 to-green-900/70"
      style={{ backgroundImage: "url(/images/bg/bg.jpg)" }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-4 md:top-10 left-4 md:left-10 max-w-[50%] md:max-w-none animate-float-slow">
          <Image
            src="/images/footer/right-tree.webp"
            alt="Tree Shape"
            width={420}
            height={389}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 max-w-[50%] md:max-w-none animate-float">
          <Image
            src="/images/footer/left-tree.webp"
            alt="Triangle Shape"
            width={455}
            height={400}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-3/5 text-white text-center lg:text-left">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              <span className="text-orange-400">Unforgettable</span> Camping Adventures <br />Await You!
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg mb-8 max-w-2xl"
            >
              Discover breathtaking destinations, cozy campsites, and memories that last a lifetime. Watch our adventure video to see what you're missing!
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-8 rounded-full hover:shadow-lg transition-all text-lg font-semibold shadow-md"
              >
                Book Your Adventure Now
              </motion.a>
              
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <div className="flex text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span>500+ Happy Campers</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <FaMapMarkerAlt className="text-orange-400" />
                <span>20+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <FaCampground className="text-orange-400" />
                <span>Luxury Camping</span>
              </div>
            </div>
          </div>

          {/* Right Play Button */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {/* Animated Circles */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <span className="absolute w-20 h-20 rounded-full bg-orange-400 opacity-20"></span>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <span className="absolute w-28 h-28 rounded-full bg-orange-400 opacity-10"></span>
              </motion.div>

              <div className="relative flex flex-col items-center group">
                <button
                  className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 group-hover:shadow-2xl"
                >
                  <FaPlay className="text-2xl ml-1" />
                </button>
                <span className="mt-4 text-white font-medium text-lg bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">Watch Our Story</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-gray-900 p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-4xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all shadow-lg z-10"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Video */}
            <div className="relative w-full aspect-video mt-4 rounded-lg overflow-hidden border-4 border-orange-500/30">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PO_fBTkoznc?autoplay=1"
                title="Our Amazing Camping Adventures"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-6 text-center">
              <h4 className="text-2xl font-bold text-white mb-2">Ready for Your Adventure?</h4>
              <a 
                href="/contact" 
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-8 rounded-full hover:shadow-lg transition-all text-lg font-medium mt-4"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default VideoSection;