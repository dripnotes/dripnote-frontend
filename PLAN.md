# 구현 계획 (Implementation Plan) - [Infrastructure] 에이전트 규칙 준수 및 원두 페이지 UX 고도화

## 1. 개요 및 배경 (Context)

- **목표**: 에이전트의 규칙 준수 인프라를 구축하고, `specs/login-page.md`에 정의된 프리미엄 로그인 UI를 구현하며, OpenAI의 철학에 기반한 **자율적 검증 환경(Harness)**을 구축합니다.
- **배경**: 인프라 설정을 마치고 로그인 페이지의 시각적 구현을 완료했습니다. 이제 에이전트가 자율적으로 기능의 완결성을 검증하고 스스로 오류를 수정할 수 있는 **'하네스 엔지니어링'** 전략을 적용하여 개발 생산성을 극대화합니다.

## 2. 작업 단계 (Tasks)

### Phase 1: Infrastructure (Completed ✅)

- [x] `specs/login-page.md` 스펙 보완 (Rule 21 적용)
- [x] `README.md` 개발 사이클 및 방법론 가이드 구축
- [x] `.agents/workflows/session-init.md` 워크플로우 생성 및 최적화 (이후 제거)
- [x] `.agents/rules/skill-guidelines.md` (Agent Skills 사양) 구축
- [x] 기존 스킬 리팩토링 (`setup-monorepo`)
- [x] 하네스 엔지니어링 전략 수립 및 규칙화 ([harness-strategy.md](file:///.agents/rules/harness-strategy.md))

### Phase 2: Login Page Implementation (Completed ✅)

- [x] Phase 2.1: UI Library Tailwind Integration Fix
- [x] Phase 2.2: 소셜 로그인 버튼 마우스 인터랙션 구현
- [x] Phase 2.4: 인증 흐름 하네스 구축
  - 실제 백엔드 없이 소셜 로그인 완료 후의 토큰 처리(`LocalStorage`) 및 리다이렉션 로직을 검증할 수 있는 `LoginCallbackPage` 환경 구축 완료. (Rule 22 적용)

### Phase 3: Infrastructure Polishing & Main Page Enhancement (In Progress 🚀)

- [x] Phase 3.1: 공통 명세 체계 구축 (`specs/common-ui-spec.md`) ✅
- [x] Phase 3.2: 분산형 히스토리 아카이브 및 7-Stage 프로토콜 도입 (`docs/history/`) ✅
- [x] Phase 3.3: 로그인 페이지 애니메이션 타이밍 최적화 (사용자 피드백 반영 및 고도화) ✅
- [x] Phase 3.4: Button 컴포넌트 icon variant 추가 및 Header 리팩토링 ✅
- [x] Phase 3.5: 로그인 페이지 모바일 뷰 최적화 (100vh 내 요소 배치 및 스크롤 제거) ✅
- [x] Phase 3.6: 히어로 섹션 개인화 및 UI 최적화 ✅
- [x] Phase 3.7: 플레이버 노트 탐색(Flavor Notes) UI 개편 및 이미지 카드 적용 ✅
- [ ] Phase 3.8: 북마크 기능 하네스 구축 및 UI 연동
- [ ] Phase 3.9: 실제 API 명세에 맞춘 Mock Data 정교화 (MSW 등 고려)

### Phase 4: BeanSearchBar Relocation (Completed ✅)

- [x] `BeanFilterPanel` 및 `BeanFilterDrawer`에 `BeanSearchBar` 통합 ✅
- [x] 검색 상태 전파를 위한 Props 인터페이스 확장 ✅
- [x] 검색창 이동에 따른 결과 요약 영역 UI 재배치 ✅

### Phase 5: Beans Page UI Consistency & UX Optimization (Completed ✅)

- [x] Phase 5.1: 데스크톱 카드 목록 너비 고정 (`w-full` 및 컨테이너 정렬) ✅
- [x] Phase 5.2: 필터 변경 시 `AnimatePresence` 및 `layout` 애니메이션 적용 ✅
- [x] Phase 5.3: 필터 변경 시 자연스러운 슬라이딩 효과 검증 ✅

### Phase 6: Deferred Filtering & Sticky Apply Button (In Progress 🚀)

- [ ] Phase 6.1: 검색창(`BeanSearchBar`) 엔터 키보드 이벤트 전환 (Live 변경 방지)
- [ ] Phase 6.2: 데스크톱 필터 패널(`BeanFilterPanel`) 로컬 상태 관리 및 하단 스티키 "적용하기" 버튼 추가
- [ ] Phase 6.3: 모바일 필터 드로어(`BeanFilterDrawer`) 로컬 상태 동기화 및 "적용하기" 명시적 제출 구현
