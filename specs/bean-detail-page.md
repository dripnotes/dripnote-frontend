# 원두 상세 페이지 명세서 (Bean Detail Page)

## 1. 페이지 개요

특정 원두의 모든 감각적 정보와 전문적인 추천 추출 가이드를 제공하는 상세 탐색 페이지입니다. 사용자가 원두의 개성을 깊이 있게 이해하고, 최상의 맛을 낼 수 있는 가이드를 얻는 것을 목표로 합니다.

**핵심 설계 원칙**: "Laboratory Aesthetics" - 정제된 데이터(지표)와 감성적인 비주얼(이미지)의 조화를 통해 연구소에서 원두를 분석한 듯한 느낌을 전달합니다.

> **변경 사유 (Context)**:
>
> - **2026-04-20 최초 작성**: 원두 탐색 페이지에서 선택한 원두의 상세 정보를 전문적으로 전달하기 위해 신규 명세를 작성함. (Rule 23, 28 준수)
> - **2026-04-20 (1차 개편)**: 각 컴포넌트에 대한 표준 템플릿(상태 명세 및 DoD 추가 도입)을 적용하고, 기존에 누락되었던 `BeanInfoTable` 내용 및 `PageContainer` 도입 사실을 문서화함.

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
│  │ (1:1 Aspect)      │ │ └─ Icons     │ │
│  │                   │ │              │ │
│  │                   │ │ [Profile]    │ │
│  │                   │ │ [Info Table] │ │
│  └───────────────────┘ └──────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │ [Brewing Guide Section]            │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘

[Mobile (<1024px)]
┌──────────────────────┐
│  GlobalNav           │
│──────────────────────│
│  [Hero Image]        │
│  (Aspect-Square)     │
│──────────────────────│
│  [Header Info]       │
│  [Flavor Profile]    │
│  [Info Table]        │
│  [Brewing Guide]     │
└──────────────────────┘
```

**레이아웃 제약 사항**:

- 전체 래퍼는 `@/components/layout/PageContainer`를 적용하여 `Bottom Navigation`과 `Global Header`와의 간섭을 회피합니다.
- 각 섹션 내부 콘텐츠는 `max-w-7xl mx-auto` 속성을 기본적으로 가져 중앙 정렬을 보장합니다.

---

## 4. 컴포넌트 명세 (Component Specs)

### BeanDetailHero

#### 1. Overview (맥락)

- **목적**: 원두의 첫인상을 결정하는 히어로 영역. 대표 이미지와 핵심 기본 정보, 북마크 및 공유 기능을 제공함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BeanDetailHero.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/image`, `lucide-react` (`Bookmark`, `Share`, `ChevronLeft`), `framer-motion`
- **스타일링 규칙**: Tailwind CSS v4를 활용하며 `VisualCard` 패턴과 유사한 감성을 유지함.
- **컴포넌트 규칙**: `PageContainer` 하위에 위치하며, Hero 내부적인 독립 패딩(`py-8 px-4`)을 스스로 관리함.

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanDetailHeroProps {
  name: string;
  origin: string;
  roastery?: string;
  aromaImageUrl: string;
  primaryAroma: AromaType;
}
```

**State**:
| 상태명 | 타입 | 초기값 | 설명 |
|--------|------|--------|------|
| `isBookmarked` | `boolean` | `false` | 유저의 현재 북마크 토글 여부 |

#### 4. UI States (상태 명세)

| 상태           | 트리거 조건          | UI 표현                                                    |
| -------------- | -------------------- | ---------------------------------------------------------- |
| **Default**    | 초기 렌더링          | 이미지(좌) + 정보(우) 배치 (Desktop 기준)                  |
| **Bookmarked** | 북마크 버튼 클릭     | 아이콘 채도 활성화 및 `Brand-Amber (#F59E0B 등)` 색상 적용 |
| **Hover**      | 이미지에 마우스 오버 | 이미지가 `scale-105`로 1000ms 동안 서서히 줌-인 됨         |

#### 5. Functional Requirements (단계별 요구사항)

1. 원두의 대표 아로마 이미지를 고해상도(1:1 비율)로 렌더링한다.
2. 로스터리 명과 원두명을 명확한 위계(`Playfair Display`)로 표시한다.
3. 우측에 북마크(토글형) 버튼과 공유 버튼을 배치하고 클릭 인터랙션을 허용한다.
4. 상단에 "Back" 버튼을 두어 브라우저 History 상 이전 라우트로 이동 가능케 한다.

#### 6. Design Spec (디자인 명세)

- **Layout**: 데스크톱(`lg`) 이상에서는 2 컬럼 Grid (`grid-cols-2`), 그 이하는 1 컬럼 배치.
- **Typography**:
  - Roastery: `Outfit`, Medium, `text-amber-600`, `tracking-[0.2em]`
  - Name: `Playfair Display`, Bold, `text-4xl ~ text-6xl`
- **Animation**:
  - `framer-motion`을 사용하여 텍스트 컴포넌트 등장 시 `y: 20`에서 `y: 0`로 미세하게 올라오는 효과(`duration: 0.5s`).

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 뒤로가기 버튼 클릭 시 이전 페이지로 정상 이동한다.
- [ ] (기능) 북마크 버튼 클릭 시 상태가 토글되며 노란색으로 칠해진다.
- [ ] (디자인) 기본 테마의 아로마 배경 컬러가 이미지 컨테이너 영역에 정상적으로 깔린다.
- [ ] (반응형) 데스크톱 환경에서는 좌/우 배치, 모바일에서는 상/하 배치로 동작한다.

---

### FlavorProfileSection

#### 1. Overview (맥락)

- **목적**: 원두의 감각적 특성(산미, 단맛, 쓴맛, 바디, 로스팅)을 정량적 지표로 시각화하여 사용자가 직관적으로 맛의 프로파일을 유추할 수 있도록 함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/FlavorProfileSection.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `ui-library` 내 `RatingScale` 컴포넌트, `framer-motion`

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

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건                  | UI 표현                                         |
| ----------- | ---------------------------- | ----------------------------------------------- |
| **Default** | 초기 렌더링                  | 지정된 레이팅 점수에 맞춰 `RatingScale` 바 생성 |
| **Visible** | 스크롤을 내려 보이기 시작 시 | `framer-motion` 효과로 컨테이너 전체 페이드 인  |

#### 5. Functional Requirements (단계별 요구사항)

1. 산미, 단맛, 쓴맛은 5점 만점을 기준으로 수치를 렌더링한다.
2. 바디와 로스팅은 3점 만점을 기준으로 수치를 렌더링한다.
3. 각각의 지표 라벨과 함께 `N / Max` 텍스트로 보조 설명 수치를 병기한다.

#### 6. Design Spec (디자인 명세)

- **Layout**: 3-컬럼 Grid (`grid-cols-3`) 기반으로 컴포넌트를 배치하며, 중간 요소 분기점으로 가로선(`Separator`)을 갖는다.

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 모든 프로필 지표에서 빈 값(0점)일 때 예외 없이 회색으로 표시된다.
- [ ] (디자인) 공용 `RatingScale` 컴포넌트가 디자인 시스템(Amber-Scale)에 맞게 적용되었다.
- [ ] (반응형) 모바일 세로 길이에서는 위계를 정리하여 리스트 형태로 노출된다.

---

### BeanInfoTable

#### 1. Overview (맥락)

- **목적**: 원두의 기원, 가공 방식, 품종, 재배 고도 및 상세 설명 글을 제공하여 유저에게 정보성 데이터를 직관적으로 표시함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BeanInfoTable.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **스타일링 규칙**: 컨테이너의 가독성을 위해 흰색이 아닌 약간의 대비를 갖는 `Secondary-Surface` 계통(또는 `bg-gray-50`)의 박스를 사용.

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanInfoTableProps {
  origin: string;
  processing?: string;
  variety?: string;
  altitude?: string;
  description?: string;
}
```

#### 4. UI States (상태 명세)

| 상태               | 트리거 조건                                     | UI 표현                                                          |
| ------------------ | ----------------------------------------------- | ---------------------------------------------------------------- |
| **Default**        | 입력된 정보(Value)가 존재하는 항목              | 정상 리스트(`li`) 컴포넌트 렌더링                                |
| **Empty Value**    | 특정 속성(예: processing)이 Null이거나 비어있음 | 해당 속성을 렌더링하지 않고 필터링 함                            |
| **No Description** | description 값이 없을 경우                      | 이탤릭체의 안내 문구 렌더링 ("상세 설명이 준비되지 않았습니다.") |

#### 5. Functional Requirements (단계별 요구사항)

1. 좌측 영역에 "About the Bean" 제목과 상세 설명(`description`)을 텍스트 형태로 배포한다.
2. 우측 보조 패널에 원산지, 가공, 품종, 고도 등의 테이블 데이터를 리스트업한다.
3. 내용이 없는 데이터(Undefined, Null)는 테이블 리스트에서 동적으로 제거한다.

#### 6. Definition of Done (검증 기준)

- [ ] (기능) 데이터가 없는(`undefined`) Prop 필드는 화면 상 목록 구조에서 나타나지 않는다.
- [ ] (디자인) 긴 상세 정보 텍스트가 들어와도 줄바꿈이 자연스럽게 처리된다 (`leading-relaxed` 속성 적용 여부).

---

### BrewingGuide (추출 가이드)

#### 1. Overview (맥락)

- **목적**: 연구소의 추천 레시피를 전달하여 사용자가 최상의 커피 경험을 하도록 돕는 영역.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BrewingGuide.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **스타일링**: 실험실 노트를 연상시키는 다크 테마(`bg-[#2A2522]`) 테두리와 격자 레이아웃 사용.

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BrewingGuideProps {
  recipe?: {
    method: string;
    ratio: string;
    temp: string;
    grind: string;
    notes: string;
  };
}
```

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건                              | UI 표현                                     |
| ----------- | ---------------------------------------- | ------------------------------------------- |
| **Default** | `recipe` 객체가 존재할 때                | 다크 모드의 가이드 패널 및 세부 속성 렌더링 |
| **Empty**   | `recipe` 속성이 `undefined` 거나 생략 시 | UI 상에 아예 노출하지 않음 (`null` 반환)    |

#### 5. Functional Requirements (단계별 요구사항)

1. 추천하는 추출 방식, 원두:물의 비율, 추출 온도, 분쇄도를 카드 형태로 개별 나열한다.
2. 각각의 항목은 연관된 아이콘(예: 온도계, 도구 등)과 매칭하여 하이라이트 한다.
3. 팁 및 노트를 하단 배너 형태(Tip:)로 강조하여 표출한다.

#### 6. Definition of Done (검증 기준)

- [ ] (기능) 레시피 값이 주어지지 않을 경우, 컴포넌트는 빈 컨테이너조차 그리지 않는다.
- [ ] (디자인) 배경 그리드 무늬 도트 패턴이 시각적으로 방해받지 않을 정도의 미세한 간격(`opacity-[0.03]`)으로 노출된다.
- [ ] (디자인) "Lab Recipe" 무드에 맞는 Dark Mode 컨테이너가 뚜렷이 구분된다.

---

## 5. 아키텍처 요약

```text
beans/[id]/page.tsx (Detail Entry)  [ 래퍼 : <PageContainer> ]
  ├── BeanDetailHero        ← 상단 비주얼 및 제목
  ├── FlavorProfileSection  ← 레이팅 지표 영역
  ├── BeanInfoTable         ← 상세 정보 표 (가공, 고도 등)
  └── BrewingGuide          ← 추출 레시피 카드
```

---

## 6. 미결 사항 및 피드백

| #   | 항목          | 현재 가정 | 확인 필요                                         |
| --- | ------------- | --------- | ------------------------------------------------- |
| 1   | **지도 연동** | 비노출    | 로스터리 위치 정보를 지도로 보여줄 필요가 있을까? |
| 2   | **구매 링크** | 비노출    | 외부 구매 페이지로 연결하는 버튼이 필요한가?      |
