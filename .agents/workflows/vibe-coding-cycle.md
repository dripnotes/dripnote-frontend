---
description: [Vibe Coding + Harness Engineering] 고품질 에이전트 협업 개발을 위한 통합 프로토콜
---

# Dripnote 개발 프로토콜 (Development Protocol)

이 문서는 OpenAI의 **하네스 엔지니어링(Harness Engineering)** 철학과 **바이브 코딩(Vibe Coding)** 워크플로우를 결합한 Dripnote 프로젝트의 표준 개발 지침입니다. 에이전트와 인간 개발자는 이 사이클을 준수하여 자율적이고 안정적인 개발 환경을 유지합니다.

---

## 🏛️ 하네스 엔지니어링 4대 필러 (Technical Pillars)

에이전트가 자율적으로 고품질의 코드를 생성하고 검증할 수 있도록 다음의 기술적 기반을 선제적으로 구축합니다.

1. **에이전트 가독성 (Agent Legibility)**:
   - 모든 인터페이스에 엄격한 **TypeScript 타입**을 적용하고, **모듈화된 아키텍처**를 통해 에이전트가 수정 범위와 부수 효과를 즉각 파악하게 합니다.
2. **자율적 검증 (Autonomous Evaluation)**:
   - **Unit/Integration Test** 및 **MSW**를 통한 API 모킹 하네스를 구축하여, 에이전트가 실제 서버 없이도 기능을 스스로 검증하게 합니다.
3. **벤치마킹 (Benchmarking)**:
   - **Storybook** 및 **Visual Regression** 도구를 활용하여 디자인 시스템(Common UI Spec) 준수 여부를 수치와 시각적 데이터로 측정합니다.
4. **자가 치유 피드백 루프 (Self-Healing Feedback Loops)**:
   - CI 단계에서 상세한 에러 리포트를 제공하고, 정적 분석 결과를 환류하여 에이전트가 스스로 오류를 수정하도록 보완합니다.

---

## 📈 하네스 성숙도 모델 (Harness Maturity Model)

모든 기능 구현 시 아래 단계 중 가능한 높은 수준의 하네스 구축을 지향합니다.

- **Stage 1 (Foundation)**: 스펙(Spec) 정의 및 기본 Mock 데이터 구축.
- **Stage 2 (Unit Validation)**: UI 컴포넌트 단위 테스트 및 Storybook 연동.
- **Stage 3 (Flow Validation)**: MSW 기반 API 모킹 및 Playwright/Cypress를 이용한 사용자 흐름 검증.
- **Stage 4 (Self-Correction)**: CI와 연동된 자동화된 평가 및 자가 치유 루프 구축.

---

## 🔄 6단계 개발 주기 (The 6-Stage Lifecycle)

### 1. 계획 (Planning)

- **Action**: 에이전트는 요구사항을 분석하고 반드시 **`specs/common-ui-spec.md`를 선행 확인**하여 디자인 일관성을 확보합니다.
- **Harness Task**: 구현할 기능에 적용할 **하네스 전략(성숙도 단계)**을 결정하고 `PLAN.md`에 `Implementation Plan`을 기술합니다.

### 2. 허가 (Approval)

- **Action**: 작성된 계획안을 사용자에게 브리핑하고 피드백을 수렴합니다.
- **Goal**: 설계의 타당성과 하네스 구축 계획에 대한 사용자의 승인("진행해")을 얻습니다.

### 3. 구현 (Implementation)

- **Action**: 수립된 계획에 따라 코드를 작성합니다.
- **Harness Task**: 기능 구현에 앞서 **하네스 인프라(Mock, Types, Test Skeleton)**를 우선적으로 구축하여 에이전트 중심의 개발 환경을 조성합니다.

### 4. 리뷰 및 테스트 (Review & Test)

- **Action**: 구현된 코드를 하네스를 통해 검증합니다.
- **Self-Correction**: 테스트 실패 시 터미널 로그와 린트 결과를 바탕으로 에이전트가 스스로 코드를 수정합니다.

### 5. 최종 확인 (Final Verification)

- **Action**: 사용자가 결과물을 직접 확인(`pnpm dev`)하고 최종 피드백을 제공합니다.
- **Approval Check**: 에이전트는 구현 완료 보고 후 사용자로부터 **"최종 승인(Final Approval)"** 혹은 커밋 지시를 확인해야만 다음 단계로 넘어갈 수 있습니다.
- **Goal**: 실제 사용자 관점에서의 심미성과 사용성을 최종 폴리싱하고, 완성도에 대한 상호 합의를 이룹니다.

### 6. 문서 업데이트 및 커밋 (Documentation & Commit)

기능 구현이 완벽히 끝나고 사용자의 최종 승인이 완료되면, 작업 마무리를 위해 다음의 과정을 순차적으로 수행합니다.

1. **`docs/history/CHG-YYMMDD-NN.md` 작성**:
   - **표준 템플릿 준수**: 작성 전 반드시 [.agents/templates/history-template.md](../templates/history-template.md)를 확인하고 이를 준수해야 합니다.
   - 해당 작업일(YYMMDD)과 당일 순번(NN)을 결합한 고유 번호(ID)를 매겨 관리합니다.
   - **필수 섹션**: 목적(Purpose), 과정 및 변경 사항(Process & Deviations), 결과(Result), **검증 및 지표(Verification & Metrics)**.
   - 특히 성능 개선 시 정량적 데이터(Before/After)와 기능 동작 증빙을 반드시 포함합니다.
2. **`CHANGELOG.md` 업데이트**: 최상단 테이블 인덱스에 고유 번호(ID), 분류 태그(`feat`, `fix`, `docs` 등), 작업명(링크)을 추가합니다.
3. **`PLAN.md` 갱신**: 수행한 작업을 완료(`[x]`) 처리하고, 다음 작업 단계와의 정합성을 맞춥니다.
4. **`specs/` 및 규칙 최신화**: 구현 과정에서 변경되거나 구체화된 세부 명세를 관련 문서에 반영합니다.
5. **커밋(Commit)**: 모든 문서와 코드가 동기화된 상태에서, 작업별로 항목을 나누어 논리적인 단위로 커밋을 수행합니다.
6. **워크스루 작성**: 전체 변경 사항을 요약한 `walkthrough.md`를 작성하여 보고합니다.

---

## 💡 실천 가이드

- 기능을 개발하기 전, **"이 기능이 올바르게 작동하는지 에이전트가 어떻게 스스로 증명할 것인가?"**를 항상 자문하십시오.
- 모든 `Implementation Plan`에는 반드시 해당 기능의 **검증 방법(Harness)**이 포함되어야 합니다.
