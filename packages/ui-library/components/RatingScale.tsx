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
  onChange: (value: number) => void;
  /** 컴포넌트 크기 및 스타일 변형 ('sm': Drawer/Mobile, 'md': Panel/Desktop) */
  variant?: 'sm' | 'md';
  /** 추가 클래스 */
  className?: string;
}

/**
 * 5단계 평점 보정: 단계별로 Amber-Scale의 농도를 다르게 적용
 */
const getAmberColor = (n: number, max: number) => {
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
  return (
    <div className={cn('flex w-full gap-1 rounded-md bg-transparent', className)}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const isActive = n <= value;
        const amberClass = getAmberColor(n, max);
        
        return (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(value === n ? 0 : n)}
            className={cn(
              'flex-1 rounded transition-colors duration-200 cursor-pointer',
              // 공통 로직: 활성화 시 Amber, 비활성화 시 Gray
              isActive
                ? cn(amberClass, 'border-transparent')
                : variant === 'md'
                  ? 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200',
              // 높이 제어
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
