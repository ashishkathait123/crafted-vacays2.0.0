// app/layout.jsx

import { Inter } from 'next/font/google';
import { CurrencyProvider } from "@/context/CurrencyContext";
import { DestinationProvider } from '@/context/DestinationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from "@/components/common/Footer/Footer";
import ScrollToTop from '@/components/common/ScrollToTop';
import CursorEffect from '@/components/common/CursorEffect';
import ClientWrapper from '@/components/common/ClientWrapper';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "Crafted Vacays | Explore the World",
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
              <ClientWrapper>{children}</ClientWrapper>
              <ScrollToTop />
              <Footer />
            </CurrencyProvider>
          </DestinationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
