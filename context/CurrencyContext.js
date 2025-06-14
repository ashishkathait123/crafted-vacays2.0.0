"use client";

import { createContext, useContext, useState } from "react";

// ✅ Updated exchange rates (as of June 2025; adjust regularly or use API)
const exchangeRates = {
  INR: { rate: 1, symbol: "₹" },             // Base currency
  USD: { rate: 1 / 83.1, symbol: "$" },      // 1 INR ≈ 0.01203 USD
  EUR: { rate: 1 / 89.2, symbol: "€" },      // 1 INR ≈ 0.0112 EUR
  GBP: { rate: 1 / 104.5, symbol: "£" },     // 1 INR ≈ 0.0095 GBP
};

const CurrencyContext = createContext(undefined);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");

  const convertPrice = (amount, fromCurrency = "INR") => {
    if (!amount) return 0;

    const cleanAmount = parseFloat(amount.toString().replace(/[^0-9.]/g, ""));
    if (isNaN(cleanAmount)) {
      console.error("Invalid amount passed to convertPrice:", amount);
      return 0;
    }

    const fromRate = exchangeRates[fromCurrency]?.rate || 1;
    const toRate = exchangeRates[currency]?.rate || 1;

    const convertedAmount = (cleanAmount / fromRate) * toRate;

    return parseFloat(convertedAmount.toFixed(2));
  };

  const formatCurrency = (amount) => {
    const converted = convertPrice(amount);
    const symbol = exchangeRates[currency]?.symbol || "₹";
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
