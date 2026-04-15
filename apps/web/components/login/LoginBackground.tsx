'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

/**
 * LoginBackground - 고감도 배경 이미지 및 오버레이
 * - Ken Burns Effect: scale(1.0) → scale(1.1), 20초 선형, 무한 반복 (스펙 #1)
 * - Overlay: Espresso Dark(#1A1614) 기반 선형 그라데이션 (이미지와 독립적으로 고정)
 */
const LoginBackground = () => {
  return (
    <div className="bg-primary-surface absolute inset-0 z-[-1] h-screen w-full overflow-hidden">
      {/* 초기 페이드인 래퍼 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        {/* Ken Burns: scale 1.0 → 1.1, 무한 반복 (이미지만 스케일) */}
        <motion.div
          animate={{ scale: [1.0, 1.1] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="absolute inset-0"
        >
          <Image
            src="/login-bg.png"
            alt="Coffee Brewing Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay - 스케일 영향 없이 고정 */}
        <div className="from-primary-surface/80 via-primary-surface/40 to-primary-surface/95 absolute inset-0 bg-linear-to-b" />
      </motion.div>
    </div>
  );
};

export default LoginBackground;
