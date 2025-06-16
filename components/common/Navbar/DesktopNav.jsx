'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import ItineraryForm from '@/components/ui/forms/ItineraryForm';
import { useTheme } from '@/context/ThemeContext';
import { useDestination } from '@/context/DestinationContext';

const DesktopNav = () => {
  const [dropdown, setDropdown] = useState(null); 
  const [isSticky, setIsSticky] = useState(false);
  const { destinationName, setDestinationName } = useDestination();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight * 0.2);
    };
    window.addEventListener('scroll', handleScroll);

    // ✅ Reset destinationName only if on home and it has a value
    if (pathname === '/' && destinationName) {
      setDestinationName('');
      localStorage.removeItem('destinationName'); // Optional: if you're using localStorage
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, destinationName, setDestinationName]);

  const menus = [
    { label: 'Home', links: ['Home'] },
    {
      label: 'Destination',
      links: ['Destination', 'India', 'US', 'Neighbouring Countries'],
    },
    { label: 'Pages', links: ['About', 'Tours'] },
  ];

  const getPath = (link) => {
    switch (link) {
      case 'Home': return '/';
      case 'Destination': return '/destinations';
      case 'India': return '/destinations/india';
      case 'US': return '/destinations/US';
      case 'Destination': return '/destinations/japan'; // Example for Japan, can be dynamic
      case 'Destination': return '/destinations/italy'; // Example for Italy, can be dynamic  
      case 'Neighbouring Countries': return '/destinations/neighbouring-countries';
      case 'About': return '/about';
      case 'Tours': return '/tours';
      default: return '#';
    }
  };

  return (
    <div className="relative w-full overflow-hidden mb-10">
      {/* Header */}
      <header
        className={`fixed top-10 left-0 w-full z-[9998] transition-all duration-300 ${
          isSticky ? 'py-2 bg-white dark:bg-gray-900 shadow-md' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/">
            <Image
              src="/images/logos/craft.webp"
              alt="Crafted Vacays"
              width={120}
              height={60}
              className="h-[60px] cursor-pointer"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex space-x-6 z-50">
            {menus.map((menu, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => setDropdown(menu.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className="text-gray-900 dark:text-white font-medium px-3 py-1 flex items-center transition duration-300 z-50 rounded-md group-hover:bg-orange-500">
                  {menu.label}
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-300 ${
                      dropdown === menu.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <ul
                  className={`absolute left-0 top-full w-[260px] text-left p-6 border-t-4 border-orange-500 bg-black dark:bg-gray-800 shadow-lg origin-top transform transition-all duration-500 ease-out z-50 ${
                    dropdown === menu.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  {menu.links.map((link, i) => (
                    <li key={i} className="relative">
                      <Link
                        href={getPath(link)}
                        className="relative flex items-center w-full pl-4 py-2 text-white dark:text-white transition-all duration-300 hover:pl-6 peer"
                      >
                        {link}
                      </Link>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-orange-500 opacity-0 transition-all duration-300 peer-hover:opacity-100"></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/contact"
              className="text-gray-900 dark:text-white font-medium px-4 py-2 hover:bg-orange-500 hover:text-white transition duration-300 rounded-md"
            >
              Contact
            </Link>
          </nav>

          {/* Contact & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium"
            >
              Contact Us
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Hero Section only on Home Page */}
      {isHomePage && (
        <section className="relative h-screen overflow-auto bg-cover bg-center">
          <div className="absolute bottom-10 top-1/2 right-6 z-10 w-[400px] max-w-[90%]">
            <ItineraryForm />
          </div>
          <div className="intro absolute left-10 bottom-10 z-10 max-w-[600px] text-white">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              {destinationName ? `Explore ${destinationName}` : 'Welcome to Crafted Vacays'}
            </h1>
            <p className="text-white text-lg mb-6">
              Indulge in luxury with our{' '}
              {destinationName ? destinationName : 'crafted'} tour packages. Tailored for perfection!
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default DesktopNav;
