# 원두 상세 페이지 명세서 (Bean Detail Page)

## 1. 페이지 개요

특정 원두의 모든 감각적 정보와 전문적인 추천 추출 가이드를 제공하는 상세 탐색 페이지입니다. 사용자가 원두의 개성을 깊이 있게 이해하고, 최상의 맛을 낼 수 있는 가이드를 얻는 것을 목표로 합니다.

**핵심 설계 원칙**: "Laboratory Aesthetics" - 정제된 데이터(지표)와 감성적인 비주얼(이미지)의 조화를 통해 연구소에서 원두를 분석한 듯한 느낌을 전달합니다.

> **변경 사유 (Context)**:
> - **2026-04-20 최초 작성**: 원두 탐색 페이지에서 선택한 원두의 상세 정보를 전문적으로 전달하기 위해 신규 명세를 작성함. (Rule 23, 28 준수)

---

## 2. 디자인 시스템 참조

모든 디자인 토큰(Color, Typography, Motion)은 [공통 UI 명세서(common-ui-spec.md)](common-ui-spec.md)를 기반으로 합니다.

**페이지 무드: "Analytical Elegance"** — 깔끔한 타이포그래피와 정렬된 데이터 그리드를 통해 신뢰감을 주고, 고해상도 아로마 이미지를 통해 감각적인 자극을 병행합니다.

---

## 3. 페이지 레이아웃 구조

```text
[Desktop (≥1024px)]
┌─────────────────────────────────────────┐
│  GlobalNav                              │
│─────────────────────────────────────────│
│  ┌───────────────────┐ ┌──────────────┐ │
│  │                   │ │ Header Info  │ │
│  │ [Hero Image]      │ │ ├─ Name      │ │
│  │ (3:4 or 1:1)       │ │ └─ Icons     │ │
│  │                   │ │              │ │
│  │                   │ │ [Profile]    │ │
│  │                   │ │ [Info Table] │ │
│  └───────────────────┘ └──────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │ [Brewing Guide Section]             │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘

[Mobile (<1024px)]
┌──────────────────────┐
│  GlobalNav           │
│──────────────────────│
│  [Hero Image]        │
│  (Aspect-Square)      │
│──────────────────────│
│  [Header Info]       │
│  [Flavor Profile]    │
│  [Info Table]        │
│  [Brewing Guide]     │
└──────────────────────┘
```

---

## 4. 컴포넌트 명세 (Component Specs)

---

### BeanDetailHero (Header 영역)

#### 1. Overview (맥락)
- **목적**: 원두의 첫인상을 결정하는 히어로 영역. 대표 이미지와 핵심 기본 정보, 북마크 기능을 제공함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BeanDetailHero.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)
- **주요 도구**: `next/image`, `lucide-react` (`Bookmark`, `Share`), `framer-motion`
- **스타일링**: 공통 명세의 `VisualCard` 패턴과 유사한 감성을 유지하되, 상세 정보를 위해 텍스트 위계를 강화함.

#### 3. Data Interface (I/O)
**Props**:
```ts
interface BeanDetailHeroProps {
  name: string;
  origin: string;
  roastery: string;
  aromaImageUrl: string;
  primaryAroma: string;
}
```

#### 4. UI States (상태 명세)
| 상태 | 트리거 조건 | UI 표현 |
|--------|------|--------|
| **Default** | 초기 렌더링 | 이미지(좌) + 정보(우) 배치 (Desktop 기준) |
| **Bookmarked** | 북마크 버튼 클릭 | 아이콘 색상 변경 (`Brand-Amber`) |

#### 5. Functional Requirements (단계별 요구사항)
1. 원두의 대표 아로마 이미지를 고해상도로 노출한다.
2. 로스터리 명과 원두명을 명확한 위계(`Playfair Display`)로 표시한다.
3. 우측 하단(또는 상단)에 북마크 버튼과 공유 버튼을 배치한다.

#### 6. Design Spec (디자인 명세)
- **Typography**:
  - Roastery: `Outfit`, Medium, `text-amber-600`, `tracking-widest`
  - Name: `Playfair Display`, Bold, `text-4xl`
- **Animation**: 이미지 로드 시 미세한 줌-인 효과 (`framer-motion`)

---

### FlavorProfileSection

#### 1. Overview (맥락)
- **목적**: 원두의 감각적 특성(산미, 단맛, 쓴맛, 바디, 로스팅)을 정량적 지표로 시각화함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/FlavorProfileSection.tsx`

#### 2. Tech Stack & Constraints (기술 및 제약)
- **주요 도구**: `ui-library`의 `RatingScale` 컴포넌트

#### 3. Data Interface (I/O)
**Props**:
```ts
interface FlavorProfileProps {
  bitterness: number;
  sweetness: number;
  acidity: number;
  body: number;
  roasting: number;
}
```

#### 4. Functional Requirements (단계별 요구사항)
1. 각 항목(Acidity, Sweetness 등)을 `RatingScale`을 사용하여 표시한다.
2. 각 레이팅 바 옆에 해당 지표의 강도를 나타내는 텍스트(예: "Strong", "Light")를 보조적으로 노출할 수 있다.

---

### BrewingGuide (추출 가이드)

#### 1. Overview (맥락)
- **목적**: 연구소의 추천 레시피를 전달하여 사용자가 최상의 커피 경험을 하도록 돕는 영역.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BrewingGuide.tsx`

#### 2. Tech Stack & Constraints (기술 및 제약)
- **디자인**: 실험실 노트를 연상시키는 테두리와 격자 레이아웃 사용.

#### 3. Data Interface (I/O)
**Props**:
```ts
interface BrewingGuideProps {
  recipe: {
    method: string;
    ratio: string;
    temp: string;
    grind: string;
    notes: string;
  };
}
```

#### 4. Design Spec (디자인 명세)
- **Background**: `Secondary-Surface #2A2522` (Dark Mode 연출) 또는 `bg-gray-50`에 점선 테두리 적용.
- **Iconography**: 각 단계(온도, 비율 등)를 나타내는 미니멀 아이콘 사용.

---

## 5. 아키텍처 요약

```text
beans/[id]/page.tsx (Detail Entry)
  ├── BeanDetailHero        ← 상단 비주얼 및 제목
  ├── FlavorProfileSection  ← 레이팅 지표 영역
  ├── BeanInfoTable         ← 상세 정보 표 (가공, 고도 등)
  └── BrewingGuide          ← 추출 레시피 카드
```

---

## 6. 핵심 동작 요구사항

- **Dynamic Routing**: `/beans/{id}` 경로를 통해 각 원두의 상세 데이터를 페칭하여 렌더링한다.
- **SEO 최적화**: 원두 이름과 로스터리 정보를 포함한 `title` 및 `meta-description`을 생성한다.
- **Harness Support**: URL의 `id`를 기반으로 `mockBeansData`에서 데이터를 찾아 노출하며, 데이터가 없을 경우 404 안내를 표시한다.

---

## 7. 미결 사항 및 피드백

| # | 항목 | 현재 가정 | 확인 필요 |
|---|---|---|---|
| 1 | **지도 연동** | 비노출 | 로스터리 위치 정보를 지도로 보여줄 필요가 있을까? |
| 2 | **구매 링크** | 비노출 | 외부 구매 페이지로 연결하는 버튼이 필요한가? |
