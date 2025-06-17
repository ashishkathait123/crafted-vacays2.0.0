"use client";

import { createContext, useContext, useState } from "react";

// ✅ Rates based on INR
const exchangeRates = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.01203, symbol: "$" },
  EUR: { rate: 0.0112, symbol: "€" },
  GBP: { rate: 0.0095, symbol: "£" },
};

const CurrencyContext = createContext(undefined);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR"); // Default is INR

  // ✅ Properly sanitize and convert amount
  const convertPrice = (amountInINR) => {
    if (!amountInINR) return 0;

    const cleanAmount = parseFloat(
      amountInINR.toString().replace(/[^0-9.]/g, "")
    );
    if (isNaN(cleanAmount)) return 0;

    const toRate = exchangeRates[currency]?.rate || 1;
    return parseFloat((cleanAmount * toRate).toFixed(2));
  };

  const formatCurrency = (amountInINR) => {
    const converted = convertPrice(amountInINR);
    const symbol = exchangeRates[currency]?.symbol || "₹";
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatCurrency,
        currencySymbol: exchangeRates[currency]?.symbol || "₹",
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
