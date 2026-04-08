'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

import { authUtils } from '@/lib/utils/auth-utils';

/**
 * AuthCallbackContent - 실제 토큰 처리 로직을 담당하는 내부 컴포넌트
 * useSearchParams()를 사용하므로 Suspense 내부에 위치해야 합니다.
 */
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // 1. 토큰 저장
      authUtils.setToken(token);

      // 2. 메인 페이지로 이동
      console.log('인증 성공: 토큰 저장 완료');
      router.replace('/');
    } else {
      // 토큰이 없는 경우 로그인 페이지로 다시 보냄
      console.warn('인증 실패: 토큰이 누락되었습니다.');
      router.replace('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Loading Spinner or Simple Text */}
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      <p className="font-outfit text-sm font-light tracking-widest uppercase">Authenticating...</p>
    </div>
  );
}

/**
 * LoginCallbackPage - 인증 서버로부터 리다이렉트된 후 토큰을 처리하는 페이지
 */
export default function LoginCallbackPage() {
  return (
    <div className="bg-primary-surface flex min-h-screen items-center justify-center text-white">
      <Suspense fallback={<p className="font-outfit text-sm font-light uppercase">Loading...</p>}>
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
