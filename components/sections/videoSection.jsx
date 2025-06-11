"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/bg/bg.jpg)" }}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-4 md:top-10 left-4 md:left-10 max-w-[50%] md:max-w-none">
          <Image
            src="/images/footer/right-tree.webp"
            alt="Tree Shape"
            width={420}
            height={389}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 max-w-[50%] md:max-w-none">
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
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Ready to get started your travel camping with us
            </h3>
            <a
              href="/contact"
              className="inline-block bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-all text-sm sm:text-base"
            >
              Start Booking
            </a>
          </div>

          {/* Right Play Button */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Animated Circles */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <span className="absolute w-16 h-16 rounded-full bg-white opacity-20"></span>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <span className="absolute w-20 h-20 rounded-full bg-white opacity-10"></span>
              </motion.div>

              <button
                onClick={() => setIsOpen(true)}
                className="relative flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <FaPlay className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-2xl animate-slideInUp">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-all shadow-md"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Video */}
            <div className="relative w-full aspect-video mt-4 rounded-md overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PO_fBTkoznc?autoplay=1"
                title="Video Player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
