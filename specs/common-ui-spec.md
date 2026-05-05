# 공통 UI 명세서 (Common UI Spec) - Baristation

## 1. 개요

Baristation 서비스의 모든 페이지에서 일관된 사용자 경험(UX)과 시각적 정체성(Visual Identity)을 유지하고, 최적의 성능(FCP/LCP)을 보장하기 위한 최상위 명세입니다.

---

## 2. 브랜드 정체성 (Brand Identity)

### 2.1 컨셉: "Internal Coffee Lab"

- **Mood**: 차분하고 지적인 연구소(Laboratory) 분위기.
- **Principle**: "Show, Don't Just Tell". 불필요한 텍스트 설명을 지양하고 고감도 이미지와 여백을 통해 전문성을 전달합니다.
- **Target**: 스페셜티 커피의 전문성을 즐기는 2030 세대.

---

## 3. 디자인 토큰 (Design Tokens)

모든 디자인 토큰은 `apps/web/app/globals.css`의 `@theme` 블록 내에 CSS 변수 형태로 정의하여 사용합니다. 이는 Tailwind CSS v4의 CSS-first 설정 방식에 따르며, 정의된 토큰은 자동으로 유틸리티 클래스로 변환되어 재사용됩니다.

### 3.1 시맨틱 컬러 시스템 (Semantic Colors)

원시 컬러(Hex)를 직접 사용하지 않고, 역할 기반의 시맨틱 토큰을 사용합니다.

| Token Name        | Base Value                         | Usage                               |
| :---------------- | :--------------------------------- | :---------------------------------- |
| `brand-primary`   | `Amber-500` (#F59E0B)              | 주요 강조 색상, CTA 버튼, 활성 상태 |
| `brand-secondary` | `Espresso-500` (#6D4C41)           | 보조 강조 색상, 로스팅 정보         |
| `surface-base`    | `Primary-Surface` (#1A1614)        | 애플리케이션 기본 배경색 (Dark)     |
| `surface-card`    | `Secondary-Surface` (#2A2522)      | 카드 컴포넌트, 드롭다운 배경        |
| `text-main`       | `Tertiary-Surface` (#FAF7F5)       | 기본 본문 텍스트, 읽기 전용 정보    |
| `text-muted`      | `Gray-400` (#9CA3AF)               | 보조 텍스트, 캡션, 비활성 상태      |
| `border-subtle`   | `White/5` (rgba(255,255,255,0.05)) | 컴포넌트 경계선, 유리 질감 구분선   |

### 3.2 타이포그래피 (Fluid Typography)

화면 크기에 따라 유동적으로 변화하는 `clamp()` 기반의 타이포그래피를 지향합니다.

- **Headings (Logo & Hero)**: `Playfair Display`
  - 클래식하고 지적인 느낌. 브랜드 정체성 강조에 사용.
- **Sub-Headings & Labels**: `Outfit`
  - 현대적이고 기하학적인 느낌. 섹션 제목 및 데이터 레이블에 사용.
- **Body & Info**: `Inter`
  - 고가독성 산세리프. 일반 본문 및 정보 전달에 사용.
- **Fluid Scale**: 주요 타이틀은 `clamp(2rem, 5vw, 4rem)`와 같은 유동적 크기를 적용하여 모바일/데스크톱 대응을 자동화합니다.

### 3.3 Z-Index 레이어 맵 (Z-Index Management)

레이어 간 간섭을 방지하기 위해 전역 레이어 순서를 표준화합니다.

| Level      | Value | Usage                      |
| :--------- | :---- | :------------------------- |
| `modal`    | `100` | 모달, 풀스크린 오버레이    |
| `drawer`   | `90`  | 필터 드로어, 모바일 메뉴   |
| `overlay`  | `80`  | 다크 배경 스크림 (Scrim)   |
| `header`   | `50`  | 글로벌 네비게이션 바 (GNB) |
| `dropdown` | `40`  | 셀렉트 박스, 팝오버        |
| `base`     | `0`   | 일반 콘텐츠 영역           |

---

## 4. 성능 및 에셋 최적화 (Performance & Optimization)

이미지 중심 서비스의 특성을 고려하여 FCP(First Contentful Paint)와 LCP(Largest Contentful Paint) 최적화를 최우선으로 합니다.

### 4.1 이미지 로딩 전략

- **Priority Loading**: 각 페이지의 LCP 요소(Hero Image 등)에는 반드시 `next/image`의 `priority` 속성을 부여합니다.
- **Placeholder Skeleton**: 비동기로 이미지를 불러올 때 해당 영역을 비워두지 않고, 최종 레이아웃 크기와 동일한 `Skeleton` UI를 노출하여 레이아웃 시프트(CLS)를 방지합니다.
- **Linear Fade-in**: 이미지가 로드되었을 때 갑자기 나타나지 않도록 `framer-motion`을 사용하여 빠르지만 부드러운 선형 페이드인 효과를 적용합니다.
  - `initial: { opacity: 0 }`, `animate: { opacity: 1 }`, `transition: { duration: 0.3, ease: "linear" }`
- **Format**: 모든 이미지는 WebP 또는 AVIF 포맷을 우선적으로 사용하여 용량을 최소화합니다.

### 4.2 클라이언트 성능

- **Bundle Size**: 외부 라이브러리 도입 시 번들 사이즈를 체크하며, 인터랙션이 없는 정적 콘텐츠는 가급적 서버 컴포넌트에서 처리합니다.

---

## 5. 아키텍처 및 구현 원칙 (Implementation Principles)

### 5.1 Server-first Approach

- **Client Component 최소화**: 인터랙션(상태 관리, 이벤트 핸들러 등)이 반드시 필요한 말단 컴포넌트만 `'use client'`를 사용합니다.
- **모듈화**: 복잡한 클라이언트 로직은 독립된 모듈로 추출하여 서버 컴포넌트 내에서 호출하는 구조를 유지합니다.

### 5.2 웹 접근성 (Accessibility)

- **Focus States**: 모든 대화형 요소에는 `brand-primary` 색상의 명확한 Focus Ring(`ring-2 ring-offset-2`)을 적용합니다.
- **Semantic HTML**: UI를 위한 `div` 중첩을 지양하고 `section`, `article`, `nav`, `aside` 등 의미론적 태그를 사용합니다.
- **ARIA**: 복잡한 상태를 가진 컴포넌트(드로어, 탭 등)는 적절한 ARIA 속성을 부여하여 스크린 리더 사용성을 보장합니다.

---

## 6. 공통 UI 패턴 (Shared Patterns)

### 6.1 시각적 카드 패턴 (Visual Card Pattern)

- **Component**: `ui-library`의 `VisualCard` Compound Component를 사용합니다.
- **Loading UX**: 이미지 로딩 전까지 카드 형태의 Skeleton을 유지하며, 로드 완료 시 콘텐츠와 이미지가 부드럽게 페이드인됩니다.
- **Interaction**: 호버 시 이미지 `scale-105` 확대 및 오버레이 콘텐츠의 미세한 상향 이동(`translate-y-[-4px]`)을 적용합니다.

### 6.2 레이아웃 컨테이너 (Section Layout)

- 모든 섹션은 `max-w-7xl` 중앙 정렬 가이드라인을 준수하며, 모바일에서도 일관된 `px-8` 여백을 제공하여 프리미엄한 공간감을 유지합니다.

---

## 7. 하방 호환성 (Harness Capability)

- 모든 공통 UI는 백엔드 API가 준비되지 않은 상태에서도 기능을 검증할 수 있도록 Mock Data 인터페이스를 지원해야 합니다.
- 에이전트(Agent)가 자율적으로 UI를 테스트할 수 있도록 각 요소에는 고유한 `data-testid` 또는 식별 가능한 ID를 부여합니다.
