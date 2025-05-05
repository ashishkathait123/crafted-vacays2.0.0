"use client";
import { FaFacebookF, FaTwitter, FaSkype, FaLinkedin } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className="flex gap-3">
      <a 
        href="#" 
        className="text-white hover:text-orange-500 transition-colors"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </a>
      <a 
        href="#" 
        className="text-white hover:text-orange-500 transition-colors"
        aria-label="Twitter"
      >
        <FaTwitter />
      </a>
      <a 
        href="#" 
        className="text-white hover:text-orange-500 transition-colors"
        aria-label="Skype"
      >
        <FaSkype />
      </a>
      <a 
        href="#" 
        className="text-white hover:text-orange-500 transition-colors"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
    </div>
  );
}