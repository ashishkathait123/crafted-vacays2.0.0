// components/ui/Logo.jsx
"use client";

export default function Logo({ isScrolled, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/logos/craft.webp" 
        alt="TravelCraft Logo" 
        className={`h-10 transition-all duration-300 ${isScrolled ? "opacity-90" : "opacity-100"}`}
      />
      <span className={`ml-2 text-2xl font-bold ${isScrolled ? "text-gray-800" : "text-white"}`}>
        TravelCraft
      </span>
    </div>
  );
}