'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  /** 외부 section 태그에 적용할 클래스 (배경색, 패딩 등) */
  className?: string;
  /** 내부 컨텐츠 div에 추가로 적용할 클래스 */
  innerClassName?: string;
  /** 특정 섹션으로 이동하기 위한 ID */
  id?: string;
  /** 최대 너비를 강제할지 여부 (기본: true, max-w-7xl) */
  withMaxWidth?: boolean;
}

/**
 * SectionContainer - 일관된 가로 여백(gutter)과 중앙 정렬을 제공하는 레이아웃 컴포넌트입니다.
 * - 외부 section은 100% 너비를 차지하여 풀 블리드 배경을 지원합니다.
 * - 내부 div는 px-8 패딩과 함께 중앙에 정렬됩니다.
 */
export default function SectionContainer({
  children,
  className,
  innerClassName,
  id,
  withMaxWidth = true,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn('w-full', className)}>
      <div className={cn('mx-auto w-full px-8', withMaxWidth && 'max-w-7xl', innerClassName)}>
        {children}
      </div>
    </section>
  );
}
