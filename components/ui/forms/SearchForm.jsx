"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiMapPin, FiGlobe, FiMoon } from "react-icons/fi";

export default function SearchForm({ filters, onFilterChange, availableStates = [] }) {
  const [localFilters, setLocalFilters] = useState({
    destination: filters.country_name || "", // still using country_name key for compatibility
    duration_nights: filters.duration_nights || "",
    tourType: filters.tourType || "",
  });

  useEffect(() => {
    setLocalFilters({
      destination: filters.country_name || "",
      duration_nights: filters.duration_nights || "",
      tourType: filters.tourType || "",
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
      country_name: localFilters.destination, // key kept as-is for backend compatibility
      duration_nights: localFilters.duration_nights,
      tourType: localFilters.tourType,
    });
  };

  const nightOptions = Array.from({ length: 11 }, (_, i) =>
    i === 10 ? "10+" : `${i + 1}`
  );

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl shadow-2xl p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination Dropdown (States) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
            value={localFilters.destination}
            onChange={handleChange("destination")}
          >
            <option value="">Select Country</option>
            {availableStates.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nights Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMoon className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:text-white"
            value={localFilters.duration_nights}
            onChange={handleChange("duration_nights")}
          >
            <option value="">Nights</option>
            {nightOptions.map((night) => (
              <option key={night} value={night}>
                {night} Night{night !== "1" ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Tour Type Dropdown */}
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
            <option value="Nature Escapes">Nature Escapes</option>
            <option value="Adventure Thrills">Adventure Thrills</option>
            <option value="Cultural Journeys">Cultural Journeys</option>
            <option value="Foodie Trails">Foodie Trails</option>
            <option value="City Explorations">City Explorations</option>
            <option value="Luxury Cruises">Luxury Cruises</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-span-full sm:col-span-1 flex">
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
