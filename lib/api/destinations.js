export async function fetchDestinationsFromWP() {
  const response = await fetch('/api/destinations');

  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }

  return await response.json();
}
