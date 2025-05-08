'use client';
import { createContext, useContext, useState } from "react";

const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [destinationName, setDestinationName] = useState("");

  return (
    <DestinationContext.Provider value={{ destinationName, setDestinationName }}>
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error("useDestination must be used within a DestinationProvider");
  }
  return context;
};
