'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ItineraryAccordion = ({ tour_plan }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  if (!Array.isArray(tour_plan) || tour_plan.length === 0) {
    return <p className="text-gray-500">No tour plan available.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Tour Plans</h2>
      {tour_plan.map((day, index) => {
        const isOpen = index === activeIndex;

        return (
          <div
            key={index}
            className={`rounded-md border ${
              isOpen ? 'border-green-500' : 'border-gray-300'
            } overflow-hidden mb-4 transition-all duration-300`}
          >
            {/* Header */}
            <div
              className={`flex justify-between items-center px-4 py-3 cursor-pointer ${
                isOpen ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded bg-green-100 text-green-700 font-semibold text-sm ${
                    isOpen && 'bg-white text-green-600'
                  }`}
                >
                  Day {index + 1}
                </span>
                <span
                  className={`font-semibold ${
                    isOpen ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {day.heading}
                </span>
              </div>
              <button className={`${isOpen ? 'text-white' : 'text-gray-500'}`}>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* Content */}
            {isOpen && (
              <div className="bg-white dark:bg-gray-900 px-4 py-4 border-t border-green-500">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <p className="text-gray-700 dark:text-gray-300 flex-1">
                    {day.description}
                  </p>
                  {day.image && (
                    <img
                      src={day.image}
                      alt={day.heading}
                      className="w-full md:w-60 h-auto rounded-md shadow-md object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItineraryAccordion;
