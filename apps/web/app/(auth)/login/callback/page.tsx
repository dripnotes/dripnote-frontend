'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { authUtils } from '@/lib/utils/auth-utils';

/**
 * AuthCallbackContent - 실제 토큰 처리 로직을 담당하는 내부 컴포넌트
 * - token 존재 시: 저장 후 메인으로 이동
 * - token 없음 시: Error State UI 노출 (스펙 #7 - 즉시 리다이렉트 없음)
 */
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      authUtils.setToken(token);
      console.log('인증 성공: 토큰 저장 완료');
      router.replace('/');
    } else {
      console.warn('인증 실패: 토큰이 누락되었습니다.');
      setHasError(true);
    }
  }, [searchParams, router]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center space-y-4 text-center">
        <p className="font-outfit text-sm text-white/70">인증에 실패했습니다.</p>
        <p className="text-xs text-white/40">토큰 정보가 올바르지 않거나 만료되었습니다.</p>
        <Link
          href="/login"
          className="font-outfit mt-2 text-xs font-medium tracking-widest text-white/40 uppercase transition-colors hover:text-white/80"
        >
          로그인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Loading Spinner */}
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
