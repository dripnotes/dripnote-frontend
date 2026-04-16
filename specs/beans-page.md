# 원두 정보 페이지 명세서 (Beans Page)

## 1. 페이지 개요

Dripnote 서비스의 원두 정보 탐색(Bean Discovery) 페이지입니다. 사용자가 커피 프로파일(향·맛·바디·로스팅) 기준으로 원두를 필터링하고 원하는 원두를 탐색할 수 있도록 합니다.

**핵심 설계 원칙**: 텍스트를 최소화하고 **아로마를 대표하는 이미지와 추출 색상**으로 원두의 개성을 시각적으로 표현합니다. 사용자가 '읽는' 것이 아니라 '보고 느끼는' 방식으로 원두를 탐색합니다.

> **변경 사유 (Context)**:
>
> - 커피는 향·맛·질감 등 감각적 경험이 핵심인 제품입니다. 텍스트 설명보다 대표 아로마의 식재료 이미지와 그에서 추출한 배경 색상을 통해 원두의 개성을 직관적으로 전달하는 방식이 Dripnote 브랜드 무드("Internal Coffee Lab")와 가장 잘 부합합니다.
> - **2026-04-15 UI 개편**: 메인 페이지 상단에 띄엄띄엄 분리되어 있던 검색창(`BeanSearchBar`)을 필터 패널(`BeanFilterPanel`) 및 모바일 드로어(`BeanFilterDrawer`) 내부로 이동하여 검색 및 필터링 시퀀스를 일원화했습니다.
> - **2026-04-16 가시성 개선**: 저대비 환경에서의 가독성을 높이기 위해 모든 필터 요소(Chip, Rating Bar)에 테두리를 추가하고, 배경색 및 텍스트의 명암 대비를 강화했습니다.

---

## 2. 디자인 시스템 참조

모든 디자인 토큰(Color, Typography, Motion)은 [공통 UI 명세서(common-ui-spec.md)](common-ui-spec.md)를 기반으로 합니다.

**페이지 무드: "Sensory Catalogue"** — 마치 고급 커피 카탈로그를 넘기듯, 여백과 이미지 중심의 구성으로 각 원두의 개성이 직접 말을 걸도록 합니다.

### 아로마별 배경 색상 토큰 (AromaColor Palette)

아로마 요소에서 색상을 추출하여 BeanCard 배경에 적용합니다.

| 아로마 | 대표 식재료     | 배경 색상 (HEX) | Tailwind 커스텀 클래스 |
| ------ | --------------- | --------------- | ---------------------- |
| 캐러멜 | 캐러멜 설탕     | `#F2D49B`       | `bg-aroma-caramel`     |
| 와인   | 레드 베리       | `#E8C5C0`       | `bg-aroma-wine`        |
| 초콜릿 | 다크 초콜릿     | `#C9A882`       | `bg-aroma-chocolate`   |
| 과일   | 시트러스/복숭아 | `#FDDCB5`       | `bg-aroma-fruit`       |
| 허브   | 민트/허브 잎    | `#C9E4CA`       | `bg-aroma-herb`        |
| 맥아   | 보리/곡물       | `#E8D9B5`       | `bg-aroma-malt`        |
| 견과   | 아몬드/헤이즐넛 | `#E0CAAA`       | `bg-aroma-nutty`       |
| 꽃     | 자스민/장미     | `#F5D5D5`       | `bg-aroma-floral`      |
| 스모크 | 훈연 우드       | `#D0CEC8`       | `bg-aroma-smoky`       |

---

## 3. 페이지 레이아웃 구조

```text
[Desktop / Tablet (≥768px)]
┌─────────────────────────────────────────┐
│  GlobalNav                              │
│─────────────────────────────────────────│
│  ┌──────────┐  ┌───────────────────────┐│
│  │ Filter   │  │  [ 필터 정보/요약 ]   ││  ← 그리드 상단
│  │ Panel    │  │  BeanCardList         ││  ← 본문 영역
│  │ ├─[검색] │  │  (원두 카드 그리드)    ││
│  │ ├─Aroma  │  │                       ││
│  │ └─Flavor │  └───────────────────────┘│
│  └──────────┘                           │
└─────────────────────────────────────────┘

[Mobile (<768px)]
┌──────────────────────┐
│  GlobalNav           │
│──────────────────────│
│  [결과 수] [필터 버튼]│  ← 그리드 상단
│  BeanCardList        │  ← 기본 뷰
│  (원두 카드 그리드)   │
└──────────────────────┘
       ↕ (필터 버튼 클릭 시 Drawer 오버레이)
┌──────────────────────┐
│  [BeanFilterDrawer]  │  ← 하단에서 상단으로 슬라이드
│  ├─[ 검색 ]          │  ← 드로어 내부 상단
│  ├─Aroma             │
│  └─Flavor            │
└──────────────────────┘
```

---

## 4. 컴포넌트 명세 (Component Specs)

---

### BeanSearchBar

#### 1. Overview (맥락)

- **목적**: 원두 이름 또는 키워드로 원두 목록을 실시간 필터링하는 검색 입력 컴포넌트
- **위치**: `apps/web/components/beans/BeanSearchBar.tsx`
- **부모 컴포넌트**: `BeanFilterPanel`, `BeanFilterDrawer`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: Tailwind CSS v4, `lucide-react` (`Search` 아이콘)
- **기타 제약**: Debounce 300ms 적용하여 불필요한 API 호출 방지

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // 기본값: "검색어를 입력하세요"
}
```

**State**: 없음 (Controlled Component, 상위에서 관리)

**Events / Callbacks**:

- `onChange(value: string)`: 입력값 변경 시 상위로 전달 (debounced)

#### 4. UI States (상태 명세)

| **Default** | 초기 렌더링 | 흰색 배경 입력창 + Search 아이콘 + 테두리 |
| **Focus** | 입력창 포커스 | 테두리 강조 + 아이콘 색상 변경 |
| **Filled** | 텍스트 입력 중 | 우측에 Clear(×) 버튼 노출 |

#### 5. Functional Requirements (단계별 요구사항)

1. `Search` 아이콘이 입력창 좌측에 위치한다
2. 텍스트 입력 시 300ms debounce 후 `onChange`를 호출한다
3. 입력값이 있을 때 우측에 Clear(×) 버튼을 노출하며, 클릭 시 `onChange("")`를 호출한다
4. 포커스 시 테두리가 `Brand-Amber #D97706`으로 전환된다

#### 6. Design Spec (디자인 명세)

- **Layout**: `w-full`, `rounded-xl`, `h-12`, 좌측 아이콘 + 입력 텍스트 + 우측 Clear 버튼
- **Background**: `bg-white`, `ring-1 ring-gray-300`, `shadow-sm`
- **Animation**: 포커스 시 `ring-2 ring-amber-500 transition-shadow` (0.2s)
- **Typography**: `Outfit`, Regular, `text-sm`, placeholder 색상 `text-gray-500`
- **Responsive**: 다양한 부모 컨테이너(패널/드로어) 너비에 맞게 `w-full`로 꽉 채움

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 입력 시 300ms debounce 후 `onChange`가 호출된다
- [ ] (기능) Clear 버튼 클릭 시 입력값이 초기화된다
- [ ] (디자인) 포커스 시 `Brand-Amber` 링 효과가 적용된다
- [ ] (반응형) 부모 컨테이너(패널/드로어) 내부 너비에 알맞게 늘어나거나 줄어든다

---

### BeanFilterPanel

#### 1. Overview (맥락)

- **목적**: 데스크톱/태블릿에서 좌측 사이드바로 항상 노출되는 커피 프로파일 필터 패널
- **위치**: `apps/web/components/beans/BeanFilterPanel.tsx`
- **부모 컴포넌트**: `beans/page.tsx`
- **노출 조건**: 뷰포트 너비 ≥ 768px

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: Tailwind CSS v4, `framer-motion`
- **기타 제약**: 모바일에서는 렌더링하지 않음 (`hidden md:block`)

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanFilterState {
  aromas: AromaType[]; // 선택된 아로마 (다중 선택)
  flavor: {
    bitterness: number; // 쓴맛 1~5 (0 = 미선택)
    sweetness: number; // 단맛 1~5 (0 = 미선택)
    acidity: number; // 산미 1~5 (0 = 미선택)
  };
  body: 0 | 1 | 2 | 3; // 바디감 0 = 미선택, 1~3
  roasting: RoastingType[]; // 선택된 로스팅 (다중 선택)
}

type AromaType = '캐러멜' | '와인' | '초콜릿' | '과일' | '허브' | '맥아' | '견과' | '꽃' | '스모크';
type RoastingType = 'Light' | 'Medium' | 'Dark';

interface BeanFilterPanelProps {
  filters: BeanFilterState;
  onChange: (filters: BeanFilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
```

**State**: 없음 (Controlled Component)

**Events / Callbacks**:

- `onChange(filters)`: 필터 변경 시 상위로 전달
- `onReset()`: 전체 필터 초기화

#### 4. UI States (상태 명세)

| 상태         | 트리거 조건         | UI 표현                                  |
| ------------ | ------------------- | ---------------------------------------- |
| **Default**  | 초기 렌더링         | 모든 필터 비활성 상태                    |
| **Filtered** | 하나 이상 필터 선택 | 선택된 항목 강조 + 상단 초기화 버튼 노출 |

#### 5. Functional Requirements (단계별 요구사항)

1. **Search** 구역: 패널 최상단에 `BeanSearchBar`를 포함하여 이름/원산지 검색 연동
2. **Aroma (향)** 섹션: 9개 아로마 타입을 Chip 형태로 나열, 다중 선택 가능
3. **Flavor (맛)** 섹션: 쓴맛·단맛·산미를 각 연속된 N등분 막대 형태(Rating Bar) 1~5단계로 표시
4. **Body (바디감)** 섹션: 1(가벼움) ~ 3(묵직함) 연속된 막대 형태(Rating Bar) 3단계로 표시
5. **Roasting** 섹션: Light / Medium / Dark 3종 Chip, 다중 선택 가능
6. 하나 이상의 필터가 선택되면 상단에 "초기화" 버튼이 노출된다
7. 초기화 버튼 클릭 시 `onReset()`을 호출하여 모든 필터를 해제한다

#### 6. Design Spec (디자인 명세)

- **Layout**: `w-[240px] shrink-0`, 수직 스크롤 가능, 섹션 간 `pb-6 border-b border-gray-100`
- **Aroma Chip**: `rounded-full px-3 py-1 text-xs`, 선택 시 `bg-amber-500 text-white font-semibold shadow-sm`, 미선택 시 `bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300`
- **Rating Bar**: 마디별 테두리 적용(`border border-gray-200/50`), 값이 높을수록 진한 색상(`amber-200`~`amber-600`), 미선택 마디는 `bg-gray-50`
- **Roasting Chip**: Aroma Chip과 동일 스타일
- **Typography**: 섹션 타이틀 `Outfit SemiBold text-xs uppercase tracking-widest text-gray-500`, 바디감 수치 텍스트는 타이틀과 동일 선상 우측 배치
- **Animation** (`framer-motion`): Chip 선택 시 `scale: 0.95 → 1.0` 0.1s 튕김 효과

#### 7. Definition of Done (검증 기준)

- [ ] (기능) Aroma Chip 다중 선택 및 해제가 정상 동작한다
- [ ] (기능) Flavor Rating Bar가 1~5 단계 선택을 처리하며 점차 진한 색으로 표기된다
- [ ] (기능) Body Rating Bar가 1~3 단계 선택을 처리하며 점차 진한 색으로 표기된다
- [ ] (기능) Roasting Chip 다중 선택 및 해제가 정상 동작한다
- [ ] (기능) 초기화 버튼 클릭 시 모든 필터가 해제된다
- [ ] (반응형) 모바일(`< 768px`)에서 렌더링되지 않는다

---

### BeanFilterDrawer

#### 1. Overview (맥락)

- **목적**: 모바일 화면에서 필터 버튼 클릭 시 화면 하단에서 상단으로 슬라이드되어 올라오는 Drawer 형태의 필터 패널
- **위치**: `apps/web/components/beans/BeanFilterDrawer.tsx`
- **부모 컴포넌트**: `beans/page.tsx`
- **노출 조건**: 뷰포트 너비 < 768px, 필터 버튼 클릭 시

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `framer-motion`, Tailwind CSS v4
- **기타 제약**: Drawer 외부 영역 클릭(Backdrop) 또는 닫기 버튼으로 닫힘, 컨텐츠는 `BeanFilterPanel`과 동일한 필터 UI 공유

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanFilterDrawerProps {
  isOpen: boolean;
  filters: BeanFilterState; // BeanFilterPanel과 동일 타입
  onChange: (filters: BeanFilterState) => void;
  onReset: () => void;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
```

**State**: 없음 (Controlled Component)

**Events / Callbacks**:

- `onClose()`: 닫기 버튼 또는 Backdrop 클릭 시 호출

#### 4. UI States (상태 명세)

| 상태       | 트리거 조건     | UI 표현                              |
| ---------- | --------------- | ------------------------------------ |
| **Closed** | `isOpen: false` | 화면 밖 하단 위치 (hidden)           |
| **Open**   | `isOpen: true`  | 화면 하단에서 슬라이드 업 + Backdrop |

#### 5. Functional Requirements (단계별 요구사항)

1. `isOpen: true` 시 Backdrop(`bg-black/40`)이 화면 전체를 덮으며 Drawer가 아래에서 올라온다
2. Drawer 내부는 `BeanFilterPanel`과 동일하게 `BeanSearchBar` 및 전체 필터 항목을 포함한다
3. 상단 핸들 바(드래그 표시) 또는 닫기(✕) 버튼으로 Drawer를 닫는다
4. Backdrop 클릭 시 `onClose()`를 호출한다
5. Drawer가 열린 상태에서 body 스크롤을 잠근다 (`overflow-hidden`)

#### 6. Design Spec (디자인 명세)

- **Layout**: `fixed bottom-0 left-0 right-0`, 최대 높이 `80vh`, `rounded-t-2xl`, `bg-white`, 하단 여유공간 확보를 위한 스크롤 컨테이너 패딩(`pb-12 px-6`)
- **Animation** (`framer-motion`):
  - Open: `y: 100% → 0`, Duration `0.35s`, Easing `easeOut`
  - Close: `y: 0 → 100%`, Duration `0.25s`, Easing `easeIn`
- **Handle Bar**: 상단 중앙 `w-10 h-1 rounded-full bg-gray-300 mx-auto mt-3`
- **Responsive**: 모바일(`< 768px`)에서만 사용, 그 이상에서는 렌더링하지 않음

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 필터 버튼 클릭 시 Drawer가 하단에서 슬라이드 업으로 열린다
- [ ] (기능) Backdrop 클릭 또는 닫기 버튼 클릭 시 Drawer가 닫힌다
- [ ] (기능) Drawer 열린 상태에서 배경 스크롤이 비활성화된다
- [ ] (인터랙션) 열기 `0.35s easeOut`, 닫기 `0.25s easeIn` 애니메이션이 동작한다
- [ ] (반응형) 데스크톱/태블릿(`≥ 768px`)에서 렌더링되지 않는다

---

### BeanCardList

#### 1. Overview (맥락)

- **목적**: 필터·검색 결과에 맞는 원두 카드 목록을 반응형 그리드로 렌더링하는 컨테이너 컴포넌트
- **위치**: `apps/web/components/beans/BeanCardList.tsx`
- **부모 컴포넌트**: `beans/page.tsx`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `framer-motion`, Tailwind CSS v4
- **기타 제약**: 백엔드 연동 전 Mock 데이터 사용

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanInfo {
  id: number;
  name: string; // 원두 이름 (예: "Colombia Aristides Guarnizo")
  origin: string; // 원산지 (예: "HUILA, COLOMBIA")
  primaryAroma: AromaType; // 대표 아로마 (배경 색상 결정에 사용)
  aromaImageUrl: string; // 대표 아로마 식재료 이미지 URL
  roasting: RoastingType;
  body: 1 | 2 | 3;
  link: string; // 원두 상세 페이지 경로
}

// 가격 표시 안 함 (2026-04-15 결정: 정보 탐색 서비스에서 가격 정보 비노출)

interface BeanCardListProps {
  beans: BeanInfo[];
  isLoading: boolean;
}
```

**State**: 없음

**Events / Callbacks**: 없음

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건             | UI 표현                           |
| ----------- | ----------------------- | --------------------------------- |
| **Default** | 데이터 정상 로드        | 원두 카드 반응형 그리드           |
| **Loading** | `isLoading: true`       | Skeleton 카드 그리드              |
| **Empty**   | `beans` 배열이 비어있음 | 빈 상태 안내 (`결과가 없습니다.`) |

#### 5. Functional Requirements (단계별 요구사항)

1. `beans` 배열을 순서대로 `BeanCard`로 렌더링한다
2. `isLoading: true` 시 Skeleton 카드를 그리드 형태로 표시한다
3. `beans` 배열이 비어있을 때 빈 상태 안내 문구를 중앙에 표시한다
4. 스크롤 진입 시 카드가 순차적으로 페이드인된다

#### 6. Design Spec (디자인 명세)

- **Layout**: CSS Grid
- **Animation** (`framer-motion`):
  - 트리거: 스크롤 뷰포트 진입 (`whileInView`)
  - 효과: `y: 20 → 0`, `opacity: 0 → 1`, 카드별 `delay: index * 0.05s`
  - Duration: `0.4s`, Easing: `easeOut`
- **Responsive**:
  - Mobile (`< 768px`): 2열 그리드
  - Tablet (`768px ~ 1024px`): 3열 그리드
  - Desktop (`> 1024px`): 4열 그리드

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 원두 카드 목록이 그리드로 정상 렌더링된다
- [ ] (기능) 로딩 시 Skeleton 카드가 표시된다
- [ ] (기능) 빈 결과 시 안내 문구가 중앙에 표시된다
- [ ] (인터랙션) 스크롤 진입 시 카드가 순차 페이드인된다
- [ ] (반응형) Mobile 2열 / Tablet 3열 / Desktop 4열 그리드가 동작한다

---

### BeanCard

#### 1. Overview (맥락)

- **목적**: 단일 원두를 아로마 대표 식재료 이미지와 추출 배경 색상으로 표현하는 프리미엄 카드 컴포넌트. 텍스트를 최소화하고 원산지·이름·가격만 하단에 노출한다.
- **위치**: `apps/web/components/beans/BeanCard.tsx`
- **부모 컴포넌트**: `BeanCardList`
- **레퍼런스 디자인**: 제공된 예시 이미지 (과일 아로마 → 오렌지 이미지, 웜 피치 배경)

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/image`, `next/link`, `framer-motion`, Tailwind CSS v4
- **스타일링 규칙**: 배경색은 `AromaColor Palette` 토큰에서 `primaryAroma` 기반으로 결정, 하드코딩 금지
- **이미지 규칙**: 식재료 이미지는 `object-contain` (카드 안에 식재료 전체가 보이도록), 배경 색상이 여백을 채움

#### 3. Data Interface (I/O)

**Props**:

```ts
interface BeanCardProps {
  id: number;
  name: string; // 원두 이름
  origin: string; // 원산지 (예: "HUILA, COLOMBIA")
  primaryAroma: AromaType; // 배경 색상 결정
  aromaImageUrl: string; // 식재료 이미지 URL
  link: string; // 클릭 시 이동 경로
  index?: number; // 진입 애니메이션 딜레이용
}
```

**State**: 없음

**Events / Callbacks**: 없음 (`next/link`로 직접 라우팅)

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건 | UI 표현                                          |
| ----------- | ----------- | ------------------------------------------------ |
| **Default** | 초기 렌더링 | 아로마 배경색 + 중앙 식재료 이미지 + 하단 텍스트 |
| **Hover**   | 마우스 오버 | 카드 미세 부유(`y: -4px`) + 그림자 강화          |

#### 5. Functional Requirements (단계별 요구사항)

1. `primaryAroma` 값에 따라 `AromaColor Palette`에서 배경 색상을 결정한다
2. 카드 중앙에 `aromaImageUrl` 이미지를 `object-contain`으로 표시한다
   - 이미지는 카드 높이의 약 60~70%를 차지하며, 식재료 전체가 보인다
3. 카드 하단 영역에 텍스트를 최소화하여 표시한다 (텍스트 순서: 원산지 → 원두명)
   - 원산지: `Uppercase`, `text-xs`, `tracking-widest`, 반투명(`text-black/50`)
   - 원두명: `Outfit SemiBold`, `text-sm`, `text-black/85`

> **변경 사유 (Context)**: 2026-04-15 결정. Dripnote는 정보 탐색 서비스이므로 가격을 강조하는 커머스 UI와 구분하기 위해 가격 표시를 생략합니다. 4. 호버 시 카드가 위로 살짝 부유하며 그림자가 강해진다 5. 클릭 시 `link`로 라우팅한다

#### 6. Design Spec (디자인 명세)

- **Layout**: `aspect-[3/4]` (세로 카드), `rounded-2xl`, `overflow-hidden`
- **Background**: `primaryAroma` → `AromaColor Palette` 토큰 매핑 (예: `bg-aroma-fruit = #FDDCB5`)
- **Image Area**: 카드 중앙 배치, `object-contain`, 카드 높이 60~70%, 배경색이 여백을 자연스럽게 채움
- **Text Area**: 카드 하단, 좌측 정렬, 내부 `px-4 pb-5 pt-3`
- **Animation** (`framer-motion`):
  - 마운트: 부모 `BeanCardList`의 진입 애니메이션 상속
  - 호버: `y: 0 → -4`, `shadow-md → shadow-xl`, Duration `0.25s`, Easing `easeOut`
- **Typography**:
  - 원산지: `Outfit`, Regular, `text-xs`, Uppercase, `tracking-[0.15em]`, `text-black/50`
  - 원두명: `Outfit`, SemiBold, `text-sm`, `text-black/85`
- **Responsive**: 부모 `BeanCardList` 그리드에 따라 크기 자동 조절

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 카드 클릭 시 `link`로 라우팅된다
- [ ] (디자인) `primaryAroma`에 따라 `AromaColor Palette`의 배경 색상이 적용된다
- [ ] (디자인) 식재료 이미지가 `object-contain`으로 카드 중앙에 표시된다
- [ ] (디자인) 하단 텍스트가 원산지 → 원두명 → 가격 순서로 표시된다
- [ ] (디자인) 원산지가 Uppercase, `tracking-[0.15em]`, 반투명으로 표시된다
- [ ] (인터랙션) 호버 시 `y: -4px`, `shadow-xl` 전환이 `0.25s easeOut`으로 동작한다

---

## 5. 아키텍처 요약

```text
beans/page.tsx (메인 엔트리)
  ├── BeanFilterPanel       ← 필터 사이드바 (Desktop/Tablet)
  │     └── BeanSearchBar   ← 통합 검색창
  ├── BeanFilterDrawer      ← 필터 Drawer (Mobile)
  │     └── BeanSearchBar   ← 통합 검색창
  └── BeanCardList
        └── BeanCard × N
```

**상태 관리**: `beans/page.tsx`에서 `filterState`와 `searchQuery`를 관리하고 하위 컴포넌트에 Props로 전달합니다.

```ts
// page.tsx 상태 구조
const [searchQuery, setSearchQuery] = useState('');
const [filters, setFilters] = useState<BeanFilterState>(defaultFilters);
const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

// 필터된 원두 목록 = useMemo(() => applyFilters(beans, filters, searchQuery), [...])
```

---

## 6. 핵심 동작 요구사항

- **텍스트 최소화**: 카드 내 키워드(원산지, 원두명, 가격)만 노출하며 설명 문구 배제
- **아로마 색상 시스템**: `AromaColor Palette` 토큰으로 카드 배경 색상을 일관성 있게 관리
- **필터 즉시 반영**: 필터 변경 시 카드 목록이 즉시 업데이트 (API 또는 클라이언트 필터링)
- **모바일 Drawer**: 모바일에서 필터가 Drawer로 동작하여 탐색 공간을 최대화
- **Mock 지원**: 백엔드 없이 `mockBeansData`로 전체 UI 동작 검증 가능

---

## 7. 미결 사항 (Feedback 요청)

> 스펙 작성 중 결정이 필요한 항목입니다.

| #   | 항목                   | 현재 가정                       | 확인 필요                                                  |
| --- | ---------------------- | ------------------------------- | ---------------------------------------------------------- |
| 1   | **가격 표시 여부**     | 선택적으로 표시 (`price?`)      | 서비스 특성상 가격 노출 필요 여부                          |
| 2   | **필터링 방식**        | 클라이언트 사이드 필터링 (Mock) | API 연동 시 서버 사이드 필터링으로 전환 여부               |
| 3   | **카드 클릭 목적지**   | `/beans/{id}` 원두 상세 페이지  | 상세 페이지 존재 여부 및 경로                              |
| 4   | **Flavor 필터 표현**   | Rating Bar (연속된 막대)        | (완료) 이전 Step Selector에서 레이팅 바 형태로 스펙 개선됨 |
| 5   | **아로마 대표 이미지** | Unsplash 식재료 이미지 URL      | 자체 에셋 또는 외부 이미지 출처 결정                       |
| 6   | **페이지네이션**       | 없음 (전체 목록)                | 무한 스크롤 또는 페이지네이션 적용 여부                    |

---

## 8. API 연동 명세 (초안)

### 상황

> 원두 목록 조회 (필터·검색 파라미터 포함)

### Request

```
GET /api/beans?search={keyword}&aromas={}&bitterness={1-5}&sweetness={1-5}&acidity={1-5}&body={1-3}&roasting={}
```

| Query Parameter | Type       | Description        | 필수 |
| --------------- | ---------- | ------------------ | ---- |
| `search`        | `string`   | 검색 키워드        | ✗    |
| `aromas`        | `string[]` | 아로마 필터 (다중) | ✗    |
| `bitterness`    | `number`   | 쓴맛 1~5           | ✗    |
| `sweetness`     | `number`   | 단맛 1~5           | ✗    |
| `acidity`       | `number`   | 산미 1~5           | ✗    |
| `body`          | `number`   | 바디감 1~3         | ✗    |
| `roasting`      | `string[]` | 로스팅 타입 (다중) | ✗    |

### Response Body

```ts
interface BeansResponse {
  statusCode: string;
  message: string;
  data: {
    beans: BeanInfo[];
    total: number;
  };
}
```
