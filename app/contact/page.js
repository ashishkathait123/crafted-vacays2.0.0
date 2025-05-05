// app/contact/page.jsx
"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import Map components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Animation variants
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom },
  }),
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ContactUs() {
  // Fix Leaflet CSS (must be loaded client-side)
  useEffect(() => {
    import('leaflet/dist/leaflet.css');
  }, []);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Form */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md h-full transition-colors duration-300">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              className="w-full lg:w-1/2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              
              {[
                {
                  icon: '🕒',
                  title: 'Hours',
                  content: 'Monday - Friday: 9 AM - 6 PM\nSaturday - Sunday: Closed',
                },
                {
                  icon: '📞',
                  title: 'Phone',
                  content: '+1 (234) 567-8900',
                  link: 'tel:+12345678900',
                },
                {
                  icon: '✉️',
                  title: 'Email',
                  content: 'info@travelcraft.com',
                  link: 'mailto:info@travelcraft.com',
                },
                {
                  icon: '📍',
                  title: 'Address',
                  content: '123 Travel Street\nAdventure City, TC 12345',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 mb-6"
                  variants={fadeUpVariant}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={sectionVariant}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Our Location
            </h2>
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
              {/* Only render map on client-side */}
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={[28.6139, 77.209]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[28.6139, 77.209]}>
                    <Popup>
                      TravelCraft Headquarters <br /> New Delhi, India
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}