"use client";
import Link from 'next/link';

export default function DestinationsDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ul
      className="absolute left-0 top-full w-56 text-left p-4 border-t-4 border-orange-500 bg-black shadow-lg transition-all duration-300"
      onMouseLeave={onClose}
    >
      {[
        { label: "All Destinations", href: "/destinations" },
        { label: "India", href: "/destinations/india" },
        { label: "Kashmir", href: "/destinations/kashmir" },
        { label: "Andamans", href: "/destinations/andamans" },
        { label: "Abroad", href: "/destinations/abroad" },
        { label: "Neighbouring", href: "/destinations/neighbouring" }
      ].map((item) => (
        <li key={item.label} className="relative">
          <Link
            href={item.href}
            className="relative flex items-center w-full pl-4 py-2 text-white transition-all duration-300 hover:pl-6 peer"
            onClick={onClose}
          >
            {item.label}
          </Link>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-orange-500 opacity-0 transition-all duration-300 peer-hover:opacity-100"></span>
        </li>
      ))}
    </ul>
  );
}