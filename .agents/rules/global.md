---
trigger: always_on
---

# AI Context & Global Rules

이 문서는 AI 어시스턴트가 프로젝트 파악 및 코드 작성 시 항상 최우선으로 지켜야 하는 전역 규칙입니다.

## 1. Strict Developer & Agent Rules (필수 전역 규칙)

- 모든 핵심 UI 컴포넌트는 반드시 `ui-library` 패키지의 컴포넌트를 사용해야 합니다.
- 확립된 모노레포 구조 및 명명 규칙을 엄격하게 준수해야 합니다.
- TypeScript의 모범 사례와 타입 안전성(Type Safety)을 항상 유지해야 합니다.

## 2. Core Operating Principles (핵심 동작 원칙)

- **사전 검토 및 문제 제기 (Proactive Feedback)**: 작업을 시작하기 전에 사용자의 지시사항에 논리적 오류, 모순, 혹은 더 나은 아키텍처/설계 방향성이 보인다면 **즉시 코드 작성을 시작하지 말고 사용자에게 의문을 제기**해야 합니다. 개선 사항을 먼저 제안하고 논의하여 합의된 후 작업에 착수하십시오.
- **문서 수정 사전 검토제 (Document Update Review)**: 사용자로부터 "문서를 업데이트하라"는 일반적인 지시가 내려왔을 때, 곧바로 파일 작성 명령을 실행하지 마십시오. 먼저 **어디에 있는 어떤 문서를, 어떤 내용으로 편집할 것인지에 대한 계획**을 대화나 프롬프트를 통해 사용자에게 브리핑한 후, 사용자의 **검토 및 승인(Approval)**이 선행될 때에만 도구를 사용하여 파일 변경 작업을 마저 수행하십시오.
- **7단계 생명주기 준수 (Lifecycle Compliance)**: AI 에이전트는 `.agents/workflows/vibe-coding-cycle.md`에 정의된 **7단계 생명주기를 절대적으로 준수**해야 합니다.
- **허가 단계 묵살 금지 (Approval Gate)**: 사용자가 자동 실행을 명시적으로 허락했거나 구조에 영향을 주지 않는 단순한 수정이 아닌 이상, 초기 프롬프트만 듣고 구두 승인 없이 즉시 애플리케이션 코드를 수정해서는 안 됩니다.
- **대규모 수정 사전 알림 (Large-scale Change Notice)**: 작업 수행 전 대규모 코드 수정이 필요하다고 판단되는 경우, 즉시 수정에 착수하지 말고 **사용자에게 해당 사실과 영향 범위를 먼저 알리고 승인을 받은 후 진행**합니다.
- **외부 AI 리포트 대응 (AI Report Handling)**: 사용자가 'Prompt for AI Agents' 형식의 리포트 조각을 제공하는 경우, 전적으로 `.agents/workflows/ai-review-lifecycle.md`의 워크플로우에 따라 수행해야 합니다. 분석 후 한국어로 설명하고, 최종 승인 시 한국어로 커밋 메시지를 생성하여 커밋까지 완료합니다.
- **다음 작업 제안 (Next Action Suggestions)**: 작업이 완료된 후에는 다음에 진행할 수 있는 작업을 **2~3가지** 제시합니다. 다음 기능 구현, 현재 기능 개선, 문서 작성, 커밋 등 상황에 맞는 옵션을 제안합니다.

## 3. Documentation Strategy (문서 관리 규칙)

- **Specs**: 화면 및 기능 명세서는 `specs/` 하위에 작성하며 최신 상태로 반영/유지합니다.
  - **스펙 변경 이유 명시 규칙**: 스펙 내용에 변경점이 발생하여 업데이트할 때는, 단순히 변경 내역만 적지 말고 **반드시 '그렇게 결정하고 변경한 이유(Reason / Context)'에 대한 설명을 함께 문서에 작성**해야 합니다.
  - **공통 명세 준수 의무 (Rule 23)**: 모든 페이지 전용 스펙을 작성하거나 수정할 때는 반드시 `specs/common-ui-spec.md`를 먼저 확인하여 디자인 토큰 및 공통 UI 패턴과의 일관성을 확보해야 합니다.
  - **세션 시작 보고 규칙 (Rule 24)**: 에이전트는 새로운 세션 시작 시 규칙 숙지와 `PLAN.md` 확인이 완료되었다면 사용자에게 간략히 보고하여 동기화 상태를 확인받아야 합니다.
  - **템플릿 준수 의무 (Rule 25)**: 에이전트는 히스토리나 명세서 등 프로젝트 관리 문서를 작성할 때 반드시 `.agents/templates/` 디렉토리의 표준 템플릿을 확인하고 이를 준수해야 합니다.
  - **커밋 전 문서화 의무 (Rule 26)**: 변경 사항을 커밋하기 전에 반드시 `CHANGELOG.md` 및 `docs/history/` 아카이브를 최신화해야 합니다.
  - **한국어 커밋 메시지 (Rule 27)**: 모든 커밋 메시지는 반드시 **한국어**로만 작성하며, 명확하고 상세한 변경 내역을 담아야 합니다.
  - **컴포넌트 스펙 작성 가이드라인 준수 (Rule 28)**: 컴포넌트 명세를 작성하거나 수정할 때는 반드시 `.agents/rules/spec-guidelines.md`의 표준 템플릿을 사용해야 합니다.
  - **구현 전 스펙 선반영 의무 (Rule 29)**: 구현 내용이 기존 스펙과 달라지는 경우, **코드 수정에 앞서 반드시 해당 컴포넌트의 스펙(`specs/`)을 먼저 업데이트**해야 합니다. 스펙이 항상 구현의 기준이 되어야 하며, 코드가 스펙을 앞서가는 상황을 방지합니다.
- **PLAN.md 의무 작성**: 1단계(계획) 진행 시, 반드시 프로젝트 최상단 루트에 `PLAN.md` 파일을 생성 또는 갱신하여 사용자가 작업 환경에서 구체적인 계획안을 직접 읽을 수 있도록 조치해야 합니다.

## 4. Tech Stack & Environment

- **Workspace**: PNPM Monorepo (`pnpm` 기반). 확립된 모노레포 구조와 명명 규칙을 엄격하게 준수합니다.
- **Environment Variables**: 모노레포 구조 특성상 Next.js 서버는 `apps/web/` 내에서 구동되므로, `.env.local` 등 특정 앱의 구동 환경변수 파일은 프로젝트 최상단 파일이 아닌 **`apps/web/` 하위 내부**에 위치해야 합니다.
- **Commands**: 패키지 구동 혹은 스크립트는 반드시 **`pnpm --filter @coffee-service/web <명령어>`** 구조로 실행합니다.
- **Library & Styling**: Next.js 15 App Router, Tailwind CSS v4(`linear-to`, `shrink-0` 등 변경점 적용 필수), `lucide-react`.

## 5. General Implementation Principles

- **UI Components**: 모든 핵심 UI 요소는 반드시 `ui-library` 패키지의 공용 컴포넌트를 우선적으로 활용해야 합니다.
- **TypeScript**: TypeScript의 모범 사례와 타입 안전성(Type Safety)을 항상 엄격하게 유지합니다.
- **Design Aesthetic**: UI 구현 시 기능 동작 이상으로 심미성과 사용자 경험(Premium Feel)을 최고 수준으로 고려해야 합니다. 부드러운 전환을 위해 `framer-motion`을 적극 활용합니다.
- **Harness Engineering (Rule 22)**: 소프트웨어 개발을 '에이전트 우선(Agent-first)' 관점에서 재구성합니다. 엔지니어는 단순히 코드를 작성하는 것을 넘어, 에이전트가 자율적으로 코드를 실행, 테스트, 검증하고 스스로 오류를 수정(Self-Correction)할 수 있는 **'하네스(Harness)'** 환경을 설계하고 구축해야 합니다. 상세 내용은 [.agents/workflows/vibe-coding-cycle.md](../workflows/vibe-coding-cycle.md)의 7단계 프로세스를 참조하십시오.
