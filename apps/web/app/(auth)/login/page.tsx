'use client';

import { motion } from 'framer-motion';
import React from 'react';

import LoginBackground from '@/components/login/LoginBackground';
import LoginHeader from '@/components/login/LoginHeader';
import SocialLoginSection from '@/components/login/SocialLoginSection';

/**
 * LoginPage - Dripnote 전용 로그인 페이지
 * - Focused Layout: 헤더/푸터 없이 온전히 인증에만 집중하는 구성
 * - 'Internal Coffee Lab' 무드 기반 프리미엄 디자인
 * - 메인 복귀 링크는 LoginHeader 컴포넌트 내부에서 관리
 */
export default function LoginPage() {
  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden">
      {/* 고감도 배경 및 오버레이 */}
      <LoginBackground />

      {/* Main Content Area (Staggered Animation Wrapper) */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className="relative z-10 flex w-full flex-col items-center"
      >
        <LoginHeader />
        <SocialLoginSection />
      </motion.div>

      {/* Subtle footer */}
      <footer className="absolute bottom-6 flex w-full items-center justify-center lg:bottom-10">
        <p className="text-[10px] text-white/40">
          © {new Date().getFullYear()} Dripnote. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
