"use client";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiClock,
  FiGlobe,
} from "react-icons/fi";

export default function SearchForm({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState({
    destination: filters.location || "",
    duration_days: filters.duration_days || "",
    duration_nights: filters.duration_nights || "",
    tourType: filters.tourType || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
  });

  useEffect(() => {
    setLocalFilters({
      destination: filters.location || "",
      duration_days: filters.duration_days || "",
      duration_nights: filters.duration_nights || "",
      tourType: filters.tourType || "",
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
    });
  }, [filters]);

  const handleChange = (field) => (e) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSearch = () => {
    onFilterChange({
      location: localFilters.destination,
      duration_days: localFilters.duration_days,
      duration_nights: localFilters.duration_nights,
      tourType: localFilters.tourType,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl shadow-2xl p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Destination */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
            placeholder="Destination"
            value={localFilters.destination}
            onChange={handleChange("destination")}
          />
        </div>

        {/* Duration */}
        <div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="number"
              min="0"
              placeholder="Days"
              className="w-full sm:w-1/2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
              value={localFilters.duration_days}
              onChange={handleChange("duration_days")}
            />
            <input
              type="number"
              min="0"
              placeholder="Nights"
              className="w-full sm:w-1/2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
              value={localFilters.duration_nights}
              onChange={handleChange("duration_nights")}
            />
          </div>
        </div>

        {/* Tour Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiGlobe className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
            value={localFilters.tourType}
            onChange={handleChange("tourType")}
          >
            <option value="">Tour Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Beach">Beach</option>
            <option value="Cultural">Cultural</option>
            <option value="Mountain">Mountain</option>
            <option value="Wildlife">Wildlife</option>
          </select>
        </div>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price (₹)"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
          value={localFilters.minPrice}
          onChange={handleChange("minPrice")}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price (₹)"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
          value={localFilters.maxPrice}
          onChange={handleChange("maxPrice")}
        />

        {/* Search Button */}
        <div className="col-span-full sm:col-span-2 lg:col-span-1 flex">
          <button
            onClick={handleSearch}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            <FiSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
