'use client';

import { AnimatePresence } from 'framer-motion';

import BeanCard from '@/components/common/cards/BeanCard';
import { type BeanInfo } from '@/lib/api/beans';

interface BeanCardListProps {
  beans: BeanInfo[];
  isLoading: boolean;
}

function SkeletonCard() {
  return <div className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100" />;
}

export default function BeanCardList({ beans, isLoading }: BeanCardListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (beans.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-24 text-center">
        <p className="font-outfit text-sm font-medium text-gray-400">조건에 맞는 원두가 없습니다</p>
        <p className="font-outfit mt-1 text-xs text-gray-300">필터를 조정해보세요</p>
      </div>
    );
  }

  return (
    <div
      className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-3 lg:grid-cols-4"
      key={`${beans.length}-${beans[0]?.id}`}
    >
      <AnimatePresence>
        {beans.map((bean, i) => (
          <BeanCard key={bean.id} {...bean} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}
