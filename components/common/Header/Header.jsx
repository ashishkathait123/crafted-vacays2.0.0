"use client";
import { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import CurrencyDropdown from "./CurrencyDropdown";
import SocialIcons from "./SocialIcons";
import { useScrollHide } from "@/hooks/useScrollHide";

export default function Header() {
  const hideHeader = useScrollHide();

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-black text-white transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}>
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <ContactInfo />
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <CurrencyDropdown />
            <SocialIcons />
          </div>
        </div>
      </header>
      {/* Adjust height to match header height only */}
      <div className="h-10 md:h-10"></div>
    </>
  );
}