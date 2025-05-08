import Link from 'next/link';

const DestinationCards
 = ({ title, slug, image, tours = 0, departures = 0 }) => (
  <div
    className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center hover:scale-105 transition-transform duration-300"
    style={{ backgroundImage: `url(${image || '/images/placeholder.jpg'})` }}
  >
    <div className="absolute inset-0 bg-black/40 transition-opacity" />
    <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 text-sm rounded">
      {tours} Tours
    </span>
    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
      <h3 className="text-xl font-bold">
        <Link href={`/destinations/${slug}`}>{title}</Link>
      </h3>
      <p className="text-sm">{departures} Departures</p>
    </div>
  </div>
);

export default DestinationCards;
