// app/destinations/[slug]/page.js
import React from 'react';
import DestinationDetails from '@/components/sections/DestinationDetails';
const DestinationSlugPage = ({ params }) => {
  const { slug } = params;
  return <DestinationDetails parentName={slug} />;
};

export default DestinationSlugPage;
