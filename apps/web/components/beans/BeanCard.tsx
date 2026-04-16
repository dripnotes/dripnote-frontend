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
        whileHover={{ y: -6 }}
        className={`relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl ${bgClass} shadow-md transition-shadow duration-300 hover:shadow-2xl`}
      >
        {/* 전체 배경 이미지 (Full Bleed Image) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={aromaImageUrl}
            alt={`${primaryAroma} — ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* 텍스트 가독성을 위한 그라데이션 오버레이 (Bottom Shadow) */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* 텍스트 영역 — 이미지 위에 오버레이 (Bottom-Left) */}
        <div className="absolute bottom-0 left-0 z-20 w-full p-6 text-white">
          {/* 원산지 (Sans-serif, Tiny, Spaced) */}
          <p className="font-outfit mb-2 text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
            {origin}
          </p>
          {/* 원두명 (Serif, Elegant, Large) */}
          <h3 className="font-playfair text-2xl leading-tight font-bold tracking-tight">{name}</h3>
        </div>
      </motion.article>
    </Link>
  );
}
