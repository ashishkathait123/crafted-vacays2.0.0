import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://craftedvacays.grandeurnet.in/get-tours.php');

    const data = response.data;

    if (!data || !Array.isArray(data.destinations)) {
      console.error('Invalid data structure: ', data);
      return new Response(JSON.stringify({ error: 'Invalid destination data' }), { status: 404 });
    }

    const destinations = [];

    data.destinations.forEach((country) => {
      const countrySlug = generateSlug(country.name);
      console.log(`Processing country: ${country.name} (${countrySlug})`);

      country.states?.forEach((state) => {
        const stateSlug = generateSlug(state.name);
        console.log(`  Processing state: ${state.name} (${stateSlug})`);

        destinations.push({
          id: state.id,
          title: state.name,
          slug: state.slug || stateSlug,
          description: state.short_description || '',
          images: state.image ? [resolveImageUrl(state.image)] : [],
          tours: 0,
          departures: 0,
          parent: {
            id: country.id,
            title: country.name,
            slug: countrySlug,
            image: resolveImageUrl(country.image),
          },
        });

        state.cities?.forEach((city) => {
          const citySlug = generateSlug(city.name);
          console.log(`    Processing city: ${city.name} (${citySlug})`);

          destinations.push({
            id: city.id,
            title: city.name,
            slug: city.slug || citySlug,
            description: city.short_description || '',
            images: city.image ? [resolveImageUrl(city.image)] : [],
            tours: 0,
            departures: 0,
            parent: {
              id: state.id,
              title: state.name,
              slug: state.slug || stateSlug,
              image: resolveImageUrl(state.image),
            },
          });
        });
      });
    });

    console.log('Final destinations output:', JSON.stringify(destinations, null, 2));

    return new Response(JSON.stringify(destinations), { status: 200 });
  } catch (error) {
    console.error('Error fetching destinations:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch destinations' }), { status: 500 });
  }
}

// Helper to create URL slugs
function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

// Helper to fix relative image URLs
function resolveImageUrl(url) {
  if (!url) return 'https://craftedvacays.grandeurnet.in/images/destinations/default.jpg'; // FIXED fallback
  if (url.startsWith('http')) return url;
  return `https://craftedvacays.grandeurnet.in/${url.replace(/^\/+/, '')}`;
}

export async function fetchDestinationsFromWP() {
  const response = await fetch('/api/destinations');

  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }

  return await response.json();
}
