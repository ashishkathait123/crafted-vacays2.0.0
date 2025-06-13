'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Users, ArrowRight, X } from 'lucide-react';
import DescriptionBox from '../ui/blocks/DescriptionBox';
import EnquiryBlock from '../ui/blocks/EnquiryBlock';
import TourPackageCard from '../ui/cards/TourCard';
import StateTourPackageSlider from '../ui/sliders/StateTourPackageSlider';

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
  const [activeTab, setActiveTab] = useState('highlights');
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (!countrySlug || !stateSlug) {
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
          console.warn('Country not found:', countrySlug);
          setLoading(false);
          return;
        }

        // 1. Try matching state
        const matchedState = destination.states.find(
          (s) => s.slug?.toLowerCase() === stateSlug.toLowerCase()
        );

        if (matchedState) {
          ('Matched as state:', matchedState.name);
          setStateData({
            ...matchedState,
            type: 'state',
            highlights: matchedState.highlights || [
              'Top natural beauty spots',
              'Rich culture and heritage',
              'Adventure and nature experiences',
            ],
            bestTimeToVisit: matchedState.bestTimeToVisit || 'October to March',
            idealDuration: matchedState.idealDuration || '5-7 days',
          });
          setRelatedTours(matchedState.tours || []);
          setLoading(false);
          return;
        }

        // 2. Try matching city in all states
        let matchedCity = null;
        let matchedParentState = null;

        for (const state of destination.states) {
          const city = state.cities?.find(
            (c) => c.slug?.toLowerCase() === stateSlug.toLowerCase()
          );
          if (city) {
            matchedCity = city;
            matchedParentState = state;
            break;
          }
        }

        if (matchedCity && matchedParentState) {
          ('Matched as city:', matchedCity.name, 'in state:', matchedParentState.name);
          setStateData({
            ...matchedCity,
            type: 'city',
            short_description: matchedCity.short_description || matchedCity.description || '',
            highlights: matchedCity.highlights || matchedParentState.highlights || [],
            bestTimeToVisit: matchedCity.bestTimeToVisit || matchedParentState.bestTimeToVisit || 'Anytime',
            idealDuration: matchedCity.idealDuration || matchedParentState.idealDuration || '2-4 days',
            parentState: matchedParentState.name,
          });
          setRelatedTours(matchedCity.tours || []);
        } else {
          console.warn('No state or city matched for slug:', stateSlug);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch destination data:', err);
        setLoading(false);
      });
  }, [countrySlug, stateSlug]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    // Smooth scroll to city details section
    setTimeout(() => {
      document.getElementById('city-details-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const closeCityDetails = () => {
    setSelectedCity(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-600">Discovering {stateSlug} for you...</p>
        </div>
      </div>
    );
  }

  if (!stateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20 px-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Destination Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find information for {stateSlug}. Please check the URL or explore our other destinations.</p>
          <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-full transition-all">
            Explore Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <motion.img
          src={`https://craftedvacays.grandeurnet.in/${stateData.image}`}
          alt={stateData.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {stateData.name}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
              {stateData.short_description || stateData.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{stateData.cities?.length || 5}+ Destinations</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">4.8/5 Traveler Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Facts Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white shadow-lg -mt-12 relative z-20 mx-4 rounded-xl overflow-hidden"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Best Time to Visit</h3>
                <p className="font-semibold">{stateData.bestTimeToVisit}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ideal For</h3>
                <p className="font-semibold">Couples, Families, Solo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ideal Duration</h3>
                <p className="font-semibold">{stateData.idealDuration}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* About Section with Tabs */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('highlights')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'highlights' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                About {stateData.name}
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'tips' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Travel Tips
              </button>
            </nav>
          </div>
          <div className="p-6 md:p-8">
            {activeTab === 'highlights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stateData.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700">{stateData.description}</p>
              </div>
            )}
            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">Best Time to Visit</h4>
                  <p className="text-gray-700">{stateData.bestTimeToVisit}</p>
                </div>
                <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">Local Customs</h4>
                  <p className="text-gray-700">Respect local traditions and dress modestly when visiting religious sites.</p>
                </div>
                <div className="bg-yellow-50/50 p-4 rounded-lg border border-yellow-100">
                  <h4 className="font-semibold text-yellow-800 mb-2">Transportation</h4>
                  <p className="text-gray-700">Taxis and local transport are readily available. Consider renting a scooter for more flexibility.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Top Cities Section */}
        {stateData.cities?.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore {stateData.name}'s Top Cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateData.cities.map((city, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg h-64"
                >
                  <img
                    src={`https://craftedvacays.grandeurnet.in/${city.image}`}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{city.description}</p>
                    <button 
                      className="mt-3 flex items-center text-white font-medium text-sm group-hover:text-primary transition-colors"
                      onClick={() => handleCitySelect(city)}
                    >
                      Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* City Details Section */}
        {selectedCity && (
          <motion.div
            id="city-details-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 relative"
          >
            <button
              onClick={closeCityDetails}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={`https://craftedvacays.grandeurnet.in/${selectedCity.image}`}
                alt={selectedCity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h2 className="text-3xl font-bold text-white">{selectedCity.name}</h2>
                <p className="text-white/90">{selectedCity.description}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">About {selectedCity.name}</h3>
                  <p className="text-gray-700 mb-6">{selectedCity.description || 'Discover the beauty and culture of this amazing city.'}</p>
                  
                  {selectedCity.highlights && selectedCity.highlights.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Highlights</h4>
                      <ul className="space-y-2">
                        {selectedCity.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Travel Information</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Location
                      </h4>
                      <p className="text-gray-700">{selectedCity.name}, {stateData.name}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Best Time to Visit
                      </h4>
                      <p className="text-gray-700">{selectedCity.bestTimeToVisit || stateData.bestTimeToVisit || 'Year-round'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Ideal Duration
                      </h4>
                      <p className="text-gray-700">{selectedCity.idealDuration || stateData.idealDuration || '2-3 days'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCity.tours && selectedCity.tours.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-6">Popular Tours in {selectedCity.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCity.tours.slice(0, 4).map((tour, index) => (
                      <TourPackageCard key={index} tour={tour} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tours Section */}
        {relatedTours.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Tours in {stateData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.slice(0, 6).map((tour, index) => (
                <TourPackageCard key={index} tour={tour} />
              ))}
            </div>
            {relatedTours.length > 6 && (
              <div className="text-center mt-10">
                <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
                  View All {relatedTours.length} Tours
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <EnquiryBlock
            title={`Ready to explore ${stateData.name}?`}
            description="Our travel experts will craft your perfect itinerary"
            buttonText="Plan My Trip"
            buttonLink="https://wa.me/918192812557?text=Hi%20Crafted%20Vacays%2C%20I'm%20interested%20in%20visiting%20this%20destination."
            imageSrc="/assets/icons/thailand-cta-1.png"
            imageAlt="Travel Experts"
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl"
            textColor="text-white"
          />
        </motion.div>

        {/* Related Destinations */}
        <StateTourPackageSlider 
          state={stateData.name} 
          excludeSlug={params?.slug}
          title={`More to explore in ${countrySlug}`}
        />
      </div>
    </div>
  );
};

export default FirstView;