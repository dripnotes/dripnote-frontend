# Common UI Spec Improvement Plan

`specs/common-ui-spec.md`를 고도화하여 프로젝트의 디자인 시스템과 성능 전략을 명확히 정의합니다.

## 1. 작업 목표

- **성능 최적화**: 이미지 위주의 서비스 특성을 고려한 FCP/LCP 개선 및 로딩 UX 표준화.
- **디자인 시스템 정교화**: 시맨틱 컬러, Z-Index 관리, 반응형 타이포그래피 도입.
- **개발 생산성**: Tailwind CSS 커스텀 테마 활용 및 서버 컴포넌트 우선 원칙 수립.

## 2. 상세 작업 내용

### 2.1 [UPDATE] 디자인 토큰 섹션 (Design Tokens)

- **시맨틱 컬러 시스템**: `Amber-500` 등의 원시 토큰을 `brand-primary`, `bg-base` 등 의미론적 토큰으로 매핑.
- **Z-Index 관리**: 전역 레이어(`modal`, `drawer`, `header` 등)의 순서 수치 정의.
- **반응형 타이포그래피**: 화면 크기에 따라 유동적으로 변화하는 폰트 크기 기준 수립.
- **Tailwind 연동**: 모든 토큰은 `globals.css`의 `@theme` 블록에 정의하여 CSS-first 방식으로 관리 및 재사용하도록 명시.

### 2.2 [NEW] 성능 및 에셋 최적화 (Performance & Asset Optimization)

- **이미지 로딩 전략**:
  - `next/image` 필수 사용 및 LCP 요소 `priority` 속성 부여.
  - 비동기 로딩 시 `Skeleton` 플레이스홀더 노출 의무화.
  - 이미지 노출 시 `framer-motion`을 활용한 선형 페이드인(`opacity 0 -> 1`) 효과 적용.
- **FCP/LCP 개선**: 중요 에셋 프리로딩 및 레이아웃 시프트(CLS) 방지 전략.

### 2.3 [NEW] 아키텍처 및 구현 원칙 (Implementation Principles)

- **Server-first Approach**: 클라이언트 컴포넌트 사용을 최소화하고 인터랙션 단위로 모듈화.
- **웹 접근성(A11y)**: Focus Ring 스타일링, 시맨틱 태그 활용, ARIA 속성 기본값 준수.

## 3. 검증 계획

- `specs/common-ui-spec.md` 내용이 프로젝트 전체 컴포넌트 구현의 가이드라인으로 기능하는지 검토.
- 실제 `tailwind.config.ts` 및 `ui-library` 컴포넌트들이 해당 명세를 준수할 수 있는 구조인지 확인.
