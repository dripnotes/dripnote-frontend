'use client';

import { useCallback, useEffect, useState } from 'react';

import { User } from '@/lib/utils/user-mock';

export type { User };

/**
 * 전역 인증 상태를 관리하는 훅
 *
 * [개선 사항]
 * - useEffect의 StorageEvent → 탭 포커스 기반 재검증으로 교체
 *   (StorageEvent는 localStorage 변경만 감지하며, 쿠키 변경에는 동작하지 않음)
 * - getMockUserInfo 직접 호출 → BFF /api/user/me 호출로 교체
 * - logout 함수: DELETE /api/auth/logout 호출 (HttpOnly 쿠키 서버에서 삭제)
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * BFF /api/user/me 를 호출하여 인증 상태와 유저 정보를 갱신합니다.
   * - 401 응답 → 미인증 상태로 초기화
   * - 200 응답 → 유저 정보 설정
   */
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
        // 브라우저 캐시 방지 (항상 최신 상태 확인)
        cache: 'no-store',
      });

      if (res.ok) {
        const data: { user: User } = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      // 네트워크 오류 등 — 인증 상태 초기화
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 로그아웃
   * 1. DELETE /api/auth/logout 호출 → 서버에서 HttpOnly 쿠키 삭제
   * 2. 클라이언트 상태 초기화
   * 3. 로그인 페이지로 이동
   */
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.warn('[useAuth] 로그아웃 API 실패:', error);
    } finally {
      // API 성공/실패 무관하게 클라이언트 상태 초기화
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    // 최초 마운트 시 인증 상태 확인
    fetchUser();

    /**
     * 탭 포커스 시 인증 상태 재검증
     * - 다른 탭에서 로그아웃/로그인한 경우 동기화
     * - StorageEvent 대신 visibilitychange 사용 (쿠키 기반 인증에 적합)
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUser();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    /** 수동으로 인증 상태를 재검증 (예: 로그인 직후 호출) */
    revalidate: fetchUser,
  };
}
