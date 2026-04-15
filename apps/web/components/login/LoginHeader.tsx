'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

/**
 * LoginHeader - 브랜드 로고, 슬로건, 메인 페이지 복귀 링크
 * - Back Link: 텍스트 전용 ("main"), 아이콘·버튼 없음 (스펙 #2, #3)
 * - Logo: Playfair Display (Dripnote)
 * - Headline: "시작하기" (Outfit, Light, Uppercase)
 */
const LoginHeader = () => {
  return (
    <>
      {/* 좌측 상단: 메인 복귀 링크 - 텍스트 전용, 아이콘/버튼 없음 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        className="fixed top-6 left-6 z-50 lg:top-14 lg:left-14"
      >
        <Link
          href="/"
          className="font-outfit text-xs font-medium tracking-widest text-white/40 uppercase transition-colors hover:text-white/80"
        >
          main
        </Link>
      </motion.div>

      {/* 로고 및 슬로건 */}
      <motion.header
        variants={{
          hidden: { y: -20, opacity: 0 },
          show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
          },
        }}
        className="flex flex-col items-center justify-center space-y-3 pt-12 pb-6 lg:pt-20 lg:pb-12"
      >
        <div className="flex flex-col items-center">
          {/* Logo - Playfair Display */}
          <h1 className="font-playfair mb-3 text-5xl font-extrabold tracking-tight text-white drop-shadow-xl lg:text-8xl">
            Dripnote
          </h1>

          {/* Slogan - Outfit Light */}
          <p className="font-outfit text-sm font-light tracking-[0.2em] text-white/70 uppercase drop-shadow-sm lg:text-lg">
            시작하기
          </p>
        </div>

        {/* Decorative Line */}
        <div className="h-px w-12 bg-white/30" />
      </motion.header>
    </>
  );
};

export default LoginHeader;
