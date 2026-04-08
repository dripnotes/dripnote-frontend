'use client';

import { useState, useEffect } from 'react';

import { authUtils } from '@/lib/utils/auth-utils';
import { getMockUserInfo, User } from '@/lib/utils/user-mock';

/**
 * 전역 인증 상태를 관리하고 하이드레이션 이슈를 처리하기 위한 훅
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Storage에서 토근 확인
    const token = authUtils.getToken();

    // 2. 토큰 존재 시 가상 유저 정보 로드 (하네스 단계)
    if (token) {
      const userInfo = getMockUserInfo(token);
      setUser(userInfo);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    // 3. 로딩 완료 (Next.js Hydration 대응)
    setIsLoading(false);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
