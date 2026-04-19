'use client';

import { VisualCard } from '@coffee-service/ui-library';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AROMA_BG_CLASS, type BeanInfo } from '@/lib/api/beans';
import { RatingScale } from '@coffee-service/ui-library';

interface BeanCardProps
  extends Pick<
    BeanInfo,
    | 'id'
    | 'name'
    | 'origin'
    | 'primaryAroma'
    | 'aromaImageUrl'
    | 'link'
    | 'bitterness'
    | 'sweetness'
    | 'acidity'
    | 'roasting'
    | 'body'
  > {
  index?: number;
}

/**
 * 맛 지표를 표시하는 내부 컴포넌트
 */
function ProfileIndicator({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div className="flex w-[140px] items-center justify-between">
      <span className="font-outfit text-left text-[10px] font-medium tracking-wider text-white/50 uppercase">
        {label === 'Roast' ? 'Roasting' : label}
      </span>
      {/* RatingScale 공통 컴포넌트 사용 (Drawer/Mobile용 사이즈인 'sm' 적용하여 콤팩트하게 표현) */}
      <RatingScale
        max={max}
        value={value}
        onChange={() => {}}
        variant="sm"
        className="w-[60px] pointer-events-none"
      />
    </div>
  );
}

/**
 * BeanCard - 원두 상품 이미지 카드 (VisualCard Compound Pattern 적용)
 * 디자인 고도화: 호버 시 원두 프로필(맛, 바디, 로스팅) 정보를 오버레이로 표시
 */
export default function BeanCard({
  name,
  origin,
  primaryAroma,
  aromaImageUrl,
  link,
  bitterness,
  sweetness,
  acidity,
  roasting,
  body,
}: BeanCardProps) {
  const bgClass = AROMA_BG_CLASS[primaryAroma] ?? 'bg-gray-100';

  return (
    <VisualCard.Root
      asChild
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      hoverEffect="translate"
      className={bgClass}
    >
      <Link href={link}>
        <VisualCard.ImageContainer aspectRatio="3/4">
          <VisualCard.Image src={aromaImageUrl} alt={name} asChild hoverScale={1.1}>
            <Image
              src={aromaImageUrl}
              alt={`${primaryAroma} — ${name}`}
              fill
              className="object-cover transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </VisualCard.Image>

          {/* 호버 시 나타나는 프로필 정보 오버레이 */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
            <div className="flex flex-col items-center space-y-4">
              {/* 로스터리 마크 (임의의 플레이스홀더) */}
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                  <Coffee className="h-5 w-5 text-white/80" />
                </div>
              </div>

              <div className="space-y-3">
                <ProfileIndicator label="Acidity" value={acidity} />
                <ProfileIndicator label="Sweetness" value={sweetness} />
                <ProfileIndicator label="Bitterness" value={bitterness} />
                <ProfileIndicator label="Body" value={body} max={3} />
                <ProfileIndicator label="Roast" value={roasting} max={3} />
              </div>
            </div>
          </div>

          {/* 텍스트 가독성을 위한 기본 그라데이션 오버레이 (비호버 시) */}
          <VisualCard.Overlay
            variant="bottom"
            className="z-10 transition-opacity duration-300 group-hover:opacity-0"
          />

          {/* 텍스트 영역 (비호버 시 노출) */}
          <VisualCard.Content
            position="bottom-left"
            className="z-20 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0"
          >
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
