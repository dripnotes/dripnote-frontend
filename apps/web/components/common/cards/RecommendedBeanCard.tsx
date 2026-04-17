'use client';

import { VisualCard } from '@coffee-service/ui-library';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { RecommendedBean } from '@/lib/api/main';

interface RecommendedBeanCardProps {
  bean: RecommendedBean;
  index?: number;
}

/**
 * RecommendedBeanCard - 추천 원두 카드 프리셋 (VisualCard Compound Pattern 적용)
 */
export default function RecommendedBeanCard({ bean, index = 0 }: RecommendedBeanCardProps) {
  return (
    <VisualCard.Root
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      hoverEffect="translate"
      className="bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      <Link href={bean.link} className="group block h-full">
        <VisualCard.ImageContainer aspectRatio="4/3">
          <VisualCard.Image src={bean.imageUrl} alt={bean.name} asChild hoverScale={1.05}>
            <Image
              src={bean.imageUrl}
              alt={bean.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </VisualCard.Image>
          {/* Hover 시 나타나는 풀 오버레이 */}
          <VisualCard.Overlay variant="full" className="opacity-0 group-hover:opacity-100" />
        </VisualCard.ImageContainer>

        <VisualCard.Body>
          <VisualCard.Title className="mb-4 line-clamp-2 text-xl font-bold text-gray-900">
            {bean.name}
          </VisualCard.Title>
          <VisualCard.Footer>
            {bean.aromas.map((aroma, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600"
              >
                {aroma}
              </span>
            ))}
          </VisualCard.Footer>
        </VisualCard.Body>
      </Link>
    </VisualCard.Root>
  );
}
