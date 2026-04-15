'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FlavorCardProps {
  tasting_name: string;
  tasting_image_link: string;
  tasting_link: string;
  index?: number;
}

/**
 * FlavorCard - 단일 향미 카테고리 이미지 카드
 * - Hover 시 컨테이너는 고정하고 내부 이미지만 scale: 1.1로 확대 (0.3s easeOut)
 * - next/image 최적화 적용
 * - 하단 스크림 오버레이로 텍스트 가독성 확보
 */
export default function FlavorCard({
  tasting_name,
  tasting_image_link,
  tasting_link,
  index = 0,
}: FlavorCardProps) {
  return (
    <Link href={tasting_link} className="group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.05,
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow hover:shadow-xl"
      >
        {/* 이미지만 확대 (컨테이너 고정) */}
        <div className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform group-hover:scale-110">
          <div className="relative h-full w-full">
            <Image
              src={tasting_image_link}
              alt={tasting_name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </div>

        {/* Scrim Overlay - 스케일 영향 없음 */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* 향미 이름 (좌측 최하단) */}
        <div className="absolute bottom-4 left-4">
          <span className="font-outfit text-lg font-bold text-[#F5E6D3]">{tasting_name}</span>
        </div>
      </motion.div>
    </Link>
  );
}
