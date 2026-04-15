---
description: >-
  스펙(명세서) 문서를 작성하거나 컴포넌트를 분석 및 구현할 때 이 가이드라인을 참조하십시오.
  사용자가 스펙 작성, 컴포넌트 명세, UI 설계를 요청할 때 트리거하십시오.
---

# 컴포넌트 스펙 작성 가이드라인 (Component Spec Guidelines)

모든 컴포넌트 명세는 아래 표준 템플릿을 기반으로 작성합니다.  
스펙을 작성하기 전에 반드시 `specs/common-ui-spec.md`를 먼저 확인하여 디자인 토큰과의 일관성을 확보합니다. (Rule 23)

---

## 표준 템플릿 (Standard Template)

````markdown
## [ComponentName]

### 1. Overview (맥락)

- **목적**: 이 컴포넌트가 존재하는 이유 (1~2문장 이내로 간결하게)
- **위치**: `apps/web/components/.../ComponentName.tsx`
- **부모 컴포넌트**: 어디서 렌더링되는지 (예: `HeroSection`, `RootLayout`)

---

### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: (예: `framer-motion`, `embla-carousel-react`, `react-kakao-maps-sdk`)
- **스타일링 규칙**: (예: Tailwind CSS v4만 사용, 인라인 스타일 금지)
- **컴포넌트 규칙**: (예: 버튼은 반드시 `ui-library`의 `Button` 컴포넌트 사용)
- **기타 제약**: (예: Client Component 필수, SSR 불가 등)

---

### 3. Data Interface (I/O)

**Props**:
​`ts
interface ComponentNameProps {
  // 필수 Props와 선택 Props를 구분하여 명시
  requiredProp: string;
  optionalProp?: number;
}
​`

**State** (내부 상태):
| 상태명 | 타입 | 초기값 | 설명 |
|--------|------|--------|------|
| `isOpen` | `boolean` | `false` | 드롭다운 열림 여부 |

**Events / Callbacks** (부모로 전달):
| 이벤트명 | 타입 | 설명 |
|----------|------|------|
| `onSelect` | `(value: string) => void` | 항목 선택 시 호출 |

---

### 4. UI States (상태 명세)

| 상태        | 트리거 조건          | UI 표현                   |
| ----------- | -------------------- | ------------------------- |
| **Default** | 초기 렌더링          | 정상 콘텐츠 노출          |
| **Loading** | 데이터 페칭 중       | Skeleton UI 또는 스피너   |
| **Error**   | API 실패 / 예외 발생 | 에러 메시지 + 재시도 버튼 |
| **Empty**   | 데이터 결과 없음     | 빈 상태 안내 문구         |

---

### 5. Functional Requirements (단계별 요구사항)

1. ...
2. ...
3. ...

---

### 6. Design Spec (디자인 명세)

- **Layout**: 레이아웃 구조 및 정렬 방식 (예: Flex, Grid, 컬럼 수)
- **Animation** (`framer-motion` 기준):
  - 트리거: (예: 스크롤 진입 시, 호버 시)
  - Duration: `0.2s ~ 0.4s` (공통 명세 기준)
  - Easing: `ease-out` 또는 `linear`
- **Responsive**:
  - Mobile (`< 768px`): ...
  - Tablet (`768px ~ 1024px`): ...
  - Desktop (`> 1024px`): ...

---

### 7. Definition of Done (검증 기준)

- [ ] (기능) 특정 동작 시 A가 발생한다
- [ ] (기능) 에러 발생 시 B가 노출된다
- [ ] (상태) Loading 상태에서 Skeleton UI가 표시된다
- [ ] (디자인) common-ui-spec.md의 디자인 토큰(Color, Typography)을 준수한다
- [ ] (반응형) 모바일/태블릿/데스크톱 레이아웃이 정상 동작한다
- [ ] (인터랙션) Hover/Click 애니메이션이 명세에 따라 동작한다
````

---

## 작성 규칙 (Writing Rules)

1. **컴포넌트 단위로 작성**: 페이지 스펙 내 각 UI 섹션(GNB, HeroSection, Footer 등)은 독립된 컴포넌트 블록으로 작성합니다.
2. **공통 명세 우선**: Design Spec 작성 시 `specs/common-ui-spec.md`의 디자인 토큰(Color, Typography, Motion)을 최우선으로 참조하고, 토큰 이름을 직접 인용합니다.
3. **Mock 지원 원칙**: `Data Interface`에서 Props/Schema를 정의할 때는 백엔드 없이도 목업(Mock)으로 동작 가능한 구조를 전제합니다.
4. **상태 명세 필수**: `UI States` 섹션에서 최소 Default/Error 상태는 반드시 정의합니다.
5. **DoD는 검증 가능하게**: `Definition of Done` 항목은 "~한다" 형태의 구체적인 결과 문장으로 작성하며, 추상적인 표현(예: "잘 동작한다")은 허용하지 않습니다.
6. **변경 사유 명시**: 스펙 내용 변경 시 반드시 변경 이유(Context 블록)를 함께 작성합니다. (global.md 스펙 변경 이유 명시 규칙 준수)
