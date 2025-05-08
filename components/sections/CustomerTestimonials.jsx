'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const testimonialData = [
  {
    type: 'video',
    thumbnail: '/thumbnails/video-thumb-1.jpg',
    videoUrl: 'https://youtu.be/n7xx_I4aJVw?si=3DqWaU_dhHsBvhLn',
  },
  {
    type: 'text',
    name: 'Dinesh Dharmaraj',
    image: '/images/d3.jpg',
    review: 'We enjoyed our Thailand trip by Dimaak Chennai team. Good accommodation, food & well organized!',
  },
  {
    type: 'image',
    imageUrl: '/images/d3.jpg',
  },
  {
    type: 'text',
    name: 'Kanchan Singh',
    image: '/images/d3.jpg',
    review: 'My first international trip with Dimaak was amazing! Loved the new year festivities in Thailand.',
  },
  {
    type: 'video',
    thumbnail: '/images/d3.jpg',
    videoUrl: 'https://youtu.be/i2aH11Ui95Q?si=z7cMVawLrVLmivDD',
  },
  {
    type: 'text',
    name: 'Divya Madhuchandran',
    image: '/images/d3.jpg',
    review: 'We had visited Krabi and Phuket for our honeymoon through Dimaak and loved the entire experience.',
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="relative py-16 bg-white dark:bg-gray-950">
      {/* Fade Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-b from-white dark:from-gray-950 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
        {/* LEFT SIDE — Static Text Block */}
        <div className="flex flex-col gap-4 sm:gap-6 justify-center items-start">
          <small className="text-orange-500 text-xl font-yesteryear">Our Customers Love</small>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Travel Experiences
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Discover what our valued customers have to say about their unforgettable experiences.
            Read genuine reviews and testimonials showcasing the joy and satisfaction of their
            journeys with us.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
              View More Reviews
            </button>
            <img
              src="/images/gr.svg"
              alt="Google Review"
              className="h-8"
            />
          </div>
        </div>

        {/* RIGHT SIDE — Vertical Swiper */}
        <div
          className="max-h-[500px] overflow-hidden relative group"
          onMouseEnter={() => {
            const swiper = window?.testimonialSwiper;
            swiper?.autoplay?.stop?.();
          }}
          onMouseLeave={() => {
            const swiper = window?.testimonialSwiper;
            swiper?.autoplay?.start?.();
          }}
        >
          <Swiper
            direction="vertical"
            spaceBetween={30}
            loop={true}
            speed={3000}
            allowTouchMove={false}
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            slidesPerView={2}
            onSwiper={(swiper) => {
              window.testimonialSwiper = swiper;
            }}
            className="h-[500px]"
          >
            {testimonialData.map((item, idx) => (
              <SwiperSlide key={idx}>
                {item.type === 'video' && item.videoUrl && (
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.videoUrl.split('v=')[1]}?rel=0&showinfo=0&autoplay=1&mute=1&loop=1&playlist=${item.videoUrl.split('v=')[1]}`}
                      title="Customer Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-[250px] sm:h-[280px] rounded-xl"
                    />
                  </div>
                )}
                {item.type === 'image' && (
                  <div className="h-full">
                    <img
                      src={item.imageUrl}
                      alt="Customer"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
                {item.type === 'text' && (
                  <div className="p-6 bg-orange-50 dark:bg-gray-800 rounded-md flex flex-col justify-between h-full">
                    <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100">{item.review}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-semibold text-sm sm:text-base">{item.name}</span>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
