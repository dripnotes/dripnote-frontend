'use client';

import { VisualCard } from '@coffee-service/ui-library';
import Image from 'next/image';
import Link from 'next/link';

import { AROMA_BG_CLASS, type BeanInfo } from '@/lib/api/beans';

interface BeanCardProps
  extends Omit<BeanInfo, 'bitterness' | 'sweetness' | 'acidity' | 'roasting' | 'body'> {
  index?: number;
}

/**
 * BeanCard - 원두 상품 이미지 카드 (VisualCard Compound Pattern 적용)
 */
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
    <VisualCard.Root
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      hoverEffect="translate"
      className={bgClass}
    >
      <Link href={link} className="h-full w-full">
        <VisualCard.ImageContainer aspectRatio="3/4">
          <VisualCard.Image src={aromaImageUrl} alt={name} asChild hoverScale={1.1}>
            <Image
              src={aromaImageUrl}
              alt={`${primaryAroma} — ${name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </VisualCard.Image>

          {/* 텍스트 가독성을 위한 그라데이션 오버레이 */}
          <VisualCard.Overlay variant="bottom" />

          {/* 텍스트 영역 */}
          <VisualCard.Content position="bottom-left">
            <p className="font-outfit mb-2 text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
              {origin}
            </p>
            <VisualCard.Title className="font-playfair text-2xl leading-tight font-bold tracking-tight text-white">
              {name}
            </VisualCard.Title>
          </VisualCard.Content>
        </VisualCard.ImageContainer>
      </Link>
    </VisualCard.Root>
  );
}
