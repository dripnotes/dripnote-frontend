'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

import { authUtils } from '@/lib/utils/auth-utils';

/**
 * AuthSuccessContent - 인증 성공 후 토큰 처리 및 최종 리다이렉트를 담당하는 컴포넌트
 */
function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. 쿠키(refreshToken)를 사용하여 Access Token으로 교환 (BFF 호출)
    // 브라우저가 /api/auth/refresh 요청 시 자동으로 refreshToken 쿠키를 포함함
    const exchangeToken = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          // Authorization 헤더는 생략하거나 비워서 보냄 (BFF가 쿠키를 사용함)
        });

        if (!response.ok) throw new Error('Token exchange failed');

        const data = await response.json();
        const accessToken = data.accessToken || data.token; // 백엔드 응답 필드에 따라 조정

        if (accessToken) {
          // 2. Access Token 저장
          authUtils.setToken(accessToken);

          // 3. 세션 스토리지에서 최종 목적지 추출 및 검증
          const rawTarget = sessionStorage.getItem('redirect');
          sessionStorage.removeItem('redirect');

          const finalTarget =
            rawTarget && rawTarget.startsWith('/') && !rawTarget.startsWith('//') ? rawTarget : '/';

          // 4. 최종 목적지로 이동
          router.replace(finalTarget);
        } else {
          throw new Error('Access token not found in response');
        }
      } catch (error) {
        console.error('인증 처리 중 오류 발생:', error);
        router.replace('/login?error=exchange_failed');
      }
    };

    exchangeToken();
  }, [router]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Premium Loading Spinner */}
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
        <div className="h-full w-full animate-spin rounded-full border-4 border-amber-500 border-t-transparent shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
      </div>
      <div className="text-center">
        <p className="font-playfair text-lg font-bold tracking-tight text-white">
          인증을 완료하는 중입니다
        </p>
        <p className="font-outfit mt-1 text-xs tracking-[0.2em] text-gray-500 uppercase">
          Finalizing Security...
        </p>
      </div>
    </div>
  );
}

/**
 * AuthSuccessPage - OAuth 인증 성공 환승역(Landing Station)
 * - 백엔드에서 발급한 토큰을 수령하고 원래 가려던 페이지로 안내합니다.
 */
export default function AuthSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0e0d] p-6 text-white">
      <Suspense
        fallback={
          <p className="font-outfit text-sm font-light tracking-widest uppercase">Loading...</p>
        }
      >
        <AuthSuccessContent />
      </Suspense>
    </div>
  );
}
