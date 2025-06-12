'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DescriptionBox from '../ui/blocks/DescriptionBox';
import EnquiryBlock from '../ui/blocks/EnquiryBlock';
import TourPackageCard from '../ui/cards/TourCard';
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const FirstView = () => {
  const params = useParams();
  const countrySlug = params?.slug;
  const stateSlug = params?.place;

  const [stateData, setStateData] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countrySlug || !stateSlug) {
      console.warn("Missing country/state in URL.");
      setLoading(false);
      return;
    }

    fetch('https://craftedvacays.grandeurnet.in/get-tours.php')
      .then((res) => res.json())
      .then((data) => {
        const destination = data.destinations.find(
          (d) => d.name?.toLowerCase() === countrySlug.toLowerCase()
        );

        if (!destination) {
          console.warn('Destination not found for country:', countrySlug);
          setLoading(false);
          return;
        }

        const matchedState = destination.states.find(
          (s) => s.slug?.toLowerCase() === stateSlug.toLowerCase()
        );

        if (matchedState) {
          setStateData(matchedState);
          setRelatedTours(matchedState.tours || []);
        } else {
          console.warn("State not found:", stateSlug);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching state data:', err);
        setLoading(false);
      });
  }, [countrySlug, stateSlug]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!stateData) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        State data not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img
          src={`https://craftedvacays.grandeurnet.in/${stateData.image}`}
          alt={stateData.name}
          className="rounded-2xl shadow-xl mb-8 w-full object-cover"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <h1 className="text-4xl font-bold mb-4 text-center text-primary">
          {stateData.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">
          {stateData.description}
        </p>
      </motion.div>

      {stateData.cities?.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {stateData.cities.map((city, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={`https://craftedvacays.grandeurnet.in/${city.image}`}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <DescriptionBox
          title={stateData.name}
          description={stateData.description}
          extraContent={stateData.short_description}
        />
      </motion.div>

      <motion.div className="mt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <EnquiryBlock
          title={`Explore ${stateData.name} with us!`}
          description="Reach out to plan your unforgettable journey."
          buttonText="Send Enquiry"
          buttonLink="https://wa.me/918192812557?text=Hi%20Crafted%20Vacays%2C%20I'm%20interested%20in%20this%20state."
          imageSrc="/assets/icons/thailand-cta-1.png"
          imageAlt="Promotional"
        />
      </motion.div>

      {relatedTours.length > 0 && (
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-primary">Related Tour Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTours.map((tour, idx) => (
              <TourPackageCard key={idx} tour={tour} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FirstView;
