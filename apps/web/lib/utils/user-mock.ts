/**
 * Mock User Utility - 백엔드 API 부재 시 가상 유저 정보를 제공합니다.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export const MOCK_USER: User = {
  id: 'user_01',
  name: '재현',
  email: 'jaehyeon@example.com',
  avatarUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
};

/**
 * 토큰 유효성 검증 및 유저 정보 반환 시뮬레이션
 */
export const getMockUserInfo = (token: string | null): User | null => {
  if (!token) return null;

  // 실제 서비스에서는 토큰 디코딩 혹은 API 호출이 이루어지는 부분
  // 하네스 단계에서는 특정 토큰 값에 관계없이 가상 유저를 반환합니다.
  return MOCK_USER;
};
