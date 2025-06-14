"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

const Footer = () => {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const router = useRouter();

  const handleDiscoverMoreClick = () => {
    router.push("/about-us");
  };

  useEffect(() => {
    if (inView) {
      controlsLeft.start({ x: 0, opacity: 1, transition: { duration: 1 } });
      controlsRight.start({ x: 0, opacity: 1, transition: { duration: 1 } });
    }
  }, [inView]);

  return (
    <footer ref={ref} className="relative pt-32 pb-36 bg-black text-white overflow-hidden">
      {/* Background Elements - More Travel-Themed */}
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      {/* Scenic Background Images */}
      <div className="absolute left-0 top-0 opacity-20">
        <Image
          src="/images/footer/left-tree.webp"
          alt="Exotic Destination"
          width={306}
          height={323}
          priority
          className="object-cover h-full"
        />
      </div>
      <div className="absolute right-0 top-0 opacity-20">
        <Image
          src="/images/footer/right-tree.webp"
          alt="Adventure Awaits"
          width={452}
          height={497}
          priority
          className="object-cover h-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Travel Inspiration */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={controlsLeft}>
            <div className="mb-8">
              <a href="/">
                <Image
                  src="/images/logos/craft.webp"
                  alt="Wanderlust Adventures"
                  width={160}
                  height={50}
                  priority
                  className="hover:scale-105 transition-transform"
                />
              </a>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We turn travel dreams into unforgettable experiences. Discover hidden gems, luxury escapes, and authentic adventures crafted just for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-red-500 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Popular Destinations */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={controlsLeft}>
            <h3 className="text-xl font-bold mb-6 text-orange-400">Explore More:</h3>
            <ul className="space-y-3">
              <li>
                <a href="/destinations" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Trending Destinations
                </a>
              </li>
              <li>
                <a href="/tours" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  Cultural Tours
                </a>
              </li>
              <li>
                <a href="/adventures" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Adventure Packages
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
                  </svg>
                 Privacy Policy
                </a>
              </li>
              <li>
                <a href="/luxury" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Luxury Escapes
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links with Icons */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={controlsRight}>
            <h3 className="text-xl font-bold mb-6 text-orange-400">Plan Your Trip:</h3>
            <ul className="space-y-3">
              <li>
                {/* <a href="/flights" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Flight Deals
                </a> */}
              </li>
              <li>
                {/* <a href="/hotels" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Hotel Bookings
                </a> */}
              </li>
              {/* <li>
                <a href="/travel-insurance" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Travel Insurance
                </a>
              </li> */}
             
              <li>
                <a href="/contact" className="hover:text-orange-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  24/7 Support
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter with Travel Inspiration */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={controlsRight}>
            <h3 className="text-xl font-bold mb-6 text-orange-400">Get Travel Inspiration:</h3>
            <p className="text-gray-300 mb-4">
              Join our community of explorers! Get exclusive deals, travel tips, and inspiration delivered to your inbox.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Subscribe Now
              </button>
            </form>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border-l-4 border-orange-400">
              <p className="text-white font-medium">Need help planning?</p>
              <p className="text-gray-300 text-sm">Our travel experts are ready to craft your perfect itinerary.</p>
              <a href="/contact" className="text-orange-400 hover:text-orange-300 text-sm font-medium inline-block mt-2">
                Contact us today →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright with Travel Quote */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Wanderlust Adventures. All rights reserved Powered By GranderuNet.
          </p>
          <p className="text-gray-600 text-xs mt-2 italic">
            "The world is a book, and those who do not travel read only a page." - Saint Augustine
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;