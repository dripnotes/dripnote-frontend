'use client';

import { motion } from 'framer-motion';
import React from 'react';

/**
 * LoginHeader - 브랜드 아이덴티티 및 슬로건
 * - Logo: Playfair Display (Dripnote)
 * - Headline: Outfit (Dripnote 시작하기)
 */
const LoginHeader = () => {
  return (
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
        {/* Logo - Elegant Playfair Display */}
        <h1 className="font-playfair mb-3 text-5xl font-extrabold tracking-tight text-white drop-shadow-xl lg:text-8xl">
          Dripnote
        </h1>

        {/* Punchy Headline - Outfit Modern & Light */}
        <p className="font-outfit text-sm font-light tracking-[0.2em] text-white/70 uppercase drop-shadow-sm lg:text-lg">
          시작하기
        </p>
      </div>

      {/* Decorative Line (Optional, for premium feel) */}
      <div className="h-px w-12 bg-white/30" />
    </motion.header>
  );
};

export default LoginHeader;
