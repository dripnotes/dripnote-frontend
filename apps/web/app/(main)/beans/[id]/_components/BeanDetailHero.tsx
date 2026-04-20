'use client';

import { motion } from 'framer-motion';
import { Bookmark, Share, ChevronLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AROMA_BG_CLASS, AromaType } from '@/lib/api/beans';
import { cn } from '@/lib/utils';

interface BeanDetailHeroProps {
  name: string;
  origin: string;
  roastery?: string;
  aromaImageUrl: string;
  primaryAroma: AromaType;
  purchaseUrl?: string;
}

export function BeanDetailHero({
  name,
  origin,
  roastery,
  aromaImageUrl,
  primaryAroma,
  purchaseUrl,
}: BeanDetailHeroProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bgClass = AROMA_BG_CLASS[primaryAroma] ?? 'bg-gray-100';

  return (
    <section className="relative mx-auto mt-0 max-w-7xl px-4 py-8 md:mt-24 md:px-8">
      <button
        onClick={() => router.back()}
        className="group mb-8 flex items-center space-x-2 text-gray-500 transition-colors hover:text-gray-900"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-outfit text-sm font-medium tracking-wider uppercase">Back</span>
      </button>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('relative aspect-square w-full overflow-hidden rounded-2xl', bgClass)}
        >
          <Image
            src={aromaImageUrl}
            alt={`${primaryAroma} 향미의 ${name} 대표 이미지`}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
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
            <h1 className="font-playfair mb-4 text-[clamp(1.75rem,5vw,3.75rem)] leading-tight font-bold text-gray-900">
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
                    isBookmarked
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-gray-400 group-hover:text-amber-500',
                  )}
                />
              </button>
              <button
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-amber-500 hover:bg-amber-50"
                aria-label="공유하기"
              >
                <Share className="h-5 w-5 text-gray-400 transition-colors group-hover:text-amber-500" />
              </button>
              {purchaseUrl && (
                <a
                  href={purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 items-center justify-center space-x-2 rounded-full border border-gray-200 px-6 transition-colors hover:border-amber-500 hover:bg-amber-50"
                  aria-label="결제 페이지로 이동"
                >
                  <span className="font-outfit text-sm font-semibold tracking-wider text-gray-600 uppercase transition-colors group-hover:text-amber-600">
                    Buy Beans
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-amber-500" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
