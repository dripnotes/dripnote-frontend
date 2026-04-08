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
  // Offline 환경 지원을 위해 인라인 데이터 URI (기본 유저 아이콘) 사용
  avatarUrl:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDJ2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==',
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
