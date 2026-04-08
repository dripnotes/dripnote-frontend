'use client';

import { Button } from '@coffee-service/ui-library';
import { motion } from 'framer-motion';
import React from 'react';

/**
 * SocialLoginSection - 구글, 네이버, 카카오 소셜 로그인 버튼
 * - 브랜드 가이드라인 준수 (색상, 로고, 텍스트)
 * - 인라인 스타일 대신 테일윈드(CSS) 클래스를 활용한 반응형 레이아웃 및 간격 관리
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleSocialLogin = (platform: string) => {
    // 실제 서버가 준비되면 아래 URL로 리다이렉트합니다.
    // const serverUrl = `http://localhost:8080/oauth2/authorization/${platform}`;

    // [Harness] 개발용 Mock 리다이렉션 로직 (Phase 2.4)
    const mockToken = `mock_jwt_token_${platform}_${Date.now()}`;
    window.location.href = `/login/callback?token=${mockToken}`;
  };

  return (
    <motion.div
      variants={containerVariants}
      className="flex w-full max-w-sm flex-col items-center px-6"
    >
      {/* 구글 로그인 버튼 */}
      <motion.div variants={itemVariants} className="mb-3 w-full shrink-0">
        <Button
          variant="google"
          size="xl"
          className="w-full gap-3"
          onClick={() => handleSocialLogin('google')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Google 계정으로 로그인
        </Button>
      </motion.div>

      {/* 카카오 로그인 버튼 */}
      <motion.div variants={itemVariants} className="mb-3 w-full shrink-0">
        <Button
          variant="kakao"
          size="xl"
          className="w-full gap-3"
          onClick={() => handleSocialLogin('kakao')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3c-4.97 0-9 3.119-9 6.967 0 2.492 1.64 4.675 4.103 5.918-.163.606-.59 2.193-.675 2.51-.104.385.135.38.284.282.117-.077 1.874-1.272 2.628-1.785.114.016.23.03.348.038.775.053 1.579.08 2.312.08 4.97 0 9-3.119 9-6.967S16.97 3 12 3z" />
          </svg>
          카카오 로그인
        </Button>
      </motion.div>

      {/* 네이버 로그인 버튼 */}
      <motion.div variants={itemVariants} className="mb-4 w-full shrink-0">
        <Button
          variant="naver"
          size="xl"
          className="w-full gap-3"
          onClick={() => handleSocialLogin('naver')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
          </svg>
          네이버 로그인
        </Button>
      </motion.div>

      {/* Subtle Divider Line */}
      <motion.div variants={itemVariants} className="mt-2 mb-3 h-px w-8 bg-white/10" />

      <motion.p
        variants={itemVariants}
        className="text-center text-[11px] leading-relaxed text-white/30"
      >
        Dripnote에 로그인함으로써 이용약관 및 <br /> 개인정보처리방침에 동의하게 됩니다.
      </motion.p>
    </motion.div>
  );
};

export default SocialLoginSection;
