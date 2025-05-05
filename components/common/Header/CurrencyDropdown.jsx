"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const currencies = ["USD", "EUR", "GBP", "INR"];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded text-sm"
        aria-expanded={isOpen}
      >
        {currency}
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
      
      {isOpen && (
        <ul className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
          {currencies.map((curr) => (
            <li key={curr}>
              <button
                onClick={() => {
                  setCurrency(curr);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                  currency === curr ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {curr}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}