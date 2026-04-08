import React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

/**
 * MainLayout - 헤더와 푸터가 포함된 일반적인 페이지 레이아웃
 * (main) 그룹 하위의 모든 페이지에 적용됩니다.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-page flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
