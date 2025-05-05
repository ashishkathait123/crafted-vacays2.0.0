// components/ui/cards/TourCard.jsx
import Image from 'next/image';
import CTAButton from '../buttons/CTAButton';
export default function TourCard({ tour }) {
    const price = calculatePrice(tour.basePrice, tour.rating);
    
    return (
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <div className="relative">
          <Image src={tour.image} width={400} height={300} alt={tour.title} />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
            {tour.rating}-star
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold">{tour.title}</h3>
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">
              <span className="text-2xl font-bold text-orange-500">${price}</span>
              <span>/person</span>
            </div>
            <CTAButton text="Book Now" />
          </div>
        </div>
      </div>
    );
  }
  
  function calculatePrice(basePrice, rating) {
    switch(rating) {
      case 4: return basePrice * 1.2;
      case 5: return basePrice * 1.5;
      default: return basePrice;
    }
  }