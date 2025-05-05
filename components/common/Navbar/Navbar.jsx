"use client";
import { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <DesktopNav />
      <MobileNav 
        isMenuOpen={mobileMenuOpen} 
        setIsMenuOpen={setMobileMenuOpen} 
      />
    </>
  );
}