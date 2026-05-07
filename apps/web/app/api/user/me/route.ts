import { NextRequest, NextResponse } from 'next/server';

import { AUTH_TOKEN_KEY } from '@/lib/utils/auth-utils';
import { getMockUserInfo } from '@/lib/utils/user-mock';

/**
 * GET /api/user/me
 *
 * 현재 로그인한 유저의 정보를 반환하는 BFF 엔드포인트.
 * accessToken 쿠키를 읽어 백엔드에 전달하고, 유저 정보를 중계합니다.
 *
 * [백엔드 연동 방법]
 * 아래 TODO 섹션의 주석을 해제하고, 실제 백엔드 유저 정보 API 경로를 설정하세요.
 * 예: GET {BACKEND_URL}/api/member/me (Authorization: Bearer {accessToken})
 */
export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ─────────────────────────────────────────────────────────────
  // TODO: 백엔드 유저 정보 API 연동
  // 백엔드 /api/member/me 또는 유사한 엔드포인트가 준비되면
  // 아래 주석을 해제하고 실제 엔드포인트로 교체하세요.
  // ─────────────────────────────────────────────────────────────
  //
  // const backendUrl = process.env.BACKEND_URL;
  // if (!backendUrl) {
  //   return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  // }
  //
  // try {
  //   const res = await fetch(`${backendUrl}/api/member/me`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     signal: AbortSignal.timeout(5000),
  //   });
  //
  //   if (!res.ok) {
  //     if (res.status === 401) {
  //       return NextResponse.json({ error: 'Token expired' }, { status: 401 });
  //     }
  //     return NextResponse.json({ error: 'Failed to fetch user info' }, { status: res.status });
  //   }
  //
  //   const data = await res.json();
  //   return NextResponse.json({ user: data.data });
  // } catch (error) {
  //   console.error('[UserMe] 백엔드 요청 실패:', error);
  //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  // }
  // ─────────────────────────────────────────────────────────────

  // 현재: JWT payload 파싱으로 유저 정보 추출 (백엔드 연동 전 임시)
  const user = getMockUserInfo(accessToken);
  return NextResponse.json({ user });
}
