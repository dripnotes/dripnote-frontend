# Dripnote (Coffee Service)

> [!NOTE]
> 이 프로젝트는 AI 에이전트와 인간 개발자가 협력하여 구축하는 프리미엄 홈커피 기록 및 추천 플랫폼입니다.

## 🏛️ AI & Methodology

Dripnote는 OpenAI의 **Harness Engineering** 철학을 바탕으로 AI 에이전트의 자율성과 일관된 품질을 보장합니다.

### Development Cycle

에이전트는 세션 시작부터 최종 커밋까지 다음의 사이클을 준수합니다.

```mermaid
graph TD
    %% 1. 세션 시작 (Rule 24)
    Start((세션 시작)) --> RuleCheck[<b>1. Rule & Plan 숙지</b><br/>global.md, harness-strategy.md,<br/>PLAN.md 확인]
    RuleCheck --> SessionReport[<b>2. 숙지 보고 (Rule 24)</b><br/>사용자에게 동기화 상태 보고]

    %% 2. 사용자 지시 및 계획 (Planning Stage)
    SessionReport --> UserRequest{<b>3. 사용자 지시 수신</b>}
    UserRequest --> Analysis[<b>4. 분석 및 설계 (Stage 1)</b><br/>common-ui-spec.md 필수 확인<br/>Harness 전략 수립]
    Analysis --> PlanUpdate[<b>5. PLAN.md 업데이트</b><br/>Implementation Plan 작성]

    %% 3. 승인 및 구현 (Execution Stage)
    PlanUpdate --> Approval{<b>6. 사용자 승인 (Stage 2)</b>}
    Approval -- 보완 필요 --> Analysis
    Approval -- 승인 (진행해) --> Implementation[<b>7. 구현 (Stage 3)</b><br/>Harness 인프라 우선 구축<br/>ui-library & Type Safety 준수]

    %% 4. 검증 및 수정 (Review Stage)
    Implementation --> SelfReview[<b>8. 자가 검증 (Stage 4)</b><br/>Harness 기반 테스트/평가<br/>Lint & Format 확인 및 Self-Correction]
    SelfReview --> UserVerification{<b>9. 최종 확인 (Stage 5)</b><br/>pnpm dev 시연 및 피드백}
    UserVerification -- 폴리싱 필요 --> Implementation

    %% 5. 마무리 (Close Stage)
    UserVerification -- 확인 완료 --> DocUpdate[<b>10. 문서 최신화 (Stage 6)</b><br/>Specs 업데이트 - 이유 명시 필수<br/>walkthrough.md 작성]
    DocUpdate --> GroupedCommit[<b>11. 작업 단위 커밋</b><br/>작업별 그룹화 커밋]
    GroupedCommit --> End((완료))
```

### Core Principles

- **Vibe Coding**: 구현 전 `Implementation Plan` 수립 및 승인 필수 (6단계 주기).
- **Harness Engineering**: 에이전트가 자율적으로 검증할 수 있는 환경(Mock, Test) 선제적 구축. 상세 전략은 `[.agents/rules/harness-strategy.md]` 참조.
- **Spec-driven Development**: `specs/` 하위 명세서가 모든 개발의 기준이 되며, 변경 시 근거(Context) 기술 필수.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router), React 19+
- **Language**: TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS v4, Framer Motion (Interactions)
- **State/Data**: Zustand, TanStack Query v5
- **Validation**: Zod, React Hook Form
- **Component**: Custom UI Library (CVA 기반)

## 🚀 Getting Started

이 프로젝트는 PNPM Monorepo 구조입니다.

```bash
# 의존성 설치
pnpm install

# 서비스 실행 (web 앱)
pnpm dev

# 포맷팅 및 린트
pnpm format
pnpm lint
```

### Available Scripts

- `pnpm dev`: 메인 프로젝트(@coffee-service/web) 개발 서버 실행
- `pnpm build`: 전체 프로젝트 빌드
- `pnpm format`: Prettier를 이용한 전체 코드 포맷팅
- `pnpm lint`: 전체 프로젝트 린트 체크

## 📄 License

This project is licensed under the MIT License.
