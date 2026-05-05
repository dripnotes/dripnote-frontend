'use client';

import { motion } from 'framer-motion';
import React from 'react';

import SocialButton from './SocialButton';

/**
 * SocialLoginSection - 소셜 로그인 버튼 그룹 컨테이너
 * - 버튼 순서: Google → Naver → Kakao (스펙 #5)
 * - 각 버튼은 SocialButton 컴포넌트에 위임 (스펙 #4)
 */
const SocialLoginSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      className="flex w-full max-w-sm flex-col items-center px-6"
    >
      {/* 순서: Google → Naver → Kakao */}
      <SocialButton provider="google" />
      <SocialButton provider="naver" />
      <SocialButton provider="kakao" />

      {/* Subtle Divider Line */}
      <motion.div variants={lineVariants} className="mt-2 mb-3 h-px w-8 bg-white/10" />

      <motion.p
        variants={lineVariants}
        className="text-center text-[11px] leading-relaxed text-white/30"
      >
        Baristation에 로그인함으로써 이용약관 및 <br /> 개인정보처리방침에 동의하게 됩니다.
      </motion.p>
    </motion.div>
  );
};

export default SocialLoginSection;
