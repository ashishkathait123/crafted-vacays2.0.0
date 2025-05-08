"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import DestinationCard from "@/components/ui/cards/DestinationCard";
import Image from "next/image";

const bgImages = [
  "/images/bg/bg.jpg",
  "/images/bg/n2.jpg",
  "/images/bg/n3.jpg",
  "/images/bg/n4.jpg",
];

export default function DestinationGrid({ destinations }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="relative min-h-screen">
      {/* Background Container (not fixed) */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url(${bgImages[currentImageIndex]})`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Floating Animated Elements */}
        <div className="hidden xl:block relative h-full w-full">
          <motion.div
            className="absolute left-10 top-[15%] will-change-transform"
            animate={{ y: ["0%", "-10%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image 
              src="/images/bg/Ballon-1.webp" 
              alt="Balloon" 
              width={110} 
              height={150}
              priority
            />
          </motion.div>

          <motion.div
            className="absolute right-10 top-[20%] will-change-transform"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Image 
              src="/images/bg/star.webp" 
              alt="Star" 
              width={70} 
              height={70}
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 pt-20 pb-32">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white">
            Explore Our Top Destinations
          </h2>
          <p className="text-lg text-white/90 mt-2">
            Find the perfect tour for your next adventure.
          </p>
        </motion.div>

        {/* Destination Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.2 }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations?.map((destination) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}