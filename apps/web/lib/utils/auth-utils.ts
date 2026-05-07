/**
 * 인증 관련 상수 및 유틸리티
 *
 * - 미들웨어(Edge Runtime), 클라이언트 컴포넌트, BFF Route Handler 모두에서 사용 가능
 * - Node.js 전용 모듈 사용 금지 (Edge Runtime 호환)
 */

/** 브라우저 쿠키에 저장되는 Access Token 키 */
export const AUTH_TOKEN_KEY = 'baristation-auth-token';

/** OAuth 로그인 후 복귀할 경로를 임시 저장하는 쿠키 키 */
export const REDIRECT_COOKIE_KEY = 'baristation-redirect-to';

/**
 * 오픈 리다이렉트 공격 방지를 위한 내부 경로 검증
 * - 외부 도메인(http://, https://, //) 시작 경로 거부
 * - 상대 경로('/')로 시작하는 내부 경로만 허용
 */
export function isValidInternalPath(path: string): boolean {
  if (!path || typeof path !== 'string') return false;

  // 외부 URL 패턴 거부
  if (/^https?:\/\//i.test(path)) return false;
  if (path.startsWith('//')) return false;

  // 프로토콜 상대 URL 거부
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/i.test(path)) return false;

  // 반드시 '/'로 시작하는 절대 경로만 허용
  return path.startsWith('/');
}

/**
 * 클라이언트 사이드 인증 유틸
 * SSR 환경(window 없음)에서 안전하게 동작
 */
export const authUtils = {
  /**
   * 쿠키에서 Access Token을 읽어 반환
   * HttpOnly가 아닌 일반 쿠키이므로 JS에서 접근 가능
   */
  getToken(): string | null {
    if (typeof document === 'undefined') return null;

    const match = document.cookie.split('; ').find((row) => row.startsWith(`${AUTH_TOKEN_KEY}=`));

    return match ? decodeURIComponent(match.split('=')[1]) : null;
  },

  /**
   * Access Token 쿠키 삭제
   * 로그아웃 등에서 사용
   */
  removeToken(): void {
    if (typeof document === 'undefined') return;

    document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  },

  /**
   * 현재 인증 상태 확인 (토큰 존재 여부)
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
