# Baristation (Coffee Service)

### Core Principles

- **Vibe Coding**: 구현 전 `Implementation Plan` 수립 및 승인 필수 (7단계 주기).
- **Harness Engineering**: 에이전트가 자율적으로 검증할 수 있는 환경(Mock, Test) 선제적 구축. 상세 전략은 [.agents/workflows/vibe-coding-cycle.md](.agents/workflows/vibe-coding-cycle.md) 참조.
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
