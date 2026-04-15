'use client';

import React from 'react';

import { FlavorNote } from '@/lib/api/main';

import FlavorCard from './FlavorCard';

interface FlavorNotesProps {
  tastings: FlavorNote[];
}

/**
 * FlavorNotes - 향미 카테고리별 이미지 카드 격자 섹션
 * - 반응형: Mobile 2열 / Tablet 3열 / Desktop 4열
 * - 각 카드는 FlavorCard 컴포넌트에 위임 (스펙 #11)
 */
export default function FlavorNotes({ tastings }: FlavorNotesProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            어느 향미를 선호하시나요?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            선호하는 향과 맛(Tasting Notes)으로 나에게 꼭 맞는 원두를 찾아보세요.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tastings.map((note, idx) => (
            <FlavorCard
              key={idx}
              tasting_name={note.tasting_name}
              tasting_image_link={note.tasting_image_link}
              tasting_link={note.tasting_link}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
