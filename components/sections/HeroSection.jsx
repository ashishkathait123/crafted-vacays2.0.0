"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import DestinationCard from "@/components/ui/cards/DestinationCard";

const bgImages = [
  "/images/bg/bg.jpg",
  "/images/bg/n2.jpg",
  "/images/bg/n3.jpg",
  "/images/bg/n4.jpg",
];

const HeroSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className="relative py-32 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImages[currentImage]})` }}
    >
      {/* Enhanced overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-0" />

      {/* Floating Elements */}
      <div className="hidden xl:block relative z-10">
        <motion.div
          className="absolute left-10 top-[15%]"
          animate={{ 
            y: ["0%", "-15%", "5%", "0%"],
            x: ["0%", "5%", "-5%", "0%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/bg/Ballon-1.webp" alt="Hot air balloon" width={130} height={180} />
        </motion.div>
        
        <motion.div
          className="absolute right-10 top-[20%]"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <Image src="/images/bg/star.webp" alt="Sparkle" width={80} height={80} />
        </motion.div>
        
        <motion.div
          className="absolute left-1/4 bottom-[10%]"
          animate={{
            y: ["0%", "-5%", "0%"],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image src="/images/bg/passport.webp" alt="Passport" width={100} height={70} />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mb-16 px-4"
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
            Your Next Adventure
          </span> Awaits
        </motion.h2>
        
        <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto">
          Discover <span className="font-semibold text-amber-300">hidden gems</span> and <span className="font-semibold text-amber-300">iconic landmarks</span> with our handpicked experiences
        </p>
        
        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-pink-500 to-amber-500 rounded-full px-8 py-3 font-bold text-white shadow-lg cursor-pointer"
        >
          ✨ Start Your Journey Today
        </motion.div>
        
        {/* Static hashtag to prevent hydration errors */}
        <div className="mt-8 text-white/80 text-sm">
          <span>Tag us on your adventures! </span>
          <span className="font-medium text-amber-300">
            #BucketListDestinations
          </span>
        </div>
      </motion.div>

      {/* Destination Slider Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mt-24"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            🌎 Trending This Week
          </h3>
          <p className="text-white/80">
            The destinations travelers are loving right now
          </p>
        </div>
        <DestinationCard />
      </motion.div>
    </div>
  );
};

export default HeroSection;