import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await axios.get('https://craftedvacays.com/wp-json/wp/v2/pages?slug=all-countries');

    if (!response.data || response.data.length === 0) {
      return new Response(JSON.stringify({ error: 'No destinations found' }), { status: 404 });
    }

    const htmlContent = response.data[0].content.rendered;
    const $ = cheerio.load(htmlContent);

    const destinations = [];

    // Adjust selectors based on actual structure
    $('.elementor-widget-container').each((i, el) => {
      const title = $(el).find('h3').text().trim();
      const imgSrc = $(el).find('img').attr('src');
      const description = $(el).find('p').text().trim();

      if (title) {
        destinations.push({
          id: generateId(title),
          title,
          slug: generateSlug(title),
          description,
          images: imgSrc ? [imgSrc] : [],
          tours: 0,
          departures: 0,
        });
      }
    });

    return new Response(JSON.stringify(destinations), { status: 200 });

  } catch (error) {
    console.error('Error fetching destinations:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch destinations' }), { status: 500 });
  }
}

function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

function generateId(title) {
  return Buffer.from(title).toString('base64').slice(0, 10);
}
