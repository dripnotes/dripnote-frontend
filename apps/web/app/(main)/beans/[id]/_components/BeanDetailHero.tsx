'use client';

import { motion } from 'framer-motion';
import { Bookmark, Share, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SectionContainer from '@/components/layout/SectionContainer';
import { AROMA_BG_CLASS, AromaType } from '@/lib/api/beans';
import { cn } from '@/lib/utils';

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
    <SectionContainer className="mt-0 pt-4 pb-6 md:mt-4 md:py-8">
      {/* Mobile Top Header: Logo + Actions (Matches list page pattern) */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <Link href="/" className="font-playfair text-2xl font-bold tracking-tighter text-gray-900">
          Dripnote
        </Link>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-100"
            aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
          >
            <Bookmark
              className={cn(
                'h-5 w-5 transition-colors',
                isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-gray-400',
              )}
            />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition-colors"
            disabled
            aria-disabled="true"
            aria-label="공유하기 (준비 중)"
          >
            <Share className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="group mb-4 flex items-center space-x-2 text-gray-500 transition-colors hover:text-gray-900"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-outfit text-sm font-medium tracking-wider uppercase">Back</span>
      </button>

      <div className="relative grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-12 lg:gap-20">
        {/* Left: Image Container + Mobile Text Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'relative mx-auto aspect-square w-full max-w-[600px] overflow-hidden rounded-2xl',
            bgClass,
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
          {/* Mobile Overlay Gradient for readability */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent md:hidden" />

          {/* Mobile-only Text Overlay */}
          <div className="absolute bottom-0 left-0 z-10 w-full p-6 md:hidden">
            {roastery && (
              <p className="font-outfit mb-2 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
                {roastery}
              </p>
            )}
            <h1 className="font-playfair mb-2 text-3xl font-bold text-white">{name}</h1>
            <p className="font-outfit text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
              {origin}
            </p>
          </div>
        </motion.div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Tablet/Desktop Text Content */}
            <div className="hidden md:block">
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
            </div>

            {/* Action Bar (Only visible on md+) */}
            <div className="hidden items-center justify-end space-x-4 pt-4 md:flex md:border-t md:border-gray-100 md:pt-8">
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50/50 text-gray-300 transition-colors"
                disabled
                aria-disabled="true"
                aria-label="공유하기 (준비 중)"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
