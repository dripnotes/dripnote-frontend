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
      {/* Background Image with Motion (Linear Fluidity) */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'linear' }}
        className="relative h-full w-full"
      >
        <Image
          src="/login-bg.png"
          alt="Coffee Brewing Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay - 블랙/브라운 그라데이션 */}
        <div className="to-primary-surface/90 absolute inset-0 bg-linear-to-b from-black/60 via-black/40" />
      </motion.div>
    </div>
  );
};

export default LoginBackground;
