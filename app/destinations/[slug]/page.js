import { use } from 'react';
import DestinationDetails from '@/components/sections/DestinationDetails';

export default function DestinationSlugPage({ params }) {
  const resolvedParams = use(params);
  return <DestinationDetails parentName={resolvedParams.slug} />;
}

