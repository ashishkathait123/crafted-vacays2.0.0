"use client";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm">
      <div className="flex items-center gap-2">
        <FaPhoneAlt className="text-orange-500" />
        <span>(000) 967-237-96</span>
      </div>
      <div className="flex items-center gap-2">
        <FaEnvelope className="text-orange-500" />
        <span>touresinfo@gmail.com</span>
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-orange-500" />
        <span>290 Grand Avenue Maitland, FL 32751</span>
      </div>
    </div>
  );
}