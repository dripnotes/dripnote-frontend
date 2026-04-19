# 공통 UI 명세서 (Common UI Spec)

## 1. 개요 (Context)

Dripnote 서비스의 모든 페이지에서 일관된 사용자 경험(UX)과 시각적 정체성(Visual Identity)을 유지하기 위한 최상위 명세입니다. 개별 페이지 명세서(`specs/*.md`)는 본 공통 명세를 기반으로 작성되어야 합니다.

> **변경 사유 (Context)**:
>
> - 최초 작성: 서비스 규모 확장 시 디자인 일관성이 저해되는 문제를 방지하고, 모든 프로젝트 관련자가 단일한 브랜드 가이드를 공유하기 위해 통합 관리합니다. (Rule 23 적용)
> - 2026-04-08: 모든 페이지의 브랜드 일관성을 위해 카피라이트 문구를 "© 2026 Dripnote. All rights reserved."로 통일함.
> - 2026-04-08 (2차): 과도한 디자인 요소(Uppercase, 넓은 자간)를 제거하고 원래의 담백한 라이트 테마 푸터 스타일을 유지하기로 결정함. (사용자 피드백 반영)
- 2026-04-19: 지표(Rating)의 시각적 위계를 위해 `Amber-Scale` 점진적 색상 시스템 및 공통 레이팅 패턴(`RatingScale`)을 명세에 추가함. (일관성 강화)
- 2026-04-20: 공통 컴포넌트(`RatingScale`, `VisualCard`) 정식 명세 추가 및 아키텍처 정합성 반영. (Rule 23 적용)

---

## 2. 브랜드 정체성 (Brand Identity)

### 2.1 컨셉: "Internal Coffee Lab"

- **Mood**: 차분하고 지적인 연구소(Laboratory) 분위기.
- **Principle**: "Show, Don't Just Tell". 불필요한 텍스트 설명을 지양하고 고감도 이미지와 여백을 통해 전문성을 전달합니다.
- **Target**: 스페셜티 커피의 전문성을 즐기는 2030 세대.

---

## 3. 디자인 토큰 (Design Tokens)

### 3.1 Colors

- **Surface**:
  - `Primary-Surface`: #1A1614 (Espresso Dark) - 주로 배경 및 어두운 영역
  - `Secondary-Surface`: #2A2522 - 레이어 구분 및 카드 배경
  - `Tertiary-Surface`: #FAF7F5 (Cream Foam) - 밝은 배경 및 텍스트 강조 영역
- **Brand & Accent**:
  - `Brand-Amber`: #D97706 (Accent) - 주요 강조 색상
  - `Amber-Scale`: `#FDE68A`(200), `#FCD34D`(300), `#FBBF24`(400), `#F59E0B`(500), `#D97706`(600) - 단계별 지표 표현용
  - `Brand-Cream`: #F5E6D3 - 보조 강조 색상

### 3.2 Typography

- **Headings (Logo & Hero Section)**: `Playfair Display`
  - 클래식하고 지적인 느낌을 주며, 브랜드 로고와 주요 강조 타이틀에 사용합니다.
- **Sub-Headings & Labels**: `Outfit`
  - 현대적이고 기하학적인 느낌으로, 섹션 제목이나 캡션에 사용합니다.
- **Body & Information**: `Inter`
  - 높은 가독성을 가진 산세리프 폰트로, 일반 본문 및 데이터 정보에 사용합니다.

### 3.3 Motion (Animation)

- **Philosophy**: "Fast & Linear Fluids"
- **Duration**: 0.2s ~ 0.4s (즉각적이면서도 부드러운 전환)
- **Easing**: `ease-out` 또는 `linear` (지나치게 화려한 곡선보다는 정제된 선형성을 선호)
- **Library**: `framer-motion`을 표준으로 사용합니다.

---

## 4. 공통 UI 패턴 (Shared Patterns)

### 4.1 글로벌 네비게이션 (GNB - Header)

- **Effect**: 최상단 투명(Transparent) 유지 -> 스크롤 시 반투명 Glassmorphism 효과 적용.
- **Navigation Content**:
  - 좌측: 로고 (`Playfair Display`)
  - 중앙/우측: Home, Bean Info, Classes 메뉴
  - 우측 끝: 인증 상태에 따른 아이콘 (User / LogOut)

### 4.2 푸터 (Footer)

- **Design**: 담백하고 기능적인 라이트 테마 구성. 로고와 카피라이트를 양 끝에 배치하여 안정감을 제공합니다.
- **Copy**: `© 2026 Dripnote. All rights reserved.` (대소문자 혼합형 사용, Uppercase 지양)

### 4.3 단계별 지표 패턴 (Progressive Rating Scale)

- **Usage**: 맛, 바디감, 로스팅 등 수치화된 정보를 전달할 때 사용합니다.
- **Component**: `ui-library`의 `RatingScale` 컴포넌트를 표준으로 사용합니다.
- **Design Logic**:
  - 낮은 단계(1)에서 높은 단계(N)로 갈수록 `Amber-Scale`의 더 짙은 색상을 순차적으로 적용합니다.
  - 마디별 테두리(`border-gray-200/50`)를 적용하여 저대비 환경에서도 각 단계 구분이 명확해야 합니다.
  - 정보의 종류에 따라 3단계(Body, Roasting) 또는 5단계(Flavor)를 지원합니다.

### 4.4 시각적 카드 패턴 (Visual Card Pattern)

- **Usage**: 이미지 중심의 감성적인 콘텐츠를 전달할 때 사용합니다.
- **Component**: `ui-library`의 `VisualCard` Compound Component를 사용합니다.
- **Structure**: `Root` -> `ImageContainer` -> `Image` -> `Overlay` -> `Content` 순으로 중첩하여 구성합니다.
- **Interaction**: 호버 시 `translate-y-2` 부유 효과와 이미지 `scale-110` 확대를 기본으로 합니다.

### 4.5 하방 호환성 (Harness Capability)

- 모든 공통 UI는 백엔드 API가 준비되지 않은 상태에서도 기능을 검증할 수 있도록 Mock Data 인터페이스를 지원해야 합니다.

---

## 6. 핵심 공통 컴포넌트 명세 (Shared Components)

### RatingScale

#### 1. Overview (맥락)
- **목적**: 3단계 또는 5단계의 수치형 지표를 Amber-Scale 색상 시스템으로 시각화하고 입력을 처리함
- **위치**: `packages/ui-library/components/RatingScale.tsx`

#### 2. Tech Stack & Constraints (기술 및 제약)
- **주요 도구**: `framer-motion`, Tailwind CSS v4
- **제약**: `variant`에 따라 모바일(`sm`)과 데스크톱(`md`)에 최적화된 높이와 간격 제공

#### 3. Data Interface (I/O)
**Props**:
```ts
interface RatingScaleProps {
  max?: number; // 3 or 5
  value: number;
  onChange: (value: number) => void;
  variant?: 'sm' | 'md';
}
```

---

### VisualCard

#### 1. Overview (맥락)
- **목적**: 이미지와 텍스트 오버레이를 조합한 고감도 카드를 위한 Compound Component
- **위치**: `packages/ui-library/components/VisualCard.tsx`

#### 2. Tech Stack & Constraints (기술 및 제약)
- **주요 도구**: `@radix-ui/react-slot` (asChild 지원), `framer-motion`
- **패턴**: Compound Component 패턴 (`Root`, `Image`, `Overlay`, `Content` 등)

#### 3. Data Interface (I/O)
**Components**:
- `VisualCard.Root`: 컨테이너 및 부유 효과 담당
- `VisualCard.Image`: 내부 이미지 및 확대 효과 담당
- `VisualCard.Overlay`: 가독성 확보를 위한 그라데이션 스크림
- `VisualCard.Content`: 상단/하단 텍스트 및 오버레이 콘텐츠 배치
