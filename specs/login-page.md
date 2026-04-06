# 로그인 페이지 명세서 (Login Page)

## 1. 페이지 개요

Dripnote 서비스의 모든 기능을 이용하기 위한 진입점입니다. 2030 타겟의 편의성을 고려하여 번거로운 가입 절차를 배제하고 **소셜 로그인 전용** 시스템을 채택합니다. 디자인 명세서의 "Visual-First" 원칙에 따라 텍스트를 최소화하고 이미지가 주는 감성을 극대화합니다.

## 2. 주요 구성 요소 (UI/UX)

### 2.1 배경 및 레이아웃 (Background & Layout)

- **Visual Dominance**: 고감도의 커피 브루잉 스틸컷 또는 차분한 로스터리 공간 이미지가 화면 전체의 80% 이상을 차지합니다.
- **Background Overlay**: 이미지 위에 은은한 블랙/브라운 그라데이션 오버레이를 적용하여 콘텐츠의 가독성과 지적인 분위기를 동시에 확보합니다.

### 2.2 브랜드 아이덴티티 및 슬로건 (Branding)

- **Logo**: 화면 상단 중앙에 **"Dripnote"** 로고(Playfair Display)를 배치합니다.
- **Punchy Headline**: "Dripnote 시작하기" (한 문장 이내로 제한).

### 2.3 소셜 로그인 그룹 (Social Login Group)

- **구성**: 구글(Google), 네이버(Naver), 카카오(Kakao) 3가지 소셜 로그인을 제공합니다.
- **버튼 디자인**:
  - 각 플랫폼의 브랜드 컬러와 아이콘 사용.
  - 터치 친화적인 규격 (Height: 52px 이상, Full Width).
  - 디자인 명세서의 "Linear Fluidity"를 적용하여 호버/터치 시 부드럽고 빠른 응답 제공.

---

## 3. 아키텍처 및 컴포넌트 계층 (Architecture)

### 3.1 컴포넌트 트리

- `LoginPage` (app/login/page.tsx)
  - `LoginBackground` (전체 배경 이미지 및 오버레이)
  - `LoginHeader` (로고 및 슬로건)
  - `SocialLoginSection` (소셜 버튼 그룹)
    - `SocialButton` (Google)
    - `SocialButton` (Naver)
    - `SocialButton` (Kakao)

---

## 4. 핵심 동작 요구사항

- **소셜 전용 로그인**: 자체 가입 폼 없이 제공된 소셜 계정으로만 인증을 처리합니다.
- **빠른 응답성**: 버튼 클릭 시 선형적(Linear)인 속도감으로 인증 단계로 진입합니다.
- **인증 토큰 관리**: 소셜 인증 성공 후 서버로부터 전달받은 JWT 토큰을 로컬/쿠키에 저장하고 메인 페이지로 라우팅합니다.

---

## 5. API 및 인증 연동 명세

### 5.1 소셜 로그인 엔드포인트 (Authorization)

사용자가 각 소셜 버튼을 클릭할 시 다음 경로로 **서버 사이드 리다이렉트**를 시도합니다.

| 소셜 플랫폼 | OAuth2 Authorization Path (Server)                  |
| :---------- | :-------------------------------------------------- |
| **Google**  | `http://localhost:8080/oauth2/authorization/google` |
| **Naver**   | `http://localhost:8080/oauth2/authorization/naver`  |
| **Kakao**   | `http://localhost:8080/oauth2/authorization/kakao`  |

### 5.2 인증 성공 후 콜백 (Response URL)

소셜 인증이 성공하면 서버는 프론트엔드의 메인 페이지로 다음과 같이 리다이렉트합니다.

- **Redirect URL**: `http://localhost:3000/main?token={JWT}`
- **프론트엔드 처리**:
  1. 쿼리 파라미터(`token`)에서 **JWT**를 추출합니다.
  2. 추출된 JWT를 브라우저의 보안 스토리지(Cookie 또는 LocalStorage)에 저장합니다.
  3. 토큰 저장 완료 후 메인 페이지를 정상적으로 렌더링합니다.
