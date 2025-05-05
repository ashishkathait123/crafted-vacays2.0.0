// components/common/Footer/Footer.jsx
import FooterLinks from './FooterLinks';
import ContactInfo from './ContactInfo';
import Newsletter from './Newsletter';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/images/logos/white-logo.png" 
                alt="TravelCraft Logo" 
                className="h-10"
              />
              <span className="ml-2 text-2xl font-bold">TravelCraft</span>
            </div>
            <p className="text-gray-400 mb-4">
              Crafting unforgettable travel experiences around the globe.
            </p>
            <SocialIcons />
          </div>
          
          <FooterLinks />
          <ContactInfo />
          <Newsletter />
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TravelCraft. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}