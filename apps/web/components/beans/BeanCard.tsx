'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { AROMA_BG_CLASS, type BeanInfo } from '@/lib/api/beans';

interface BeanCardProps
  extends Omit<BeanInfo, 'bitterness' | 'sweetness' | 'acidity' | 'roasting' | 'body'> {
  index?: number;
}

export default function BeanCard({
  id,
  name,
  origin,
  primaryAroma,
  aromaImageUrl,
  link,
  index = 0,
}: BeanCardProps) {
  const bgClass = AROMA_BG_CLASS[primaryAroma] ?? 'bg-gray-100';

  return (
    <Link href={link} className="group block">
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        whileHover={{ y: -4 }}
        style={{ transition: 'box-shadow 0.25s ease' }}
        className={`relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl ${bgClass} cursor-pointer shadow-sm hover:shadow-xl`}
      >
        {/* 아로마 식재료 이미지 (카드 중앙, 60~70% 높이) */}
        <div className="relative mx-auto mt-6 w-4/5 flex-1">
          <Image
            src={aromaImageUrl}
            alt={`${primaryAroma} — ${name}`}
            fill
            className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* 텍스트 영역 — 최하단 */}
        <div className="px-4 pt-3 pb-5">
          {/* 원산지 */}
          <p className="font-outfit mb-1 text-[10px] font-normal tracking-[0.15em] text-black/50 uppercase">
            {origin}
          </p>
          {/* 원두명 */}
          <p className="font-outfit text-sm leading-snug font-semibold text-black/85">{name}</p>
        </div>
      </motion.article>
    </Link>
  );
}
