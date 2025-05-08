'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode } from 'swiper/modules';

import ReviewCard from '@/components/ui/cards/ReviewCard';
import CustomerTestimonials from './CustomerTestimonials';
const dummyReviews = [
  {
    name: 'Karthik Ramalingam',
    review: 'We had a fantastic trip to Thailand with Dimak Tours...',
    image: '/images/d3.jpg',
  },
  {
    name: 'Dinesh Dharmaraj',
    review: 'We enjoyed our Thailand trip by Dimaak Chennai team...',
    image: '/images/d8.jpg',
  },
  {
    name: 'Vikas Krishnamurthy',
    review: 'Today was the last day of my 10 day trip to Thailand...',
    image: '/images/d2.jpg',
  },
];

const ReviewCarousel = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.testimonialSwiper = swiperRef.current;
    }
  }, []);

  return (
    <section className="relative py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
        
        {/* Static Section */}
        <CustomerTestimonials />

        {/* Swiper Carousel */}
        <div
          className="relative max-h-[500px] overflow-hidden group"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop?.()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start?.()}
        >
          {/* Top Fade */}
          <div className="absolute top-0 left-0 w-full h-24 z-10 pointer-events-none bg-gradient-to-b from-white dark:from-gray-950 to-transparent" />

          <Swiper
            direction="vertical"
            loop
            slidesPerView={3}
            spaceBetween={30}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            allowTouchMove={false}
            freeMode
            modules={[Autoplay, FreeMode]}
            className="h-[500px] z-0"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {[...dummyReviews, ...dummyReviews].map((review, index) => (
              <SwiperSlide key={index}>
                <div className="px-4">
                  <ReviewCard {...review} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
