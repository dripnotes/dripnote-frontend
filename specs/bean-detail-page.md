# 원두 상세 페이지 명세서 (Bean Detail Page)

## 1. 페이지 개요

특정 원두의 모든 감각적 정보와 전문적인 추천 추출 가이드를 제공하는 상세 탐색 페이지입니다. 사용자가 원두의 개성을 깊이 있게 이해하고, 최상의 맛을 낼 수 있는 가이드를 얻는 것을 목표로 합니다.

**핵심 설계 원칙**: "Laboratory Aesthetics" - 정제된 데이터(지표)와 감성적인 비주얼(이미지)의 조화를 통해 연구소에서 원두를 분석한 듯한 느낌을 전달합니다.

> **변경 사유 (Context)**:
>
> - **2026-04-20 최초 작성**: 원두 탐색 페이지에서 선택한 원두의 상세 정보를 전문적으로 전달하기 위해 신규 명세를 작성함.
> - **2026-04-20 (1차 개편)**: 각 컴포넌트에 대한 표준 템플릿(상태 명세 및 DoD 추가 도입)을 적용하고, 기존에 누락되었던 `BeanInfoTable` 내용 및 `PageContainer` 도입 사실을 문서화함.
> - **2026-04-20 (2차 개편)**: 사용성 향상을 위해 상세 렌더링 순서 변경(정보 표 -> 감각 지표), `BeanInfoTable`에 카테고리/블렌딩 여부 스펙 추가, 페이지 하단 '비슷한 원두 추천' 캐러셀 연동, 외부 구매용 아웃링크(External Link) 명세를 추가함.

- **2026-04-20 (3차 개편)**: 레이아웃 아키텍처 표준화(`SectionContainer`) 반영. 모바일 최적화를 위해 히어로 영역 이미지 중앙 정렬, Flavor Profile 시인성 개선, Brewing Guide 2열 그리드(모바일) 및 텍스트/여백 축소 스펙을 추가함.
- **2026-04-20 (4차 개편)**: 모바일 전용 상단 헤더(로고 및 액션 버튼) 구조 추가. 원두 목록 페이지와 디자인 일관성을 맞추기 위해 로고 배치 및 액션 버튼 상단 우측 정렬 명세를 반영함.
- **2026-04-20 (5차 개편)**: 향미 지표 체계 현대화. 쓴맛 제거 및 **밸런스** 지표 추가, 모든 지표(산미, 단맛, 밸런스, 바디감, 로스팅)의 **5단계 척도** 표준화 반영.

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
│  │ (1:1 Aspect)      │ │ ├─ Icons     │ │
│  │                   │ │ └─ [Purchase]│ │
│  │                   │ │              │ │
│  │                   │ │ [Info Table] │ │
│  │                   │ │ [Profile]    │ │
│  └───────────────────┘ └──────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │ [Brewing Guide Section]            │ │
│  │────────────────────────────────────│ │
│  │ [Recommended Beans]                │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**레이아웃 제약 사항**:

- 전체 래퍼는 `@/components/layout/PageContainer`를 적용하여 `Bottom Navigation`과 `Global Header`와의 간섭을 회피합니다.
- 각 개별 섹션(Hero, Profile 등)은 `SectionContainer` 컴포넌트로 래핑하여 `px-8`의 공통 수평 여백과 `max-w-7xl` 중앙 정렬을 보장합니다.
- **수직 간격(Spacing)**: 모바일에서의 정보 밀도를 위해 섹션 간 패딩을 축소(`py-6~12`)하며, 데스크톱에서는 여유로운 공간감(`py-8~20`)을 유지합니다.
- **풀 블리드(Full-bleed)**: `SectionContainer`를 통해 배경색이 화면 끝까지 차오르는 디자인을 지원합니다.

---

## 4. 컴포넌트 명세 (Component Specs)

### BeanDetailHero

#### 1. Overview (맥락)

- **목적**: 원두의 첫인상을 결정하는 히어로 영역. 대표 이미지와 핵심 기본 정보, 북마크, 구매처 연결 기능을 제공함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BeanDetailHero.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/image`, `lucide-react` (`Bookmark`, `Share`, `ChevronLeft`, `ExternalLink`), `framer-motion`
- **스타일링 규칙**: Tailwind CSS v4를 활용하며 `VisualCard` 패턴과 유사한 감성을 유지함.

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanDetailHeroProps {
  name: string;
  origin: string;
  roastery?: string;
  aromaImageUrl: string;
  primaryAroma: AromaType;
  purchaseUrl?: string; // 구매 외부 링크
}
```

**State**:

| 상태명         | 타입      | 초기값  | 설명                         |
| -------------- | --------- | ------- | ---------------------------- |
| `isBookmarked` | `boolean` | `false` | 유저의 현재 북마크 토글 여부 |

#### 4. UI States (상태 명세)

| 상태            | 트리거 조건           | UI 표현                                                                      |
| --------------- | --------------------- | ---------------------------------------------------------------------------- |
| **Default**     | 초기 렌더링           | 이미지(좌) + 정보(우) 배치 (Desktop 기준)                                    |
| **Bookmarked**  | 북마크 버튼 클릭      | 아이콘 채도 활성화 및 `Brand-Amber (#F59E0B 등)` 색상 적용                   |
| **Purchasable** | `purchaseUrl` 존재 시 | 헤더 액션 바에 `ExternalLink` 아이콘을 포함한 '결제 사이트로 이동' 링크 노출 |

#### 5. Functional Requirements (단계별 요구사항)

1. **모바일 전용 헤더**: 모바일 해상도에서 "Dripnote" 로고를 상단에 배치하고, 북마크/공유/구매 버튼을 상단 우측에 콤팩트하게 정렬하며, 원두 목록 페이지와 시각적 일관성을 유지한다.
2. 원두의 대표 아로마 이미지를 고해상도(1:1 비율)로 렌더링하며, 모든 해상도에서 수평 중앙 정렬을 유지한다.
3. 로스터리 명과 원두명을 명확한 위계(`Playfair Display`)로 표시한다.
4. 북마크 및 구매 아웃링크 버튼을 우측 정렬하여 시각적 리듬을 부여한다. (데스크톱 기준)
5. 상단에 "Back" 버튼을 두어 브라우저 History 상 이전 라우트로 이동 가능케 하며, 헤더와의 간격을 최소화(`mt-0 md:mt-4`)한다.
6. 모바일 해상도에서 이미지와 액션 버튼 사이의 간격을 좁게(`gap-4`) 조정하여 정보 밀도를 높인다.

#### 6. Definition of Done (검증 기준)

- [ ] (기능) 구매용 `purchaseUrl`이 없는 데이터에서는 아웃링크 버튼 자체가 보이지 않아야 한다.
- [ ] (디자인) 외부 링크 버튼은 사용자에게 다른 앱 영역으로 이동함을 아이콘 등으로 충분히 인지시켜야 한다.

---

### BeanInfoTable

#### 1. Overview (맥락)

- **목적**: 원두의 기원, 카테고리, 블렌딩 여부, 가공 방식, 재배 높이 및 상세 이야기를 담은 첫 진입 정보 패널.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BeanInfoTable.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **스타일링 규칙**: 컨테이너의 가독성을 위해 흰색이 아닌 약간의 대비를 갖는 `Secondary-Surface` 계통(또는 `bg-gray-50`)의 박스를 사용.

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanInfoTableProps {
  origin: string;
  category?: string; // 예: 'Single Origin', 'Decaf'
  blend?: boolean; // 혼합 여부
  processing?: string;
  variety?: string;
  altitude?: string;
  description?: string;
}
```

#### 4. UI States (상태 명세)

| 상태            | 트리거 조건                                     | UI 표현                               |
| --------------- | ----------------------------------------------- | ------------------------------------- |
| **Default**     | 입력된 정보(Value)가 존재하는 항목              | 정상 리스트(`li`) 컴포넌트 렌더링     |
| **Empty Value** | 특정 속성(예: processing)이 Null이거나 비어있음 | 해당 속성을 렌더링하지 않고 필터링 함 |

#### 5. Functional Requirements (단계별 요구사항)

1. "About the Bean" 소개 문구를 상단(혹은 좌측)에 우선 배치하여 원두의 스토리를 전달한다.
2. 부가 정보로서 원산지, 분류, 가공 방식 등의 테이블을 렌더링한다. `blend`가 true면 'Blend', false면 'Single Origin'을 표시한다.
3. 내용이 없는 데이터(Undefined, Null)는 테이블 리스트에서 동적으로 제거한다.

#### 6. Definition of Done (검증 기준)

- [ ] (기능) 데이터가 없는(`undefined`) Prop 필드는 화면 상 목록 구조에서 나타나지 않는다.
- [ ] (기능) `blend` prop 유무에 따라 카테고리가 Single Origin 인지 Blend 인지 정확히 표기된다.

---

### FlavorProfileSection

#### 1. Overview (맥락)

- **목적**: 원두의 감각적 특성을 정량적 지표로 시각화하여 사용자가 직관적으로 맛의 프로파일을 유추할 수 있도록 함.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/FlavorProfileSection.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Data Interface (I/O)

**Props**:

```ts
interface FlavorProfileProps {
  acidity: number; // 1~5
  sweetness: number; // 1~5
  balance: number; // 1~5 (신규)
  body: number; // 1~5 (기존 3단계에서 확장)
  roasting: number; // 1~5 (기존 3단계에서 확장)
}
```

#### 3. Functional Requirements (단계별 요구사항)

1. 모든 지표는 `RatingScale` 컴포넌트를 사용하여 **5단계 표준 척도**로 표시한다.
2. 지표 배치 순서는 **산미(Acidity) -> 단맛(Sweetness) -> 바디감(Body)** (상단 그리드), **밸런스(Balance) -> 로스팅(Roast)** (하단 그리드) 순으로 정렬한다.
3. 로스팅 단계는 5단계를 지원하며, 툴팁이나 가이드 상에서 **Light, Light Medium, Medium, Medium Dark, Dark**로 구분한다.

---

### BrewingGuide (추출 가이드)

#### 1. Overview (맥락)

- **목적**: 연구소의 추천 레시피를 전달하여 사용자가 최상의 커피 경험을 하도록 돕는 영역.
- **위치**: `apps/web/app/(main)/beans/[id]/_components/BrewingGuide.tsx`
- **부모 컴포넌트**: `BeanDetailPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **그리드 시스템**:
  - Desktop: 4열 배치 (`lg:grid-cols-4`)
  - Tablet: 2열 배치 (`md:grid-cols-2`)
  - Mobile: **1열 배치 (`grid-cols-1`)** - 원두별 연구소 가이드를 집중해서 읽을 수 있도록 세로로 쌓음
- **스타일링**: 모바일 환경에서 텍스트 크기(`text-sm`) 및 카드 내부 패딩(`p-3`)을 축소하여 'Lab' 스타일의 촘촘한 레이아웃 구현

#### 3. Functional Requirements (단계별 요구사항)

1. 연구소 분위기의 전용 배경(암갈색, 미세 그리드)과 아이콘을 사용하여 가이드를 렌더링한다.
2. 추출 도구/온도/배분율/분쇄도 정보를 카드 형태로 제공한다.
3. 하단에 전문가 팁(`Info` 아이콘과 함께)을 배치하여 추가 조언을 전달한다.
4. 섹션 하단 여백을 `mb-10`으로 조정하여 다음 콘텐츠와의 연결성을 강화한다.

---

## 5. 아키텍처 요약

```text
beans/[id]/page.tsx (Detail Entry)  [ 래퍼 : <PageContainer> ]
  ├── BeanDetailHero        ← 상단 비주얼, 북마크, 구매 연결(ExternalLink)
  ├── BeanInfoTable         ← 설명 서술 및 기본 정보 제공(카테고리 등)
  ├── FlavorProfileSection  ← 맛 정보 분석 지표(차트화)
  ├── BrewingGuide          ← 추출 레시피 카드
  └── RecommendedBeans      ← 페이지 하단의 "비슷한 맛의 원두 추천" 영역
```

---

## 6. 미결 사항 및 피드백

| #   | 항목          | 현재 가정 | 확인 필요                                         |
| --- | ------------- | --------- | ------------------------------------------------- |
| 1   | **지도 연동** | 비노출    | 로스터리 위치 정보를 지도로 보여줄 필요가 있을까? |
