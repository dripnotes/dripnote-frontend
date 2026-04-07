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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* 고감도 배경 및 오버레이 */}
      <LoginBackground />

      {/* 좌측 상단: 메인으로 돌아가기 */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-8 left-6 z-50 lg:top-12 lg:left-12"
      >
        <Link href="/">
          <Button
            variant="ghost"
            className="group flex h-auto items-center gap-2 p-0 text-white/50 transition-colors hover:bg-transparent hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-outfit hidden text-sm font-light tracking-wide sm:block">
              메인으로 돌아가기
            </span>
          </Button>
        </Link>
      </motion.div>

      {/* 로고 및 인사말 */}
      <LoginHeader />

      {/* 소셜 로그인 버튼 그룹 */}
      <SocialLoginSection />

      {/* Footer-like subtle info (optional) */}
      <footer className="absolute bottom-8 text-[10px] tracking-widest text-white/30 uppercase">
        © 2026 Dripnote Lab. All rights reserved.
      </footer>
    </main>
  );
}
