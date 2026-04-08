'use client';

import { Button } from '@coffee-service/ui-library';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import LoginBackground from '@/components/login/LoginBackground';
import LoginHeader from '@/components/login/LoginHeader';
import SocialLoginSection from '@/components/login/SocialLoginSection';

/**
 * LoginPage - Dripnote 전용 로그인 페이지
 * - Focused Layout: 헤더/푸터 없이 온전히 인증에만 집중하는 구성
 * - 명세서의 'Internal Coffee Lab' 무드를 반영한 프리미엄 디자인
 */
export default function LoginPage() {
  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden">
      {/* 고감도 배경 및 오버레이 */}
      <LoginBackground />

      {/* 좌측 상단: 메인으로 돌아가기 (Premium Glass Morphism) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        className="absolute top-6 left-6 z-50 lg:top-14 lg:left-14"
      >
        <Link href="/">
          <Button
            variant="ghost"
            className="group flex h-auto items-center justify-center gap-2 p-0 text-white/40 transition-all hover:bg-transparent hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-outfit text-xs font-medium tracking-[0.2em] uppercase">main</span>
          </Button>
        </Link>
      </motion.div>

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

      {/* Subtle footer aligned with user's preference for simplicity */}
      <footer className="absolute bottom-6 flex w-full items-center justify-center lg:bottom-10">
        <p className="text-[10px] text-white/40">
          © {new Date().getFullYear()} Dripnote. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
