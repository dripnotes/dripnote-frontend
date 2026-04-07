# 로그인 페이지 명세서 (Login Page)

## 1. 페이지 개요

Dripnote 서비스의 모든 기능을 이용하기 위한 진입점입니다. 2030 타겟의 편의성을 고려하여 번거로운 가입 절차를 배제하고 **소셜 로그인 전용** 시스템을 채택합니다.

**집중된 사용자 경험(Focused Experience)** 원칙에 따라, 로그인 페이지는 인증 이외의 다른 기능이나 내비게이션 요소와의 상호작용을 배제하고 오직 로그인에만 완전히 집중할 수 있도록 디자인합니다.

> **변경 사유 (Context)**: 지능적이고 전문적인 'Internal Coffee Lab' 컨셉을 유지하기 위해, 사용자에게 불필요한 선택지를 배제하고 브랜드 무드에 깊이 몰입하게 하는 UX 전략을 최우선으로 채택했습니다. (Rule 21 적용)

## 2. 디자인 시스템 및 원칙 (Design System)

### 2.1 브랜드 아이덴티티: "Internal Coffee Lab"

커피를 연구하고 기록하는 지적인 공간(Laboratory)의 이미지를 현대적으로 재해석합니다. "Show, Don't Just Tell" 원칙에 따라 고해상도 이미지가 무드를 주도하게 설계합니다.

### 2.2 디자인 토큰 (Design Tokens)

- **Colors**:
  - `Primary-Surface`: #1A1614 (Espresso Dark)
  - `Secondary-Surface`: #2A2522
  - `Tertiary-Surface`: #FAF7F5 (Cream Foam)
- **Typography**:
  - `Headings (Logo)`: Playfair Display
  - `Sub-Headings`: Outfit
  - `Body`: Inter
- **Motion**: "Fast & Linear Fluids" (Duration 0.2s ~ 0.4s, 선형적인 부드러움 강조)

## 3. 주요 구성 요소 (UI/UX)

### 3.1 배경 및 레이아웃 (Background & Layout)

- **Focused Layout**: 일반적인 네비게이션 헤더, 푸터, 사이드바 등을 전면 배제하여 사용자가 인증 과정 외의 다른 기능으로 이탈하는 것을 방지합니다.
- **Visual Dominance**: 고감도의 커피 브루잉 스틸컷 또는 차분한 로스터리 공간 이미지가 화면 전체의 80% 이상을 차지합니다.
- **Background Overlay**: 이미지 위에 은은한 블랙/브라운 그라데이션 오버레이를 적용하여 콘텐츠의 가독성과 지적인 분위기를 동시에 확보합니다.

> **변경 사유 (Context)**: 로그인 페이지 본연의 목적인 '인증'에 100% 집중할 수 있게 하여 전환율을 높이고, 일반적인 웹 서비스의 복잡함을 걷어낸 프리미엄 디자인(Show, Don't Just Tell)을 강조하기 위함입니다.

### 3.2 브랜드 아이덴티티 및 슬로건 (Branding)

- **Logo**: 화면 상단 중앙에 **"Dripnote"** 로고(Playfair Display)를 배치합니다.
- **Punchy Headline**: "Dripnote 시작하기" (한 문장 이내로 제한).

### 3.3 소셜 로그인 그룹 (Social Login Group)

- **구성**: 구글(Google), 네이버(Naver), 카카오(Kakao) 3가지 소셜 로그인을 제공합니다.
- **버튼 디자인 및 브랜드 가이드**:
  - 각 플랫폼의 공식 브랜드 가이드라인을 준수하여 아이콘, 색상, 텍스트 배치를 설계합니다.
    - [구글 브랜드 가이드라인](https://developers.google.com/identity/branding-guidelines?hl=ko)
    - [네이버 로그인 BI 가이드](https://developers.naver.com/docs/login/bi/bi.md)
    - [카카오 디자인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide)

> **변경 사유 (Context)**: 각 플랫폼의 공식 검수 통과 및 브랜드 아이덴티티 보호를 위해 공식 가이드를 필수 준수 사항으로 명시했습니다.

- 터치 친화적인 규격 (Height: 52px 이상, Full Width).
- 디자인 명세서의 "Linear Fluidity"를 적용하여 호버/터치 시 부드럽고 빠른 응답 제공.

## 4. 아키텍처 및 컴포넌트 계층 (Architecture)

### 4.1 컴포넌트 트리

- `LoginPage` (app/login/page.tsx)
  - `LoginBackground` (전체 배경 이미지 및 오버레이)
  - `LoginHeader` (로고 및 슬로건)
  - `SocialLoginSection` (소셜 버튼 그룹)
    - `SocialButton` (Google)
    - `SocialButton` (Naver)
    - `SocialButton` (Kakao)

---

## 5. 핵심 동작 요구사항

- **소셜 전용 로그인**: 자체 가입 폼 없이 제공된 소셜 계정으로만 인증을 처리합니다.
- **빠른 응답성**: 버튼 클릭 시 선형적(Linear)인 속도감으로 인증 단계로 진입합니다.
- **인증 토큰 관리**: 소셜 인증 성공 후 서버로부터 전달받은 JWT 토큰을 로컬/쿠키에 저장하고 메인 페이지로 라우팅합니다.

---

## 6. API 및 인증 연동 명세

### 6.1 소셜 로그인 엔드포인트 (Authorization)

사용자가 각 소셜 버튼을 클릭할 시 다음 경로로 **서버 사이드 리다이렉트**를 시도합니다.

| 소셜 플랫폼 | OAuth2 Authorization Path (Server)                  |
| :---------- | :-------------------------------------------------- |
| **Google**  | `http://localhost:8080/oauth2/authorization/google` |
| **Naver**   | `http://localhost:8080/oauth2/authorization/naver`  |
| **Kakao**   | `http://localhost:8080/oauth2/authorization/kakao`  |

### 6.2 인증 성공 후 콜백 (Response URL)

소셜 인증이 성공하면 서버는 프론트엔드의 메인 페이지로 다음과 같이 리다이렉트합니다.

- **Redirect URL**: `http://localhost:3000/main?token={JWT}`
- **프론트엔드 처리**:
  1. 쿼리 파라미터(`token`)에서 **JWT**를 추출합니다.
  2. 추출된 JWT를 브라우저의 보안 스토리지(Cookie 또는 LocalStorage)에 저장합니다.
  3. 토큰 저장 완료 후 메인 페이지를 정상적으로 렌더링합니다.
