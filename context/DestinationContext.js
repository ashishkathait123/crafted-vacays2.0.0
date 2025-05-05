"use client";
import { createContext, useContext, useState } from 'react';

// Create context
const DestinationContext = createContext();

// Context provider component
export function DestinationProvider({ children }) {
  const [destinationName, setDestinationName] = useState('');
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to update destination
  const updateDestination = (name, data) => {
    setDestinationName(name);
    setDestinationData(data);
  };

  // Function to fetch destination data
  const fetchDestination = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/destinations/${slug}`);
      const data = await response.json();
      updateDestination(data.name, data);
    } catch (error) {
      console.error('Error fetching destination:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DestinationContext.Provider
      value={{
        destinationName,
        destinationData,
        loading,
        updateDestination,
        fetchDestination
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
}

// Custom hook to use the context
export function useDestination() {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error('useDestination must be used within a DestinationProvider');
  }
  return context;
}