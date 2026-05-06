import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Baristation Middleware - 인증 확인 및 토큰 재발급 중앙 관리
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. /auth/success (인증 성공 후 환승역) 처리
  if (pathname === '/auth/success') {
    if (!refreshToken) {
      console.warn('[Middleware] No refresh token found for /auth/success');
      return NextResponse.redirect(new URL('/login?error=no_refresh_token', request.url));
    }

    try {
      // BFF(/api/auth/refresh) 호출하여 Access Token 교환
      // middleware에서는 내부 API를 fetch로 호출할 때 절대 경로가 필요함
      const refreshUrl = new URL('/api/auth/refresh', request.nextUrl.origin);
      const response = await fetch(refreshUrl.toString(), {
        method: 'POST',
        headers: {
          // 브라우저의 쿠키를 수동으로 전달 (server-to-server call 형태)
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.status}`);
      }

      const data = await response.json();
      const accessToken = data.accessToken;

      if (!accessToken) {
        throw new Error('No access token in refresh response');
      }

      // 최종 목적지 결정 (쿠키에서 추출 혹은 기본값 '/')
      const redirectTo = request.cookies.get('redirect_to')?.value || '/';
      const res = NextResponse.redirect(new URL(redirectTo, request.url));

      const isSecure = request.nextUrl.protocol === 'https:';

      // 2. Access Token을 쿠키에 설정 (auth-utils.ts 설정과 동일하게 유지)
      res.cookies.set('baristation-auth-token', accessToken, {
        path: '/',
        maxAge: 604800, // 7일
        sameSite: 'lax',
        secure: isSecure,
      });

      // 3. BFF 응답에 포함된 다른 쿠키들(예: refreshToken)을 브라우저로 전달
      const setCookies = response.headers.getSetCookie();
      if (setCookies.length > 0) {
        setCookies.forEach((cookie) => {
          // 로컬 http 환경이라면 secure 속성을 강제로 제거
          const fixedCookie = isSecure ? cookie : cookie.replace(/Secure;/gi, '');
          res.headers.append('set-cookie', fixedCookie);
        });
      }

      // 4. 만약 JSON 바디에 refreshToken이 직접 왔다면 (헤더에 없을 경우 대비)
      if (data.refreshToken && !res.cookies.get('refreshToken')) {
        res.cookies.set('refreshToken', data.refreshToken, {
          path: '/',
          httpOnly: true,
          secure: isSecure,
          sameSite: 'lax',
          maxAge: 2592000,
        });
      }

      // 리다이렉트용 임시 쿠키 삭제
      res.cookies.delete('redirect_to');

      return res;
    } catch (error) {
      console.error('[Middleware] Auth Success Processing Error:', error);
      const errorMsg = error instanceof Error ? encodeURIComponent(error.message) : 'unknown';
      return NextResponse.redirect(
        new URL(`/login?error=exchange_failed&details=${errorMsg}`, request.url),
      );
    }
  }

  // 3. 미래의 보호된 경로(Protected Routes) 처리 예시
  // 현재는 요구사항에 따라 /beans, /playground 등은 제외됨
  // 필요 시 아래 matcher에 경로를 추가하고 여기서 로직 처리 가능

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
