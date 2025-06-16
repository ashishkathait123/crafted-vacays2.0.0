'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/common/Navbar/ResponsiveNav';
import VideoBackground from '@/components/common/VideoBackground';
import Header from './Header/Header';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Make sure Header is always above */}
      <div className="relative z-[10000]">
        <Header />
      </div>

      {isHomePage ? (
        <div className="relative w-full h-screen overflow-hidden">
          <VideoBackground />

          {/* Keep Navbar above video */}
          <div className="absolute top-0 left-0 w-full z-[9999]">
            <Navbar />
          </div>
        </div>
      ) : (
        <Navbar />
      )}

      <main className="min-h-screen dark:bg-gray-950 bg-white transition-colors duration-300">
        {children}
      </main>
    </>
  );
}
