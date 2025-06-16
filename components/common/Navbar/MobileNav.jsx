'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { Menu, X, Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";
import ItineraryForm from "@/components/ui/forms/ItineraryForm";
import { useDestination } from "@/context/DestinationContext";
import { useTheme } from "@/context/ThemeContext";

const menus = [
  { label: "Home", links: ["Home"] },
  {
    label: "Destination",
    links: ["Destination", "India", "US", "Neighbouring Countries"],
  },
  { label: "Pages", links: ["About", "Tours"] },
];

const getPath = (link) => {
  switch (link) {
    case "Home": return "/";
    case "Destination": return "/destinations";
    case "India": return "/destinations/india";
    case "US": return "/destinations/US";
    case "Neighbouring Countries": return "/destinations/neighbouring-countries";
    case "About": return "/about";
    case "Tours": return "/tours";
    default: return "#";
  }
};

const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { destinationName } = useDestination();
    const pathname = usePathname();
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
<div className="relative w-full overflow-hidden mb-14">
      {/* Header */}
      <header className="fixed top-12 left-0 w-full z-[9999] bg-white dark:bg-black shadow-md py-4 px-6 flex justify-between items-center">
        <Link href="/">
          <img src="/images/logos/craft.webp" alt="Logo" className="h-[50px]" />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black dark:text-white"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>
 {isHomePage && (
  <section className="relative h-screen overflow-auto bg-cover bg-center">
   
    <div className="intro absolute left-10 bottom-10 z-10 max-w-[600px] text-white">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
        {destinationName ? `Explore ${destinationName}` : 'Welcome to Crafted Vacays'}
      </h1>
      {/* <p className="text-white text-lg mb-6 ">
        Indulge in luxury with our{' '}
        {destinationName ? destinationName : 'crafted'} tour packages. Tailored for perfection!
      </p> */}
    </div>
  </section>
)}

      {/* Dimmed Background Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] bg-white dark:bg-gray-900 z-[9999] p-6 transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-x-0 scale-100 opacity-100" : "-translate-x-full scale-90 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 mt-20">
          {menus.map((menu, idx) => (
            <div key={idx}>
              <button
                onClick={() => handleDropdownToggle(menu.label)}
                className="flex items-center justify-between w-full text-lg font-medium py-2 text-black dark:text-white"
              >
                {menu.label}
                {openDropdown === menu.label ? <ChevronUp /> : <ChevronDown />}
              </button>

              <div
                className={`flex flex-col pl-4 gap-2 overflow-hidden transition-all ${
                  openDropdown === menu.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {menu.links.map((link, i) => (
                  <Link
                    key={i}
                    href={getPath(link)}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-black dark:text-white"
          >
            Contact
          </Link>

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
      </aside>

      {/* Hero Text Section */}
      

      {/* Floating Button */}
      <button
        onClick={() => setShowForm(true)}
        className="hidden sm:block fixed bottom-6 right-6 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg z-[9999]"
      >
        Plan My Trip
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <ItineraryForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
