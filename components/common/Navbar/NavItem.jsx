"use client";
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

export default function NavItem({ 
  title, 
  href, 
  dropdown, 
  isScrolled, 
  onMouseEnter, 
  onMouseLeave 
}) {
  return (
    <div 
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {href ? (
        <Link
          href={href}
          className={`font-medium px-3 py-1 flex items-center transition duration-300 rounded-md hover:bg-orange-500 hover:text-white ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          {title}
        </Link>
      ) : (
        <button
          className={`font-medium px-3 py-1 flex items-center transition duration-300 rounded-md hover:bg-orange-500 hover:text-white ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          {title}
          <FaChevronDown className="ml-2 transition-transform duration-300 group-hover:rotate-180" />
        </button>
      )}
      {dropdown}
    </div>
  );
}