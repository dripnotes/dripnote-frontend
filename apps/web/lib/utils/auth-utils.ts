/**
 * Auth Utilities - JWT 토큰 저장 및 추출 관리
 */

const AUTH_TOKEN_KEY = 'baristation-auth-token';

export const authUtils = {
  /**
   * 토큰을 스토리지에 저장합니다.
   */
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  },

  /**
   * 스토리지에서 토큰을 가져옵니다.
   */
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  /**
   * 토큰을 제거합니다.
   */
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  },

  /**
   * 인증 여부를 확인합니다.
   */
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return false;
  },
};
