// app/destinations/page.js
export default async function DestinationsPage() {
    const destinations = await getDestinations();
    
    return (
      <div className="py-20">
        <DestinationGrid destinations={destinations} />
      </div>
    );
  }