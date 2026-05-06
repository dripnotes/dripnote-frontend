import { NextRequest, NextResponse } from 'next/server';

import { authService } from '@/lib/services/auth-service';
import { AUTH_TOKEN_KEY, REDIRECT_COOKIE_KEY, isValidInternalPath } from '@/lib/utils/auth-utils';

/**
 * Middleware - 인증 전역 처리
 * - /auth/success 환승역 요청을 가로채서 토큰 교환을 진행합니다.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 인증 성공 환승역 처리 (/auth/success)
  if (pathname === '/auth/success') {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // refreshToken이 없으면 로그인 페이지로 리다이렉트
    if (!refreshToken) {
      const response = NextResponse.redirect(
        new URL('/login?error=missing_refresh_token', request.url),
      );
      response.cookies.delete(AUTH_TOKEN_KEY);
      response.cookies.delete(REDIRECT_COOKIE_KEY);
      return response;
    }

    try {
      // BFF API 대신 직접 서비스를 호출하여 성능 최적화 (Internal Fetch 제거)
      const result = await authService.refreshAccessToken(refreshToken);
      const accessToken = result.accessToken;

      if (!accessToken) {
        throw new Error('No access token received from backend');
      }

      // 최종 목적지 결정 및 검증 (오픈 리다이렉트 방지)
      let redirectTo = request.cookies.get(REDIRECT_COOKIE_KEY)?.value || '/';
      if (!isValidInternalPath(redirectTo)) {
        console.warn(`[Middleware] Invalid redirect detected: ${redirectTo}. Falling back to /`);
        redirectTo = '/';
      }

      const res = NextResponse.redirect(new URL(redirectTo, request.url));
      const isSecure = request.nextUrl.protocol === 'https:';

      // 2. Access Token을 쿠키에 설정
      res.cookies.set(AUTH_TOKEN_KEY, accessToken, {
        path: '/',
        maxAge: 604800, // 7일
        sameSite: 'lax',
        secure: isSecure,
      });

      // 3. 새로운 refreshToken이 발급된 경우 쿠키 업데이트
      if (result.refreshToken) {
        res.cookies.set('refreshToken', result.refreshToken, {
          path: '/',
          httpOnly: true,
          secure: isSecure,
          sameSite: 'lax',
          maxAge: 2592000,
        });
      }

      // 리다이렉트용 임시 쿠키 삭제
      res.cookies.delete(REDIRECT_COOKIE_KEY);

      return res;
    } catch (error) {
      console.error('[Middleware] Auth Success Error:', error);
      const errorMsg = error instanceof Error ? encodeURIComponent(error.message) : 'unknown';
      const res = NextResponse.redirect(
        new URL(`/login?error=exchange_failed&details=${errorMsg}`, request.url),
      );
      // 실패 시 인증 관련 쿠키 정리
      res.cookies.delete(AUTH_TOKEN_KEY);
      res.cookies.delete(REDIRECT_COOKIE_KEY);
      return res;
    }
  }

  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 설정
 */
export const config = {
  matcher: [
    '/auth/success',
    /*
     * 아래와 같은 경로들도 보호가 필요하면 추가 가능
     * '/profile/:path*',
     * '/settings/:path*',
     */
  ],
};
