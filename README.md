# Dripnote (Coffee Service)

> [!IMPORTANT]
>
> ### 🤖 Agent Instructions (MUST READ BEFORE STARTING)
>
> 이 프로젝트의 AI 에이전트는 새로운 세션을 시작할 때마다 반드시 다음 절차를 수행해야 합니다.
>
> 1. **규칙 확인**: `.agents/rules/` 디렉토리의 모든 가이드를 정독하십시오. (특히 `global.md`의 Rule 13, 14, 21 및 `skill-guidelines.md` 필독)
> 2. **워크플로우 준수**: 모든 작업은 `.agents/workflows/vibe-coding-cycle.md`의 6단계 주기를 따릅니다.
> 3. **계획 우선**: 코드를 수정하기 전, 반드시 프로젝트 루트의 `PLAN.md`를 확인하고 현재 태스크를 업데이트하십시오.
> 4. **에이전트 스킬**: 새로운 스킬을 작성할 때는 `.agents/rules/skill-guidelines.md`의 표준 사양을 반드시 준수하십시오.
> 5. **명령어 규정**: 패키지 제어 시 반드시 `pnpm --filter @coffee-service/web <command>` 구조를 사용하십시오.

---

# Next.js Boilerplate

This is a Next.js boilerplate designed to help you quickly start developing web applications based on a modern tech stack.

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
