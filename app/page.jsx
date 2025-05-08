"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
// import Hero2 from "@/components/sections/Hero2"; // if still useful
import SearchAndPackages from "@/components/sections/SearchAndPackages";
import VideoSection from "@/components/sections/videoSection";
import CustomerTestimonials from "@/components/sections/CustomerTestimonials";
import AboutCompany from "@/components/sections/AboutCompany";
// import TopRecommendedSection from "@/app/destinations/TopRecommendedSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Sections */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <HeroSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        {/* <Hero2 /> Optional if it's part of your story */}
      </motion.div>

      {/* Tour Packages */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <section className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                Best Tour Packages
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Handpicked tours and experiences for your perfect vacation
              </p>
            </div>
            <SearchAndPackages />
            {/* <TopRecommendedSection destination="India" /> */}
            <CustomerTestimonials />
          </div>
        </section>
      </motion.div>

      {/* Video Section */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <VideoSection />
      </motion.div>

      {/* About Company */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <AboutCompany />
      </motion.div>
    </div>
  );
}
