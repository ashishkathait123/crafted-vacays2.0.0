// app/layout.jsx
import { Inter } from 'next/font/google';
import { CurrencyProvider } from "@/context/CurrencyContext";
import { DestinationProvider } from '@/context/DestinationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from "@/components/common/Header/Header";
import Navbar from '@/components/common/Navbar/ResponsiveNav';
import Footer from "@/components/common/Footer/Footer";
import VideoBackground from '@/components/common/VideoBackground';
import ScrollToTop from '@/components/common/ScrollToTop';
import CursorEffect from '@/components/common/CursorEffect';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "TravelCraft | Explore the World",
  description: "Discover handcrafted travel experiences with our premium tour packages",
  keywords: "travel, tours, vacation, destinations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <DestinationProvider>
            <CurrencyProvider>
            <CursorEffect />

              <Header />

              {/* ✅ Hero Video Background with Navbar Overlay */}
              <div className="relative w-full h-screen overflow-hidden">
                <VideoBackground />
                <div className="absolute top-0 left-0 w-full z-20">
                  <Navbar />
                </div>
              </div>

              <main className="min-h-screen dark:bg-gray-950 bg-white transition-colors duration-300">
                {children}
              </main>
<ScrollToTop/>
              <Footer />
            </CurrencyProvider>
          </DestinationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
