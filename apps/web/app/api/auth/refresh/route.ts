import { NextRequest, NextResponse } from 'next/server';

/**
 * BFF (Backend For Frontend) Token Refresh Handler
 *
 * [동작 원리]
 * 1. 클라이언트(Success Page)로부터 Authorization: Bearer <Refresh_Token> 요청을 받음
 * 2. 실제 백엔드의 /api/auth/refresh 엔드포인트로 해당 토큰을 전달
 * 3. 백엔드로부터 발급된 Access Token을 수령하여 클라이언트에 반환
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const backendBaseUrl = process.env.BACKEND_URL;

  if (!backendBaseUrl) {
    console.error('Missing BACKEND_URL environment variable');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const refreshUrl = `${backendBaseUrl}/api/auth/refresh`;

  try {
    // 1. 쿠키에서 refreshToken 추출
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token found in cookies' }, { status: 401 });
    }

    const requestHeaders = new Headers();
    // 2. 백엔드 명세에 맞춰 헤더 설정 (Bearer 없이 Refresh-Token 키 사용)
    requestHeaders.set('Refresh-Token', refreshToken);
    requestHeaders.set('Content-Type', 'application/json');

    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: requestHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend refresh failed: ${errorText}` },
        { status: response.status },
      );
    }

    const json = await response.json();

    // 3. 백엔드 응답 구조(data.accessToken)에 맞춰 데이터 가공
    if (json.status === 'SUCCESS' && json.data) {
      const res = NextResponse.json({
        accessToken: json.data.accessToken,
        message: json.message,
      });

      // 4. 새로운 refreshToken이 있다면 브라우저 쿠키 업데이트 (HttpOnly)
      // 백엔드가 Set-Cookie를 내려주지 않고 바디로만 준 경우를 위해 처리
      if (json.data.refreshToken) {
        const isSecure = request.nextUrl.protocol === 'https:';
        res.cookies.set('refreshToken', json.data.refreshToken, {
          path: '/',
          httpOnly: true,
          secure: isSecure,
          sameSite: 'lax',
          maxAge: 2592000, // 30일
        });
      }

      return res;
    }

    return NextResponse.json(
      { error: json.message || 'Unknown error from backend' },
      { status: 400 },
    );
  } catch (error) {
    console.error('BFF Refresh Error:', error);
    return NextResponse.json({ error: 'Internal Server Error in BFF Refresh' }, { status: 500 });
  }
}
