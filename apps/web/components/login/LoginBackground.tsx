'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

/**
 * LoginBackground - 명세서에 따른 고감도 배경 이미지 및 오버레이
 * - Visual Dominance: 화면 전체의 80% 이상 차지
 * - Background Overlay: 블랙/브라운 그라데이션 오버레이
 */
const LoginBackground = () => {
  return (
    <div className="bg-primary-surface absolute inset-0 z-[-1] h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect (Premium Lab Mood) */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{
          duration: 20,
          ease: 'linear',
          opacity: { duration: 1.2 },
        }}
        className="relative h-full w-full"
      >
        <Image
          src="/login-bg.png"
          alt="Coffee Brewing Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay - Espresso Dark & Linear depth */}
        <div className="absolute inset-0 bg-linear-to-b from-[#1A1614]/80 via-[#1A1614]/40 to-[#1A1614]/95" />
      </motion.div>
    </div>
  );
};

export default LoginBackground;
