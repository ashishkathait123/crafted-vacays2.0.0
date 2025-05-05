"use client";
import Link from 'next/link';
import { FaShoppingBag } from 'react-icons/fa';

export default function CTAButton({ isScrolled }) {
  return (
    <div className="flex items-center space-x-4">
      <Link 
        href="/cart" 
        className={`text-xl ${isScrolled ? 'text-black' : 'text-white'}`}
      >
        <FaShoppingBag />
      </Link>
      <Link
        href="/contact-us"
        className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
      >
        Contact Us
      </Link>
    </div>
  );
}