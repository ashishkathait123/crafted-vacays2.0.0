import { Inter } from 'next/font/google';
import  {CurrencyProvider} from "@/context/CurrencyContext";
import { DestinationProvider } from '@/context/DestinationContext';

import Navbar from '@/components/common/Navbar/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import "./globals.css";
export const metadata = {
  title: "TravelCraft | Explore the World",
  description: "Discover handcrafted travel experiences with our premium tour packages",
  keywords: "travel, tours, vacation, destinations",
};
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
      <DestinationProvider>
        <ThemeProvider>
          <CurrencyProvider>
            
            <Header />
            <Navbar />
            {/* Main content area */}
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CurrencyProvider>
        </ThemeProvider>
        </DestinationProvider>
      </body>
    </html>
  );
}