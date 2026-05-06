/**
 * Auth Utilities - JWT 토큰 저장 및 추출 관리
 * - Middleware에서 접근 가능하도록 localStorage 대신 Cookie를 사용합니다.
 */

export const AUTH_TOKEN_KEY = 'baristation-auth-token';

export const authUtils = {
  /**
   * 토큰을 쿠키에 저장합니다.
   */
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      const isSecure = window.location.protocol === 'https:';
      // 7일간 유지, SameSite=Lax 설정
      document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=Lax${
        isSecure ? '; Secure' : ''
      }`;
    }
  },

  /**
   * 쿠키에서 토큰을 가져옵니다.
   */
  getToken: () => {
    if (typeof window !== 'undefined') {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${AUTH_TOKEN_KEY}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
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
