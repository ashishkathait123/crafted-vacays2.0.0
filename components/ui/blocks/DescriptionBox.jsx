'use client';
import { useState } from 'react';

const DescriptionBox = ({ title, description, extraContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-12 py-8 bg-white dark:bg-gray-900 rounded-lg shadow-md relative">
      {/* Title */}
      <div className="border-b pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Description and Extra Content */}
      <div className="text-gray-700 dark:text-gray-300 text-lg space-y-4">
        <p>{description}</p>
        {isExpanded && extraContent && <p>{extraContent}</p>}
      </div>

      {/* Expand / Collapse Toggle */}
      {extraContent && (
        isExpanded ? (
          <div className="fixed bottom-4 left-0 w-full z-40 px-4 md:px-12">
            <div className="rounded-lg shadow-md py-4 border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-6 flex-wrap bg-black/30 backdrop-blur">
              <a
                href="https://wa.me/918192812557?text=Hi%20Crafted%20Vacays%2C%20I%20am%20interested%20in%20a%20tour%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <img src="/assets/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
                Get Quote
              </a>

              <button
                onClick={toggleExpand}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                View Less
                <img
                  src="/assets/icons/arrow-right.png"
                  alt="Toggle arrow"
                  className="w-5 h-5 rotate-180 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center pt-4">
            <button
              onClick={toggleExpand}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              View More
              <img
                src="/assets/icons/arrow-right.png"
                alt="Toggle arrow"
                className="w-5 h-5 transition-transform duration-200"
              />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default DescriptionBox;
