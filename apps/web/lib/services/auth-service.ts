/**
 * Auth Service — 백엔드 인증 API 통신 서비스
 *
 * [Edge Runtime 호환]
 * - 순수 fetch API만 사용
 * - Node.js 전용 모듈(fs, http, crypto 등) 사용 금지
 *
 * [사용처]
 * - middleware.ts (Edge Runtime)
 * - app/api/auth/refresh/route.ts (Node.js Runtime)
 */

export interface RefreshResult {
  accessToken: string;
  /** 백엔드가 새로운 refreshToken을 응답 헤더로 돌려주는 경우 */
  refreshToken?: string;
  message: string;
}

interface BackendRefreshResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  } | null;
}

export const authService = {
  /**
   * refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
   *
   * [백엔드 명세]
   * - Request Cookie: refreshToken={jwtRefreshToken}
   * - Response Body: { status, message, data: { accessToken } }
   * - Response Header: refreshToken (갱신된 경우)
   *
   * @param refreshToken - 현재 보유한 Refresh JWT
   * @throws Error - 네트워크 오류, 백엔드 오류, 토큰 없음 등
   */
  async refreshAccessToken(refreshToken: string): Promise<RefreshResult> {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error('[AuthService] BACKEND_URL 환경변수가 설정되지 않았습니다.');
    }

    // 백엔드 토큰 재발급 엔드포인트
    const reissueUrl = `${backendUrl}/reissue`;

    const response = await fetch(reissueUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // refreshToken을 Cookie 헤더로 전달 (백엔드 명세)
        Cookie: `refreshToken=${refreshToken}`,
      },
      // Edge Runtime에서 AbortSignal.timeout 지원 (Next.js 13.4+)
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(
        `[AuthService] 토큰 재발급 실패: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const body: BackendRefreshResponse = await response.json();

    if (body.status !== 'SUCCESS' || !body.data?.accessToken) {
      throw new Error(
        `[AuthService] 백엔드 토큰 재발급 오류: ${body.message ?? '알 수 없는 오류'}`,
      );
    }

    // 백엔드가 새로운 refreshToken을 응답 헤더로 보내는 경우 추출
    const newRefreshToken = response.headers.get('refreshToken') ?? undefined;

    return {
      accessToken: body.data.accessToken,
      refreshToken: newRefreshToken,
      message: body.message,
    };
  },
};
