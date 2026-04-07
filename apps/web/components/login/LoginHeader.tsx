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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex flex-col items-center justify-center space-y-4 pt-20 pb-12"
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <h1 className="font-playfair text-5xl font-bold tracking-tight text-white drop-shadow-md lg:text-7xl">
          Dripnote
        </h1>

        {/* Punchy Headline */}
        <p className="font-outfit text-lg font-light tracking-wide text-white/90 drop-shadow-sm lg:text-xl">
          Dripnote 시작하기
        </p>
      </div>

      {/* Decorative Line (Optional, for premium feel) */}
      <div className="h-px w-12 bg-white/30" />
    </motion.header>
  );
};

export default LoginHeader;
