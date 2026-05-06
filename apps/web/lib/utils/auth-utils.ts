/**
 * Auth Utilities - JWT 토큰 저장 및 추출 관리
 * - Middleware에서 접근 가능하도록 localStorage 대신 Cookie를 사용합니다.
 */

export const AUTH_TOKEN_KEY = 'baristation-auth-token';
export const REDIRECT_COOKIE_KEY = 'redirect_to';

/**
 * 보안을 위해 내부 경로인지 확인합니다 (Open Redirect 방지)
 * - '/'로 시작해야 함
 * - '//'로 시작하면 안 됨
 * - 스키마(http:, https:)가 포함되면 안 됨
 */
export const isValidInternalPath = (path: string | null): boolean => {
  if (!path) return false;
  return path.startsWith('/') && !path.startsWith('//') && !path.includes(':');
};

/**
 * 공통 쿠키 옵션 생성기
 */
export const getAuthCookieOptions = (isSecure: boolean, maxAgeSeconds: number = 604800) => {
  return {
    path: '/',
    maxAge: maxAgeSeconds,
    sameSite: 'lax' as const,
    secure: isSecure,
  };
};

export const authUtils = {
  /**
   * 토큰을 쿠키에 저장합니다.
   */
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      const isSecure = window.location.protocol === 'https:';
      const options = getAuthCookieOptions(isSecure);

      const encodedToken = encodeURIComponent(token);
      let cookieString = `${AUTH_TOKEN_KEY}=${encodedToken}; path=${options.path}; max-age=${options.maxAge}; SameSite=${options.sameSite}`;
      if (options.secure) cookieString += '; Secure';

      document.cookie = cookieString;
    }
  },

  /**
   * 쿠키에서 토늘을 정확하게 가져옵니다 (정확한 이름 매칭)
   */
  getToken: () => {
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(new RegExp('(^| )' + AUTH_TOKEN_KEY + '=([^;]+)'));
      if (match) return decodeURIComponent(match[2]);
    }
    return null;
  },

  /**
   * 토큰을 제거합니다.
   */
  removeToken: () => {
    if (typeof window !== 'undefined') {
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=-1; SameSite=Lax`;
    }
  },

  /**
   * 인증 여부를 확인합니다.
   */
  isAuthenticated: () => {
    return !!authUtils.getToken();
  },
};
