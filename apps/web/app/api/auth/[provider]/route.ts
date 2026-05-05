import { NextRequest, NextResponse } from 'next/server';

/**
 * BFF (Backend For Frontend) OAuth Authorization Redirect Handler
 *
 * [동작 원리]
 * 1. 클라이언트로부터 /api/auth/[provider] 요청을 받음
 * 2. 실제 백엔드 주소로 'manual' 리다이렉트 요청을 보냄
 * 3. 백엔드의 302 응답에서 Location 헤더(구글/네이버 로그인 창 주소)를 추출
 * 4. 브라우저에게 해당 주소로 리다이렉트 하라고 응답 (백엔드 주소 은닉)
 */
export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
  const { provider } = params;
  const backendBaseUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  const backendUrl = `${backendBaseUrl}/oauth2/authorization/${provider}`;

  try {
    // 1. 브라우저의 요청 헤더(쿠키 등)를 백엔드로 전달
    const requestHeaders = new Headers();
    const cookie = request.headers.get('cookie');
    if (cookie) requestHeaders.set('cookie', cookie);

    // User-Agent 등 보안상 필요한 헤더 전달
    const userAgent = request.headers.get('user-agent');
    if (userAgent) requestHeaders.set('user-agent', userAgent);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: requestHeaders,
      redirect: 'manual', // 302 응답을 직접 처리하기 위함
    });

    // 2. 백엔드로부터 받은 리다이렉트 주소 추출
    const redirectUrl = response.headers.get('location');

    if (redirectUrl) {
      const res = NextResponse.redirect(redirectUrl);

      // 3. 백엔드에서 설정한 쿠키(JSESSIONID 등)를 브라우저로 전달
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        res.headers.set('set-cookie', setCookie);
      }

      return res;
    }

    return NextResponse.json(
      { error: 'Failed to retrieve redirect location from backend' },
      { status: 500 },
    );
  } catch (error) {
    console.error(`BFF Auth Error (${provider}):`, error);
    return NextResponse.json({ error: 'Internal Server Error in BFF' }, { status: 500 });
  }
}
