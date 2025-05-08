"use client";

import { createContext, useContext, useState } from "react";

// Exchange rates
const exchangeRates = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.012, symbol: "$" },
  EUR: { rate: 0.011, symbol: "€" },
  GBP: { rate: 0.009, symbol: "£" },
};

// Create context
const CurrencyContext = createContext(undefined);

// Provider
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");

  const convertPrice = (amount) => {
    if (!amount) return 0;

    const numericAmount = parseFloat(amount.toString().replace(/[^0-9.]/g, ""));
    if (isNaN(numericAmount)) {
      console.error("Invalid amount passed to convertPrice:", amount);
      return 0;
    }

    return numericAmount * (exchangeRates[currency]?.rate || 1);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        currencySymbol: exchangeRates[currency]?.symbol || "₹",
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
