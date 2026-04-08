# 하네스 엔지니어링 전략 (Harness Engineering Strategy)

이 문서는 OpenAI의 'Harness Engineering' 철학을 프로젝트에 적용하여, 에이전트가 자율적으로 고품질의 기능을 개발하고 검증할 수 있는 환경을 구축하기 위한 가이드라인입니다.

## 1. 핵심 철학: 에이전트 우선 (Agent-first)

엔지니어(사용자 또는 선임 에이전트)의 역할은 단순히 코드를 작성하는 것에서, 후임 에이전트가 스스로 성장하고 검증하며 작업을 완수할 수 있는 **'하네스(Harness)'** 환경을 설계하는 것으로 전환됩니다.

## 2. 4대 핵심 필러 (The Four Pillars)

### 1) 에이전트 가독성 (Agent Legibility)

에이전트가 코드의 의도를 명확히 파악하고 수정 범위를 즉각 알 수 있게 합니다.

- **Strict Typing**: 모든 인터페이스와 상태에 TypeScript 타입을 엄격히 적용합니다.
- **Modular Architecture**: 관심사 분리를 통해 에이전트가 특정 기능 수정 시 발생할 수 있는 부수 효과(Side Effect)를 미리 인지하게 합니다.

### 2) 자율적 검증 (Autonomous Evaluation)

에이전트가 작성한 코드가 사양과 부합하는지 스스로 확인할 수 있는 도구를 제공합니다.

- **Unit & Integration Tests**: 비즈니스 로직에 대한 자동화된 테스트를 구축합니다 (Vitest 등).
- **API Mocking (MSW)**: 실제 서버 없이도 다양한 네트워크 시나리오를 시뮬레이션할 수 있는 하네스를 제공합니다.

### 3) 벤치마킹 (Benchmarking)

디자인 및 성능 지표가 기준(Spec)을 충족하는지 수치로 측정합니다.

- **Visual Regression**: 디자인 시스템 위반 여부를 픽셀 단위로 체크합니다 (Playwright, Storybook 등).
- **Performance Budgets**: Lighthouse 점수 등을 벤치마크로 설정하여 성능 저하를 방지합니다.

### 4) 자가 치유 피드백 루프 (Self-Healing Feedback Loops)

오류 발생 시 에이전트가 스스로 원인을 파악하고 수정할 수 있는 신호를 강화합니다.

- **Detailed Error Reporting**: CI 실패 시 에이전트가 읽기 쉬운 명확한 스택 트레이스와 컨텍스트를 제공합니다.
- **Automated PR Review**: 정적 분석 결과와 테스트 리포트를 에이전트에게 환류하여 스스로 보완하게 합니다.

## 3. 하네스 도달 단계 (Harness Maturity Model)

에이전트는 모든 기능 구현 시 아래 단계 중 가능한 높은 단계의 하네스를 구축해야 합니다.

- **Stage 1 (Foundation)**: 스펙(Spec) 정의 및 기본 Mock 데이터 구축.
- **Stage 2 (Unit Validation)**: UI 컴포넌트 단위 테스트 및 Storybook 연동.
- **Stage 3 (Flow Validation)**: MSW 기반 API 모킹 및 Playwright를 이용한 핵심 사용자 흐름(Happy Path) 검증.
- **Stage 4 (Self-Correction)**: CI와 연동된 자동화된 평가 및 자가 치유 루프 구축.

## 4. 실천 가이드

- 기능을 개발하기 전, **"이 기능이 올바르게 작동하는지 에이전트가 어떻게 스스로 증명할 것인가?"**를 먼저 고민하십시오.
- `Implementation Plan` 단계에서 해당 기능에 적용할 하네스 전략을 반드시 포함하십시오.
