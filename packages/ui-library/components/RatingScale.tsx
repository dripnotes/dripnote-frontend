'use client';

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import * as React from 'react';

export interface RatingScaleProps {
  /** 최대 평점 (보통 3 또는 5) */
  max?: number;
  /** 현재 선택된 평점 */
  value: number;
  /** 평점 변경 콜백 */
  onChange?: (value: number) => void;
  /** 컴포넌트 크기 및 스타일 변형
   * 'sm': Drawer/Mobile (굵은 바),
   * 'md': Panel/Desktop (굵은 바),
   * 'indicator': 정보 표시용 슬림 지표 (h-1, Glow 효과)
   */
  variant?: 'sm' | 'md' | 'indicator';
  /** 추가 클래스 */
  className?: string;
}

/**
 * 5단계 평점 보정: 단계별로 Amber-Scale의 농도를 다르게 적용
 */
const getAmberColor = (n: number, max: number, isIndicator: boolean = false) => {
  if (isIndicator) {
    // indicator 모드에서는 Hex 값 반환 (boxShadow와 색상 정합성을 위해)
    if (max === 5) {
      const colors = ['#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706'];
      return colors[n - 1] ?? colors[4];
    }
    if (max === 3) {
      const colors = ['#fcd34d', '#f59e0b', '#d97706'];
      return colors[n - 1] ?? colors[2];
    }
    return '#f59e0b';
  }

  // 기본 바 차트 모드에서는 Tailwind 클래스 반환
  if (max === 5) {
    switch (n) {
      case 1: return 'bg-amber-200';
      case 2: return 'bg-amber-300';
      case 3: return 'bg-amber-400';
      case 4: return 'bg-amber-500';
      case 5: return 'bg-amber-600';
      default: return 'bg-amber-500';
    }
  } else if (max === 3) {
    switch (n) {
      case 1: return 'bg-amber-300';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-amber-600';
      default: return 'bg-amber-500';
    }
  }
  return 'bg-amber-500';
};

const RatingScale = ({
  max = 5,
  value,
  onChange,
  variant = 'md',
  className,
}: RatingScaleProps) => {
  const isIndicator = variant === 'indicator';

  return (
    <div
      className={cn(
        'flex w-full gap-1 rounded-md bg-transparent',
        isIndicator && 'pointer-events-none',
        className
      )}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const isActive = n <= value;
        const color = getAmberColor(n, max, isIndicator);

        if (isIndicator) {
          return (
            <motion.div
              key={n}
              initial={false}
              animate={{
                backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? `0 0 8px ${color}66` : 'none',
              }}
              className="h-1 w-full rounded-full"
            />
          );
        }

        return (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange?.(value === n ? 0 : n)}
            className={cn(
              'flex-1 rounded transition-colors duration-200 cursor-pointer',
              isActive
                ? cn(color, 'border-transparent')
                : variant === 'md'
                  ? 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200',
              variant === 'md' ? 'h-7' : 'h-8'
            )}
            aria-label={`${n}점`}
          />
        );
      })}
    </div>
  );
};

RatingScale.displayName = 'RatingScale';

export { RatingScale };
