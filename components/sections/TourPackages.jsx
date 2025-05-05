import TourCard from "@/components/ui/cards/TourCard";

const tours = [
  {
    id: 1,
    title: "European Wonders",
    duration: "10 Days",
    price: 1200,
    rating: 4.9,
    image: "/images/tours/europe.jpg",
  },
  // Add more tours...
];

export default function TourPackages() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}