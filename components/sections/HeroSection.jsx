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
      className="relative py-20 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImages[currentImage]})` }}
    >
      <div className="absolute inset-0 bg-white/0 dark:bg-black/60 z-0 transition-colors duration-500" />

      {/* Floating Elements */}
      <div className="hidden xl:block relative z-10">
        <motion.div
          className="absolute left-10 top-[15%]"
          animate={{ y: ["0%", "-10%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/bg/Ballon-1.webp" alt="Balloon" width={110} height={150} />
        </motion.div>
        <motion.div
          className="absolute right-10 top-[20%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/images/bg/star.webp" alt="Star" width={70} height={70} />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white">Explore Our Top Destinations</h2>
        <p className="text-lg text-white/90 mt-2">Find the perfect tour for your next adventure.</p>
      </motion.div>

      {/* Destination Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mt-32"
      >
        <DestinationCard />
      </motion.div>
    </div>
  );
};

export default HeroSection;
