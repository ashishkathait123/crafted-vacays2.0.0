// app/destinations/[slug]/page.js
export default async function DestinationPage({ params }) {
    const destination = await getDestinationBySlug(params.slug);
    
    return (
      <div>
        <VideoBackground country={destination.country} />
        <div className="container mx-auto py-12">
          <ImageCarousel images={destination.images} />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Overview content={destination.overview} />
              <Itinerary plans={destination.itinerary} />
            </div>
            <div className="md:col-span-1">
              <BookingSidebar destination={destination} />
            </div>
          </div>
        </div>
      </div>
    );
  }