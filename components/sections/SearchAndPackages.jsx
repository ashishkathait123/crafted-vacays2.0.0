'use client';

import React, { useState } from 'react';
import SearchForm from '@/components/ui/forms/SearchForm';
import TourPackage from '../ui/sliders/TourPackageSlider';

const SearchAndPackages = () => {
  const [filters, setFilters] = useState({
    location: '',
    duration: '',
    tourType: '',
    guests: '',
    rating: [],
    language: [],
    minPrice: '',
  maxPrice: '',

  });

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  return (
    <div className="space-y-8">
      <SearchForm filters={filters} onFilterChange={handleFilterChange} />
      <TourPackage filters={filters} />
    </div>
  );
};

export default SearchAndPackages;
