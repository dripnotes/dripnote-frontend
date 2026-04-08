# 구현 계획 (Implementation Plan) - [Infrastructure] 에이전트 규칙 준수 및 로그인 페이지 개발

## 1. 개요 및 배경 (Context)

- **목표**: 에이전트의 규칙 준수 인프라를 구축하고, `specs/login-page.md`에 정의된 프리미엄 로그인 UI를 구현하며, OpenAI의 철학에 기반한 **자율적 검증 환경(Harness)**을 구축합니다.
- **배경**: 인프라 설정을 마치고 로그인 페이지의 시각적 구현을 완료했습니다. 이제 에이전트가 자율적으로 기능의 완결성을 검증하고 스스로 오류를 수정할 수 있는 **'하네스 엔지니어링'** 전략을 적용하여 개발 생산성을 극대화합니다.

## 2. 작업 단계 (Tasks)

### Phase 1: Infrastructure (Completed ✅)

- [x] `specs/login-page.md` 스펙 보완 (Rule 21 적용)
- [x] `README.md` 에이전트 지침 및 스킬 가이드 추가
- [x] `.agents/workflows/session-init.md` 워크플로우 생성
- [x] `.agents/rules/skill-guidelines.md` (Agent Skills 사양) 구축
- [x] 기존 스킬 리팩토링 (`setup-monorepo`)

### Phase 2: Login Page Implementation (Completed ✅)

- [x] Phase 2.1: UI Library Tailwind Integration Fix
- [x] Phase 2.2: 소셜 로그인 버튼 마우스 인터랙션 구현
- [x] Phase 2.4: 인증 흐름 하네스 구축
  - 실제 백엔드 없이 소셜 로그인 완료 후의 토큰 처리(`LocalStorage`) 및 리다이렉션 로직을 검증할 수 있는 `LoginCallbackPage` 환경 구축 완료. (Rule 22 적용)

### Phase 3: Infrastructure Polishing & Main Page Enhancement (In Progress 🚀)

- [x] Phase 3.1: 공통 명세 체계 구축 (`specs/common-ui-spec.md`) ✅
- [x] Phase 3.2: 기존 스펙 리팩토링 및 불필요 파일 제거 (`docs/` 삭제) ✅
- [ ] Phase 3.3: 히어로 섹션 개인화 (인증 상태 연동 및 인사말 노출) 🚀
- [ ] Phase 3.4: 북마크 기능 하네스 구축 및 UI 연동
- [ ] Phase 3.5: 실제 API 명세에 맞춘 Mock Data 정교화 (MSW 등 고려)
