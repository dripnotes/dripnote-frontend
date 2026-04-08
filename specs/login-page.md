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
- **Background Overlay**: 이미지 위에 에스프레소 다크(#1A1614) 기반의 선형 그라데이션 오버레이를 적용하여 콘텐츠의 가독성과 지적인 분위기를 동시에 확보합니다.
- **Ken Burns Effect**: 정적인 배경에 생동감을 부여하기 위해 20초 이상의 긴 호흡으로 이미지가 매우 미세하게 확대되는 효과를 적용합니다.

> **변경 사유 (Context)**: 로그인 페이지 본연의 목적인 '인증'에 100% 집중할 수 있게 하여 전환율을 높이고, 정적인 이미지가 주는 지루함을 탈피하여 완성도 높은 프리미엄 디자인(Ken Burns Effect)을 강조하기 위함입니다. (Rule 21 적용)

### 3.2 브랜드 아이덴티티 및 슬로건 (Branding)

- **Logo**: 화면 상단 중앙에 **"Dripnote"** 로고(Playfair Display, Font-weight: Extrabold)를 배치합니다. 로고 하단에 적절한 여백(`mb-3`)을 두어 슬로건과의 계층 구조를 명확히 합니다.
- **Punchy Headline**: "시작하기" (Outfit, Light, Uppercase, `tracking-[0.2em]`).

> **변경 사유 (Context)**: '연구소(Lab)' 특유의 간결하고 철저한 이미지를 시각화하기 위해 대문자와 넓은 자간을 활용한 미니멀 타이포그래피 전략을 채택했습니다. (Rule 21 적용)

### 3.3 내비게이션 (Navigation)

- **Back to Main**: 화면 좌측 상단에 메인 페이지('/')로 돌아갈 수 있는 **"main"** 텍스트 버튼을 배치합니다.
- **디자인 원칙**: 배경과 이질감을 최소화하기 위해 테두리와 배경색을 배제한 **최니멀 텍스트 전용(Minimalist Text-only)** 스타일을 유지하며, 소문자 사용과 넓은 자간을 통해 절제된 미학을 표현합니다.

> **변경 사유 (Context)**: Focused Layout의 원칙을 유지하되, 내비게이션 요소가 메인 콘텐츠(인증)의 시각적 흐름을 방해하지 않도록 가장 정제된 형태의 UI를 적용했습니다. (Rule 21 적용)

### 3.4 소셜 로그인 그룹 (Social Login Group)

- **구성**: 구글(Google), 네이버(Naver), 카카오(Kakao) 3가지 소셜 로그인을 제공합니다.
- **버튼 디자인 및 브랜드 연동**:
  - 각 플랫폼의 공식 브랜드 가이드라인을 철저하게 준수하여 디자인을 설계합니다.
  - 하드코딩된 색상을 지양하고, 최상단 CSS(`:root`)에 소셜 전용 테마 변수를 구축하여 **Tailwind CSS Utility Class(`bg-google`, `text-kakao-foreground` 등)와 완전히 연동**합니다. 이를 통해 코드의 단일 진실 공급원(SSOT)을 확보헙니다.
    - [구글 브랜드 가이드라인](https://developers.google.com/identity/branding-guidelines?hl=ko)
    - [네이버 로그인 BI 가이드](https://developers.naver.com/docs/login/bi/bi.md)
    - [카카오 디자인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide) (텍스트 컬러: `rgba(0, 0, 0, 0.85)` 정확도 준수)

> **변경 사유 (Context)**: 각 플랫폼의 공식 검수 통과 및 브랜드 아이덴티티 규칙을 보호하면서도, 시스템적으로 유지보수가 용이하도록 CSS 변수 맵핑 방식을 도입했습니다.

- **규격 및 마우스 인터랙션**:
  - 터치 친화적인 규격을 일관되게 사용합니다 (Height: 52px 이상, Full Width).
  - 디자인 명세서의 "Linear Fluidity"를 적용하여 버튼과 상호작용(Hover) 시 **버튼이 부드럽게 위로 떠오르며(`-translate-y-0.5`) 그림자(`shadow-sm` -> `shadow-md`)가 풍부하게 강조되는 깊이감 있는 모션**을 세밀하게 적용합니다 (`duration-200 ease-linear`).

## 4. 아키텍처 및 컴포넌트 계층 (Architecture)

### 4.1 컴포넌트 트리

- `LoginPage` (app/login/page.tsx)
  - `LoginBackground` (전체 배경 이미지 및 오버레이)
  - `LoginHeader` (로고 및 슬로건)
  - `SocialLoginSection` (소셜 버튼 그룹)
    - `SocialButton` (Google)
    - `SocialButton` (Naver)
    - `SocialButton` (Kakao)
  - `LoginCallbackPage` (app/login/callback/page.tsx - **NEW**)

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

- **Redirect URL**: `http://localhost:3000/login/callback?token={JWT}` (Harness 전용 콜백 경로 활용)
- **프론트엔드 처리**:
  1. `LoginCallbackPage`에서 URL 쿼리 파라미터(`token`)를 가로채 추출합니다.
  2. `authUtils`를 사용하여 추출된 JWT를 브라우저의 전용 스토리지(`LocalStorage`)에 안전하게 저장합니다.
  3. 토큰 저장 완료 후 메인 랜딩 페이지('/')로 자동 라우팅을 수행합니다.
  4. 메인 페이지의 GNB(Header)는 저장된 토큰 유무를 실시간으로 감지하여 유저 아이콘을 로그아웃 아이콘으로 동적으로 전환합니다.
