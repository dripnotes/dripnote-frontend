import React from 'react';

import FlavorNotes from '@/components/main/FlavorNotes';
import HeroSection from '@/components/main/HeroSection';
import RecommendedBeans from '@/components/main/RecommendedBeans';
import RoasteryMapSection from '@/components/main/RoasteryMapSection';
import { mockMainData } from '@/lib/api/main';

export default function Home() {
  // TODO: Use actual API fetch logic here when the backend is ready.
  // For now, we are providing the mocked API data directly to the components.
  const { tastings, beans } = mockMainData;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <HeroSection />
      <FlavorNotes tastings={tastings} />
      <RecommendedBeans beans={beans} />
      <RoasteryMapSection />
    </div>
  );
}
