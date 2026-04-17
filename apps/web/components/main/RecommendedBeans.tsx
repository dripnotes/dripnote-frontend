'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import RecommendedBeanCard from '@/components/common/cards/RecommendedBeanCard';
import { RecommendedBean } from '@/lib/api/main';

interface RecommendedBeansProps {
  beans: RecommendedBean[];
}

export default function RecommendedBeans({ beans }: RecommendedBeansProps) {
  return (
    <section id="recommended" className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              오늘의 추천 원두
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              전문가들이 매일 새롭게 엄선한, 지금 가장 맛있는 커피
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beans.map((bean, idx) => (
            <RecommendedBeanCard key={bean.id} bean={bean} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
