'use client';

import { motion } from 'framer-motion';
import { Bookmark, Share, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AROMA_BG_CLASS, AromaType } from '@/lib/api/beans';

interface BeanDetailHeroProps {
  name: string;
  origin: string;
  roastery?: string;
  aromaImageUrl: string;
  primaryAroma: AromaType;
}

export function BeanDetailHero({
  name,
  origin,
  roastery,
  aromaImageUrl,
  primaryAroma,
}: BeanDetailHeroProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bgClass = AROMA_BG_CLASS[primaryAroma] ?? 'bg-gray-100';

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 mt-16 md:mt-24">
      <button
        onClick={() => router.back()}
        className="group mb-8 flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-outfit text-sm font-medium tracking-wider uppercase">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'relative overflow-hidden rounded-2xl aspect-square w-full',
            bgClass
          )}
        >
          <Image
            src={aromaImageUrl}
            alt={`${primaryAroma} 향미의 ${name} 대표 이미지`}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </motion.div>

        {/* Right: Header Info */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            {roastery && (
              <p className="font-outfit mb-3 text-sm font-medium tracking-[0.2em] text-amber-600 uppercase">
                {roastery}
              </p>
            )}
            <h1 className="font-playfair mb-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              {name}
            </h1>
            <p className="font-outfit mb-8 text-sm font-medium tracking-[0.2em] text-gray-500 uppercase">
              {origin}
            </p>

            {/* Action Bar */}
            <div className="flex items-center space-x-4 border-t border-gray-100 pt-8">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-amber-500 hover:bg-amber-50"
                aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
              >
                <Bookmark
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-gray-400 group-hover:text-amber-500'
                  )}
                />
              </button>
              <button
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-amber-500 hover:bg-amber-50"
                aria-label="공유하기"
              >
                <Share className="h-5 w-5 text-gray-400 transition-colors group-hover:text-amber-500" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
