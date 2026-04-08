---
name: setup-monorepo
description: >-
  이 프로젝트의 PNPM 모노레포 환경을 설정하고 패키지 간의 의존성을 관리하는 가이드입니다.
  모노레포 구조를 변경하거나 새로운 패키지를 추가할 때 사용하십시오.
license: MIT
metadata:
  author: coffee-service-team
  version: '1.0'
---

# 모노레포 설정 및 의존성 관리 (Setup Monorepo)

이 스킬은 프로젝트의 모노레포 구조를 일관성 있게 유지하고, `pnpm`의 워크스페이스 기능을 올바르게 활용하기 위한 지침을 제공합니다.

## 🤖 단계별 지침 (Instructions)

### 1단계: 패키지 매니저 확인

- 프로젝트 루트에서 작업 시 반드시 `pnpm`을 사용해야 합니다.
- `npm`이나 `yarn`을 사용하려고 하면 즉시 중단하고 `pnpm`으로 전환하십시오.

### 2단계: 패키지 간 연결 (Inter-package Linking)

- 내부 패키지(`@coffee-service/*`) 간의 의존성을 설정할 때는 반드시 `workspace:*` 프로토콜을 사용합니다.
  - 예: `apps/web`에서 `packages/ui-library`를 참조할 때 `package.json`에 `"@coffee-service/ui-library": "workspace:*"`를 명시합니다.

### 3단계: 의존성 설치 및 업데이트

- 공통 의존성은 루트의 `package.json`에서 관리하십시오.
- 특정 앱이나 패키지에 한정된 의존성을 설치할 때는 반드시 `--filter` 옵션을 사용하십시오.
  - 실행 예: `pnpm --filter @coffee-service/web add <package-name>`

### 4단계: 모노레포 구조 준수 확인

- 모든 공유 설정(ESLint, TypeScript 등)은 `packages/config-*` 하위에서 관리되고 있는지 확인하십시오.
- 새로운 공유 UI 컴포넌트가 추가될 경우 `packages/ui-library`에 위치시켜야 합니다.

## ⚠️ 주의 사항 (Cautions)

- 앱 레이어(`apps/`)의 코드가 다른 앱의 코드를 직접 임포트하지 않도록 하십시오. 반드시 공용 패키지(`packages/`)를 통해 공유해야 합니다.
- `pnpm-workspace.yaml` 파일의 설정을 임의로 변경하지 마십시오.
