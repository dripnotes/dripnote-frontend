import React from 'react';

/**
 * 모든 페이지의 최상단 컨텐츠를 감싸는 래퍼 컴포넌트입니다.
 * 모바일 Bottom Navigation Bar 회피 및 데스크톱 Header 여백 등을 일관성 있게 관리합니다.
 */
interface PageContainerProps {
  children: React.ReactNode;
  /** 데스크톱에서 상단 고정 헤더(h-16) 높이만큼 여백을 밀어낼지 여부 (기본: true) */
  withHeaderOffset?: boolean;
}

export default function PageContainer({ children, withHeaderOffset = true }: PageContainerProps) {
  // 모바일 공통(Bottom Nav 회피용 하단 여백): pb-16
  // 데스크톱: withHeaderOffset에 따라 상단 헤더 높이(pt-16) 만큼 여백을 확보함
  const layoutStyle = withHeaderOffset
    ? 'pb-16 pt-0 md:pb-0 md:pt-16'
    : 'pb-16 pt-0 md:pb-0 md:pt-0';

  return (
    <div className={`flex min-h-screen w-full flex-col bg-white ${layoutStyle}`}>
      {children}
    </div>
  );
}
