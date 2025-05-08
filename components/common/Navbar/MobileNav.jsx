"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";
import ItineraryForm from "@/components/ui/forms/ItineraryForm";
import { useDestination } from "@/context/DestinationContext";
import { FaShoppingBag } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const [showForm, setShowForm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { theme, toggleTheme } = useTheme();
  const { destinationName } = useDestination();

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Destination",
      subLinks: [
        { label: "Destination", href: "/destinations" },
        { label: "Details", href: "/destinations/thailand" },
        { label: "India", href: "/destinations/india" },
        { label: "Abroad", href: "/destinations/abroad" },
        { label: "Neighbouring Countries", href: "/destinations/neighbouring-countries" },
      ],
    },
    {
      name: "Pages",
      subLinks: [
        { label: "About", href: "/about-us" },
      ],
    },
    { name: "Contact", href: "/contact-us" },
  ];

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black shadow-md py-4 px-6 flex justify-between items-center">
        <Link href="/">
          <img src="/images/logos/craft.webp" alt="Logo" className="h-[50px]" />
        </Link>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="text-xl text-black dark:text-white">
            <FaShoppingBag />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black dark:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Background Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white dark:bg-gray-900 z-40 p-6 transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-x-0 scale-100 opacity-100" : "-translate-x-full scale-90 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 mt-16">
          {navLinks.map((link, index) => (
            <div key={index}>
              {!link.subLinks ? (
                // Simple link
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-all block ${
                    isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  } text-black dark:text-white`}
                >
                  {link.name}
                </Link>
              ) : (
                // Dropdown link
                <div>
                  <button
                    onClick={() => handleDropdownToggle(link.name)}
                    className="flex items-center justify-between w-full text-lg font-medium py-2 text-black dark:text-white"
                  >
                    {link.name}
                    {openDropdown === link.name ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <div
                    className={`flex flex-col pl-4 gap-2 overflow-hidden transition-all ${
                      openDropdown === link.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.subLinks.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Plan Your Trip Button */}
          <button
            onClick={() => {
              setShowForm(true);
              setIsMenuOpen(false);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium mt-6"
          >
            Plan Your Trip
          </button>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="absolute left-6 bottom-24 z-10 max-w-[90%] text-white px-4">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
          {destinationName ? `Explore ${destinationName}` : "Welcome to Crafted Vacays"}
        </h1>
        <p className="text-white text-base sm:text-lg mb-4">
          Indulge in luxury with our{" "}
          {destinationName ? `Explore ${destinationName}` : "Welcome to Crafted Vacays"} tour packages. Tailored for
          perfection, explore pristine beaches, vibrant coral reefs, and exclusive resorts. Book your dream escape!
        </p>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowForm(true)}
        className="hidden sm:block fixed bottom-6 right-6 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg z-[60]"
      >
        Plan My Trip
      </button>

      {/* Itinerary Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <ItineraryForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
