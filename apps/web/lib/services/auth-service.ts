/**
 * AuthService - 백엔드 인증 서버와의 통신을 전담하는 서비스 클래스
 * - 미들웨어와 API Route에서 공통으로 사용합니다.
 */
export const authService = {
  /**
   * Refresh Token을 사용하여 새로운 Access Token을 발급받습니다.
   */
  refreshAccessToken: async (refreshToken: string) => {
    const backendBaseUrl = process.env.BACKEND_URL;
    if (!backendBaseUrl) {
      throw new Error('BACKEND_URL environment variable is not defined');
    }

    const refreshUrl = `${backendBaseUrl}/api/auth/refresh`;

    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Refresh-Token': refreshToken,
        'Content-Type': 'application/json',
      },
      // 5초 타임아웃
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend refresh failed (${response.status}): ${errorText}`);
    }

    const json = await response.json();

    if (json.status !== 'SUCCESS' || !json.data) {
      throw new Error(json.message || 'Invalid refresh response from backend');
    }

    return {
      accessToken: json.data.accessToken,
      refreshToken: json.data.refreshToken, // 새로 발급된 토큰이 있을 경우
      message: json.message,
      status: response.status,
    };
  },
};
