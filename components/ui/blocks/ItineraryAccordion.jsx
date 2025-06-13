'use client';
import React, { useState, useMemo } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ItineraryAccordion = ({ itineraryString }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  // 🔥 Convert "Day 1: Explore..." into [{title, description}]
  const itineraryData = useMemo(() => {
    if (!itineraryString) return [];

    return itineraryString
      .split('|')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry, index) => {
        const match = entry.match(/^Day\s*\d*:?(.+)/i);
        const title = match ? match[1].trim() : `Day ${index + 1}`;
        return {
          title,
          description: entry,
          image: '', // Optional: You can enhance to attach day-wise image later
        };
      });
  }, [itineraryString]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Tour Plans</h2>
      {itineraryData.map((day, index) => {
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
                  {day.title}
                </span>
              </div>
              <button className="text-white dark:text-white">
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* Content */}
            {isOpen && (
              <div className="bg-white dark:bg-gray-900 px-4 py-4 border-t border-green-500">
                <p className="text-gray-700 dark:text-gray-300">{day.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItineraryAccordion;
