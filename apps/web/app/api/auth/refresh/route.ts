import { NextRequest, NextResponse } from 'next/server';

import { authService } from '@/lib/services/auth-service';

/**
 * BFF (Backend For Frontend) Token Refresh Handler
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 쿠키에서 refreshToken 추출
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token found in cookies' }, { status: 401 });
    }

    // 2. 서비스를 통해 백엔드 토큰 갱신 수행
    const result = await authService.refreshAccessToken(refreshToken);

    const res = NextResponse.json({
      accessToken: result.accessToken,
      message: result.message,
    });

    // 3. 새로운 refreshToken이 있다면 브라우저 쿠키 업데이트
    if (result.refreshToken) {
      const isSecure = request.nextUrl.protocol === 'https:';
      res.cookies.set('refreshToken', result.refreshToken, {
        path: '/',
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 2592000, // 30일
      });
    }

    return res;
  } catch (error) {
    console.error(`[Refresh API] Error:`, error);

    // 보안을 위해 상세한 에러는 서버에 로그로만 남기고 클라이언트에는 일반적인 메시지 반환
    return NextResponse.json(
      {
        error: 'Authentication refresh failed',
        code: 'REFRESH_BACKEND_ERROR',
      },
      { status: 500 },
    );
  }
}
