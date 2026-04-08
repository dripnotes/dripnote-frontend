# 구현 계획 (Implementation Plan) - [Infrastructure] 에이전트 규칙 준수 및 로그인 페이지 개발

## 1. 개요 및 배경 (Context)

- **목표**: 에이전트의 규칙 준수 인프라를 구축하고, `specs/login-page.md`에 정의된 프리미엄 로그인 UI를 구현합니다.
- **배경**: 이전 작업에서 누락된 프로세스(PLAN.md, Rule 14, 21)를 보강 완료했으며, 이제 실질적인 기능 구현 단계로 진입합니다.

## 2. 작업 단계 (Tasks)

### Phase 1: Infrastructure (Completed ✅)

- [x] `specs/login-page.md` 스펙 보완 (Rule 21 적용)
- [x] `README.md` 에이전트 지침 및 스킬 가이드 추가
- [x] `.agents/workflows/session-init.md` 워크플로우 생성
- [x] `.agents/rules/skill-guidelines.md` (Agent Skills 사양) 구축
- [x] 기존 스킬 리팩토링 (`setup-monorepo`)

### Phase 2: Login Page Implementation (Next 🚀)

- [x] `@coffee-service/ui-library` 내 소셜 로그인 버튼 컴포넌트 테마 연동 작업 완료
- [ ] `apps/web/app/login/page.tsx` 레이아웃 및 배경 시스템 구축
- [ ] MSW 또는 고정 토큰을 활용한 인증 흐름 하네스 구축

### Phase 2.1: UI Library Tailwind Integration Fix (대기 중)

- **문제 상황**: 인라인 스타일을 제거하자 버튼 스타일이 깨지는 현상이 발생했습니다. 이는 `apps/web`의 Tailwind 설정이 외부 모노레포 패키지인 `packages/ui-library`를 온전히 스캔하지 않아, 해당 UI 패키지 안에서만 존재하는 유틸리티 클래스(`bg-google`, `hover:bg-kakao-hover` 등)가 생성되지 않았기 때문입니다.
- **해결 계획**:
  1. `apps/web/app/globals.css`에 `@source "../../packages/ui-library";`를 추가하여 v4 모노레포 스캐닝 적용.
  2. `apps/web/tailwind.config.ts`의 `content` 배열에 외부 워크스페이스인 `../../packages/ui-library/**/*.tsx` 경로 추가.
  3. `--social-kakao-fg` 값을 이전 명세서 및 인라인 스타일과 완전히 동일한 `rgba(0, 0, 0, 0.85)`로 복구.

---

명세서에 명시된 "Fast & Linear Fluids" 모션 디자인에 맞춰 마우스 위치에 따라 버튼이 부드럽게 떠오르며 그림자가 강조되는 인터랙션을 **Phase 2.2**로 계획했습니다. 승인이 떨어지면 `Button.tsx`를 수정하겠습니다.
