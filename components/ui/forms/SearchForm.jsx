"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiCalendar, FiUsers, FiMapPin } from "react-icons/fi";

export default function SearchForm({ filters, onFilterChange }) {
  const [destination, setDestination] = useState(filters.location);
  const [date, setDate] = useState(filters.duration);
  const [travelers, setTravelers] = useState(filters.guests);

  useEffect(() => {
    setDestination(filters.location);
    setDate(filters.duration);
    setTravelers(filters.guests);
  }, [filters]);

  const handleDestinationChange = (e) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
    onFilterChange({ location: newDestination });
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onFilterChange({ duration: newDate });
  };

  const handleTravelersChange = (e) => {
    const newTravelers = parseInt(e.target.value);
    setTravelers(newTravelers);
    onFilterChange({ guests: newTravelers });
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Destination"
            value={destination}
            onChange={handleDestinationChange}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="text-gray-400" />
          </div>
          <input
            type="date"
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUsers className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={travelers}
            onChange={handleTravelersChange}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Traveler" : "Travelers"}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
          <FiSearch className="mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}
