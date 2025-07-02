'use client';

import React, { useEffect, useState } from 'react';
import SearchForm from '@/components/ui/forms/SearchForm';
import TourPackage from '../ui/sliders/TourPackageSlider';

const SearchAndPackages = () => {
  const [filters, setFilters] = useState({
    country_name: '', // Keep key name as-is if used in filter logic
    duration_nights: '',
    tourType: '',
    guests: '',
    rating: [],
    language: [],
    minPrice: '',
    maxPrice: '',
  });

  const [availableStates, setAvailableStates] = useState([]);

  useEffect(() => {
    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        if (
          data.success &&
          Array.isArray(data.tours) &&
          Array.isArray(data.destinations)
        ) {
          // Collect all states that are used in the tours
          const usedStateIds = [
            ...new Set(data.tours.map((tour) => String(tour.state_id)).filter(Boolean)),
          ];

          const extractedStates = data.destinations.flatMap((country) =>
            (country.states || []).filter((state) =>
              usedStateIds.includes(String(state.id))
            )
          );

          const formattedStates = extractedStates.map((state) => ({
            id: state.id,
            name: state.name,
          }));

          setAvailableStates(formattedStates);
        } else {
          setAvailableStates([]);
        }
      })
      .catch((err) => {
        console.error("Tour fetch error:", err);
        setAvailableStates([]);
      });
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  return (
    <div className="space-y-8">
      <SearchForm
        filters={filters}
        onFilterChange={handleFilterChange}
        availableStates={availableStates} // pass states to SearchForm
      />
      <TourPackage filters={filters} />
    </div>
  );
};

export default SearchAndPackages;
