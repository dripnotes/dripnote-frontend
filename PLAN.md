# 구현 계획 (Implementation Plan) - [Infrastructure] 에이전트 규칙 준수 및 로그인 페이지 개발

## 1. 개요 및 배경 (Context)

- **목표**: 에이전트의 규칙 준수 인프라를 구축하고, `specs/login-page.md`에 정의된 프리미엄 로그인 UI를 구현하며, 실제 서버 없이도 인증 흐름을 검증할 수 있는 환경(Harness)을 구축합니다.
- **배경**: 인프라 설정을 마치고 로그인 페이지의 시각적 구현(배경, 헤더, 소셜 버튼)을 완료했습니다. 이제 실제 인증 로직 연동을 위한 준비 단계인 하네스 구축이 필요합니다.

## 2. 작업 단계 (Tasks)

### Phase 1: Infrastructure (Completed ✅)

- [x] `specs/login-page.md` 스펙 보완 (Rule 21 적용)
- [x] `README.md` 에이전트 지침 및 스킬 가이드 추가
- [x] `.agents/workflows/session-init.md` 워크플로우 생성
- [x] `.agents/rules/skill-guidelines.md` (Agent Skills 사양) 구축
- [x] 기존 스킬 리팩토링 (`setup-monorepo`)

### Phase 2: Login Page Implementation (In Progress 🚀)

- [x] Phase 2.1: UI Library Tailwind Integration Fix (완료 ✅)
- [x] Phase 2.2: 소셜 로그인 버튼 마우스 인터랙션 구현 (완료 ✅)
- [x] Phase 2.4: 인증 흐름 하네스 구축 (완료 ✅)
  - 실제 백엔드 없이 소셜 로그인 완료 후의 리다이렉션 및 토큰 처리 로직을 검증할 수 있는 환경을 성공적으로 구축했습니다.

### Phase 3: Main Page Enhancement (Next 🚀)

- **목표**: 메인 페이지의 시각적 요소와 개인화 기능을 강화합니다.
- **주요 작업**:
  - [ ] 히어로 섹션 개인화 (인증된 사용자의 경우 맞춤형 인사말 노출)
  - [ ] 북마크 기능 하네스 구축 및 UI 연동
  - [ ] 실제 API 명세에 맞춘 Mock Data 정교화 (MSW 등)
