"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import ItineraryForm from "@/components/ui/forms/ItineraryForm";
import { useTheme } from "@/context/ThemeContext";
import { useDestination } from "@/context/DestinationContext";
import Logo from "@/public/images/logos/craft.webp";

export default function MobileNav({ isMenuOpen, setIsMenuOpen }) {
  const [showForm, setShowForm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { destinationName } = useDestination();

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Destination",
      subLinks: [
        { label: "All Destinations", href: "/destinations" },
        { label: "India", href: "/destinations/india" },
        { label: "Kashmir", href: "/destinations/kashmir" },
        { label: "Andamans", href: "/destinations/andamans" },
        { label: "Abroad", href: "/destinations/abroad" },
        { label: "Neighbouring", href: "/destinations/neighbouring" }
      ],
    },
    {
      name: "Pages",
      subLinks: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Blog", href: "/blog" }
      ],
    },
    { name: "Contact", href: "/contact-us" },
  ];

  const handleDropdownToggle = (name) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <>
      {/* Mobile Menu Button (shown only on mobile) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Background Overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Mobile Menu Panel */}
          <div
            className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 dark:text-gray-400"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              {navLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  {!link.subLinks ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-2 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="mb-2">
                      <button
                        onClick={() => handleDropdownToggle(link.name)}
                        className="flex items-center justify-between w-full py-3 px-2 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400"
                      >
                        {link.name}
                        {openDropdown === link.name ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>

                      <div
                        className={`pl-4 overflow-hidden transition-all duration-300 ${
                          openDropdown === link.name ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        {link.subLinks.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  setShowForm(true);
                  setIsMenuOpen(false);
                }}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Plan Your Trip
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Itinerary Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close form"
            >
              <X className="w-6 h-6" />
            </button>
            <ItineraryForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}