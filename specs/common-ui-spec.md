# 공통 UI 명세서 (Common UI Spec) - Baristation

## 1. 개요

Baristation 서비스의 모든 페이지에서 일관된 사용자 경험(UX)과 시각적 정체성(Visual Identity)을 유지하기 위한 최상위 명세입니다.

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
  - `Amber-Scale`: `#FDE68A`(200), `#FCD34D`(300), `#FBBF24`(400), `#F59E0B`(500), `#D97706`(600) - 산미, 단맛용
  - `Espresso-Scale`: `#D7CCC8`(200), `#BCAAA4`(300), `#8D6E63`(400), `#6D4C41`(500), `#4E342E`(600) - 로스팅용
  - `Teal-Scale`: `#CCFBF1`(200), `#5EEAD4`(300), `#14B8A6`(400), `#0D9488`(500), `#134E4A`(600)
  - `Dynamic-Scale`: 밸런스(Balance) 지표의 점수대에 따라 `red`, `blue`, `green` 팔레트를 가변적으로 적용함.
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
- **Copy**: `© 2026 Baristation. All rights reserved.` (대소문자 혼합형 사용, Uppercase 지양)

### 4.3 단계별 지표 패턴 (Progressive Rating Scale)

- **Usage**: 맛, 바디감, 로스팅 등 수치화된 정보를 전달할 때 사용합니다.
- **Component**: `ui-library`의 `RatingScale` 컴포넌트를 표준으로 사용합니다.
- **Design Logic**:
  - 낮은 단계(1)에서 높은 단계(N)로 갈수록 `Amber-Scale`의 더 짙은 색상을 순차적으로 적용합니다.
  - 마디별 테두리(`border-gray-200/50`)를 적용하여 저대비 환경에서도 각 단계 구분이 명확해야 합니다.
  - **표준 지표(Standard Metrics)**: Acidity, Sweetness, Body, Balance, Roasting 5종을 기본으로 하며, 모두 **5단계 표준 척도**를 사용합니다.
  - **컬러 팔레트(Color Palettes)**:
    - `Amber`: 산미(Acidity), 단맛(Sweetness), 바디감(Body)에 사용
    - `Dynamic`: 밸런스(Balance)에 사용 (수치별 Red/Blue/Green 전환)
    - `Espresso`: 로스팅(Roasting)에 사용

### 4.4 시각적 카드 패턴 (Visual Card Pattern)

- **Usage**: 이미지 중심의 감성적인 콘텐츠를 전달할 때 사용합니다.
- **Component**: `ui-library`의 `VisualCard` Compound Component를 사용합니다.
- **Structure**: `Root` -> `ImageContainer` -> `Image` -> `Overlay` -> `Content` 순으로 중첩하여 구성합니다.
- **Interaction**: 호버 시 `translate-y-2` 부유 효과와 이미지 `scale-110` 확대를 기본으로 합니다.
- **Mobile Optimization**: 모바일 2x2 그리드 환경을 고려하여 텍스트 크기 상향 조정(Origin `text-[8px]`, Title `text-lg`) 및 간격 최적화를 적용합니다.

### 4.5 레이아웃 컨테이너 패턴 (Section Layout Pattern)

- **Usage**: 모든 페이지의 개별 섹션을 감싸는 표준 컨테이너입니다.
- **Component**: `SectionContainer` 컴포넌트를 사용합니다.
- **Design Logic**:
  - 외부 `section` 태그는 `w-full`을 유지하여 풀 블리드(Full-bleed) 배경색/이미지를 지원합니다.
  - 내부 `div`는 `px-8` 수평 패딩과 `max-w-7xl`, `mx-auto`를 통해 콘텐츠 정렬 선을 일관되게 유지합니다.
  - 모바일에서도 동일하게 `px-8` 패딩을 유지하여 프리미엄한 여백감을 제공합니다.

### 4.6 하방 호환성 (Harness Capability)

- 모든 공통 UI는 백엔드 API가 준비되지 않은 상태에서도 기능을 검증할 수 있도록 Mock Data 인터페이스를 지원해야 합니다.

---

## 5. 핵심 공통 컴포넌트 명세 (Shared Components)

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
  max?: number; // 5 (표준)
  value: number;
  onChange: (value: number) => void;
  variant?: 'sm' | 'md' | 'indicator';
  colorPalette?: 'amber' | 'espresso' | 'red' | 'blue' | 'green';
  readOnly?: boolean;
}
```

- **Behavior logic**:
  - `onChange` 핸들러 유무에 따라 **대화형(Button)** 또는 **정보 노출용(ReadOnly, aria-hidden)**으로 자동 전환됩니다.
  - `indicator` 변체는 활성 단계에서 팔레트별 색상에 최적화된 **Glow (Box Shadow)** 효과와 미세한 **수평 그라데이션**을 제공하여 시각적 깊이감을 제공합니다.
  - 비활성 단계는 `rgba(156, 163, 175, 0.15)` 수준으로 시인성을 유지하며 배경과 자연스럽게 어우러집니다.

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
