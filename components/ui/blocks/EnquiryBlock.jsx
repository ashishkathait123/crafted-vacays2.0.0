'use client';
import React from 'react';

const EnquiryBlock = ({ title, description, buttonText, buttonLink, imageSrc, imageAlt }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-6 rounded-xl overflow-hidden bg-[#c84d28c7] px-4 py-8">
      {/* Text Section */}
      <div className="md:col-span-4 lg:px-8 space-y-4">
        <h2 className="text-white text-3xl font-bold">{title}</h2>
        <p className="text-white text-lg">{description}</p>
        <a href={buttonLink} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
            {buttonText}
          </button>
        </a>
      </div>

      {/* Image Section */}
      <div className="md:col-span-4">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover rounded-lg"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default EnquiryBlock;
