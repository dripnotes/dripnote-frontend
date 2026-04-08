# Dripnote (Coffee Service)

### AI & Methodology

이 프로젝트는 AI 에이전트와 효과적으로 협업하고 코드 품질을 유지하기 위해 다음의 지침과 방법론을 준수합니다.

#### 🤖 Quick Start for AI Agents

- **컨텍스트 파악**: 새로운 세션을 시작할 때마다 반드시 `.agents/rules/`의 전역 규칙과 프로젝트 루트의 `PLAN.md`를 먼저 확인하십시오.
- **워크플로우 준수**: 모든 개발 작업은 `.agents/workflows/vibe-coding-cycle.md`의 6단계 주기를 따릅니다.
- **보고 규칙**: 세션 시작 시 규칙 숙지가 완료되었다면 사용자에게 간략히 보고한 후 작업을 시작하십시오.

#### 💡 Core Development Principles

- **Vibe Coding**: 기능을 구현하기 전 반드시 `Implementation Plan`을 수립하고 사용자의 승인을 거치는 사이클을 유지합니다.
- **Harness Engineering**: 에이전트가 자율적으로 코드를 실행, 테스트, 검증하고 스스로 오류를 수정할 수 있는 환경을 설계하고 구축합니다. 상세 전략은 `[.agents/rules/harness-strategy.md]`를 참조하십시오. (Rule 22)
- **Spec-driven Development**: 모든 개발의 기준은 `specs/` 하위의 명세서(특히 `common-ui-spec.md`)입니다. (Rule 23)

### Features

- **Next.js 15+** with App Router
- **React 19+** for modern component-based architecture
- **TypeScript** for strict type safety
- **Tailwind CSS 4.0** with **`prettier-plugin-tailwindcss`** for auto-sorting
- **Styling Utilities**: **`tailwind-merge`** & **`clsx`** (`cn` helper) for cleaner class management
- **State Management**: **Zustand** for lightweight global state
- **Data Fetching**: **TanStack Query (React Query)** with basic caching and fetching setup
- **Validation**: **Zod** paired with **React Hook Form** and **Hook Form Resolvers** for strict form safety
- **UI Components**: **Lucide React** icons and **CVA** for stylized variants
- **Automated Quality Control**: **Husky** & **lint-staged** (ESLint & Prettier run automatically on commit)
- **Advanced Linting**: **`eslint-plugin-unused-imports`** for automatic cleanup
- **Absolute Imports**: Using the `@/*` path alias

### Getting Started

#### 1. Project Initialization

This boilerplate includes a smart setup script to get you started in seconds.

```bash
# 1. Clone the repository
git clone https://github.com/Woolegend/Next-js-Boilerplate.git new-next-app
cd new-next-app

# 2. Run the setup script (pnpm recommended)
pnpm run setup
```

The `setup` command automatically performs the following:

- **Environment Check**: Validates Node, Next, and React versions.
- **Git Automation**: Resets history, creates an `initial boilerplate` commit, performs setup, and then creates a `setup project` commit to record the final clean state.
- **Dependency Install**: Installs all packages using your detected package manager (`pnpm` or `npm`).
- **Self-Cleanup**: Removes the setup script from `package.json`, deletes `.env.example`, and stages the deletion of the `setup.sh` file itself.

### Recommended VS Code Extensions

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
  - _Note: Already configured in `.vscode/settings.json` to support `cn` and `cva`._

### Available Scripts

- `pnpm dev`: Runs the application in development mode.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Checks for code style issues.
- `pnpm lint:fix`: Automatically fixes ESLint and formatting issues.
- `pnpm format`: Formats all files using Prettier.
- `pnpm setup`: **(Run once)** Initial automation to prepare your project.

### License

This project is licensed under the MIT License.
