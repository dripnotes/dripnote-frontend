'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { AromaNote } from '@/lib/api/main';

import AromaCard from './AromaCard';

interface AromaNotesProps {
  aromas: AromaNote[];
}

/**
 * AromaNotes - 향미 카테고리별 이미지 카드 격자 섹션
 * - 반응형 노출 제어: Desktop 8개 / Tablet 6개 / Mobile 4개
 * - "전체 보기" 버튼을 통해 필터 페이지로 유도
 */
export default function AromaNotes({ aromas }: AromaNotesProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 헤더 영역 (RecommendedBeans와 동일 스타일) */}
        <div className="mb-12 flex flex-col items-start justify-between sm:flex-row sm:items-end">
          <div>
            <h2 className="font-outfit text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              어느 향미를 선호하시나요?
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              선호하는 향(Aroma)으로 나에게 꼭 맞는 원두를 찾아보세요.
            </p>
          </div>
          <Link
            href="/beans"
            className="text-primary group mt-4 flex items-center text-sm font-semibold transition-colors hover:text-black sm:mt-0"
          >
            전체 보기
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Grid Layout with visibility control */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {aromas.map((aroma, idx) => {
            // 노출 기준: Mobile 4, Tablet 6, Desktop 8
            let visibilityClass = '';
            if (idx >= 8) visibilityClass = 'hidden';
            else if (idx >= 6) visibilityClass = 'hidden lg:block';
            else if (idx >= 4) visibilityClass = 'hidden sm:block';

            return (
              <AromaCard
                key={aroma.id}
                name={aroma.name}
                imageUrl={aroma.imageUrl}
                link={aroma.link}
                index={idx}
                className={visibilityClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
