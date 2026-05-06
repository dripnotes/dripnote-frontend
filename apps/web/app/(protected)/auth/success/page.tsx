'use client';

import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';

/**
 * AuthSuccessContent - 인증 성공 후 토큰 처리 및 최종 리다이렉트를 담당하는 컴포넌트
 */
function AuthSuccessContent() {
  const router = useRouter();

  // 로직이 middleware.ts로 이전되었습니다.
  // 미들웨어에서 리다이렉트가 발생하므로 이 컴포넌트는 거의 노출되지 않지만,
  // 브라우저 캐시나 특이 케이스를 위해 정적인 로딩 상태만 유지합니다.
  useEffect(() => {
    // 만약 미들웨어가 작동하지 않았을 경우를 대비한 최소한의 안전장치
    const timeout = setTimeout(() => {
      router.replace('/');
    }, 3000);
    return () => clearTimeout(timeout);
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
