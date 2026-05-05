# 로그인 페이지 명세서 (Login Page) - Baristation

## 1. 페이지 개요

Baristation 서비스의 모든 기능을 이용하기 위한 진입점입니다. 2030 타겟의 편의성을 고려하여 번거로운 가입 절차를 배제하고 **소셜 로그인 전용** 시스템을 채택합니다.

**집중된 사용자 경험(Focused Experience)** 원칙에 따라, 로그인 페이지는 인증 이외의 다른 기능이나 내비게이션 요소와의 상호작용을 배제하고 오직 로그인에만 완전히 집중할 수 있도록 디자인합니다.

> - **2026-05-05 (리브랜딩)**: 서비스명을 "Dripnote"에서 "Baristation"으로 전면 리브랜딩함. 이에 따른 로고 및 텍스트 갱신.

---

## 2. 디자인 시스템 참조

모든 디자인 토큰(Color, Typography, Motion)은 [공통 UI 명세서(common-ui-spec.md)](common-ui-spec.md)를 엄격히 준수합니다.

**브랜드 무드: "Focused Laboratory"** — 공통 명세의 `Internal Coffee Lab` 컨셉 중 **집중(Focused)**과 **몰입(Immersion)**을 극대화한 변형 스타일을 적용합니다. 고해상도 이미지가 무드를 주도하며, 정보 노출을 최소화하여 인증 단계로의 몰입을 유도합니다.

---

## 3. 컴포넌트 명세 (Component Specs)

---

### LoginBackground

#### 1. Overview (맥락)

- **목적**: 로그인 페이지 전체를 감싸는 풀스크린 배경 이미지와 다크 오버레이. 화면의 80% 이상을 차지하며 브랜드 무드를 시각적으로 주도합니다.
- **위치**: `apps/web/app/login/_components/LoginBackground.tsx`
- **부모 컴포넌트**: `LoginPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/image`, Tailwind CSS v4, CSS `@keyframes` 또는 `framer-motion`
- **스타일링 규칙**: Tailwind CSS v4만 사용, 인라인 스타일 금지
- **기타 제약**: `object-cover` 풀스크린 유지 필수, `z-index` 최하단(`z-0`) 배치

#### 3. Data Interface (I/O)

**Props**:

```ts
interface LoginBackgroundProps {
  imageUrl: string; // 배경 이미지 URL
}
```

**State**: 없음

**Events / Callbacks**: 없음

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건      | UI 표현                                     |
| ----------- | ---------------- | ------------------------------------------- |
| **Default** | 이미지 로드 완료 | 풀스크린 이미지 + 다크 그라데이션 오버레이  |
| **Loading** | 이미지 로딩 중   | `Primary-Surface #1A1614` 단색 플레이스홀더 |

#### 5. Functional Requirements (단계별 요구사항)

1. 화면 전체(`100vw × 100vh`)를 덮는 풀스크린 컨테이너를 구성한다
2. 고감도 커피 이미지를 `object-cover`로 배경에 배치한다
3. 이미지 위에 `#1A1614` 기반 선형 그라데이션 오버레이를 적용하여 가독성과 브랜드 무드를 확보한다
4. Ken Burns 효과(20초 이상 주기, `scale: 1.0 → 1.1` 미세 확대)를 무한 반복하여 정적 배경에 생동감을 부여한다

> **변경 사유 (Context)**: 로그인 페이지 본연의 목적인 '인증'에 100% 집중할 수 있게 하여 전환율을 높이고, 정적인 이미지가 주는 지루함을 탈피하여 완성도 높은 프리미엄 디자인(Ken Burns Effect)을 강조하기 위함입니다.

#### 6. Design Spec (디자인 명세)

- **Layout**: `position: fixed`, `inset: 0`, `z-index: 0`
- **Animation** (Ken Burns):
  - 트리거: 컴포넌트 마운트 즉시
  - Keyframe: `scale(1.0) → scale(1.1)`
  - Duration: `20s` 이상
  - Easing: `linear`
  - Loop: `infinite`
- **Responsive**: 모든 해상도에서 `object-cover`로 전체 채움

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 이미지가 화면 전체(`100vw × 100vh`)를 `object-cover`로 채운다
- [ ] (기능) 다크 그라데이션 오버레이가 이미지 위에 렌더링된다
- [ ] (인터랙션) 마운트 직후부터 Ken Burns 효과(20초+ 주기 미세 확대)가 무한 반복된다
- [ ] (디자인) 오버레이 기반 색상이 `Primary-Surface #1A1614`이다
- [ ] (반응형) 모든 해상도에서 풀스크린 커버를 유지한다

---

### LoginHeader

#### 1. Overview (맥락)

- **목적**: 브랜드 로고("Baristation"), 페이지 슬로건("시작하기"), 메인 페이지 복귀 링크(`← Main`)를 포함하는 로그인 페이지의 상단 UI 영역
- **위치**: `apps/web/app/login/_components/LoginHeader.tsx`
- **부모 컴포넌트**: `LoginPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/link`, Tailwind CSS v4, Google Fonts (`Playfair Display`, `Outfit`)
- **스타일링 규칙**: Tailwind CSS v4만 사용
- **컴포넌트 규칙**: 일반 GNB 컴포넌트 사용 금지 (Focused Layout 원칙 — 사용자 이탈 방지)

#### 3. Data Interface (I/O)

**Props**: 없음 (정적 콘텐츠)

**State**: 없음

**Events / Callbacks**: 없음

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건 | UI 표현                                      |
| ----------- | ----------- | -------------------------------------------- |
| **Default** | 초기 렌더링 | 로고 + 슬로건 + `← Main` 복귀 링크 정상 노출 |

#### 5. Functional Requirements (단계별 요구사항)

1. 화면 상단 중앙에 **"Baristation"** 로고(`Playfair Display`, ExtraBold)를 표시한다
2. 로고 하단(`mb-3` 여백)에 **"시작하기"** 슬로건(`Outfit`, Light, Uppercase, `tracking-[0.2em]`)을 표시한다
3. 화면 좌측 상단에 메인 페이지(`/`)로 이동하는 **`← Main`** 복귀 링크를 배치한다
   - `ChevronLeft` 아이콘(lucide-react, 16px) + `"Main"` 텍스트를 `flex gap-1`로 수평 정렬한다
   - 테두리와 배경색을 배제한 미니멀 텍스트 전용 스타일을 유지한다
4. 복귀 링크는 페이지 로드 후 `0.2s` 딜레이로 즉시 등장하여 탈출구(escape hatch)로서의 가용성을 확보한다

> **변경 사유 (Context)**: 2026-04-15 사용자 피드백 반영. 기존 텍스트 전용 "main"(소문자)은 가독성이 낮고 1.2s 딜레이로 너무 늦게 렌더링되는 문제가 있었습니다. `ChevronLeft` 아이콘 추가로 직관적인 "뒤로 가기" 의미를 강화하고, 딜레이를 0.2s로 단축하여 사용자가 인증을 원하지 않을 때 즉시 탈출할 수 있도록 개선했습니다. 미니멀 스타일은 유지하여 Focused Layout 원칙(인증에 집중)을 훼손하지 않습니다.

#### 6. Design Spec (디자인 명세)

- **Layout**: 로고+슬로건은 화면 상단 중앙 배치, `← Main` 링크는 `position: fixed top-6 left-6` (lg: `top-14 left-14`)
- **Animation** (`framer-motion`):
  - 트리거: 컴포넌트 마운트
  - 효과: `x: -20 → 0`, `opacity: 0 → 1`
  - Delay: `0.2s`, Duration: `0.4s`, Easing: `easeOut`
- **Typography**:
  - 로고: `Playfair Display`, ExtraBold(800), White
  - 슬로건: `Outfit`, Light, `uppercase`, `tracking-[0.2em]`
  - back link: `Outfit`, `text-sm`, `tracking-widest`, White **65%** opacity / hover White **90%** opacity
- **Back Link Icon**: `ChevronLeft` (lucide-react, `h-4 w-4`), `flex items-center gap-1`
- **Responsive**: 중앙 정렬 유지, 모바일에서 폰트 크기 축소

#### 7. Definition of Done (검증 기준)

- [ ] (기능) "Baristation" 로고가 화면 상단 중앙에 `Playfair Display` ExtraBold로 렌더링된다
- [ ] (기능) "시작하기" 슬로건이 `Outfit` Light, Uppercase, `tracking-[0.2em]`으로 표시된다
- [ ] (기능) `← Main` 링크 클릭 시 `/`로 이동한다
- [ ] (디자인) `ChevronLeft` 아이콘 + "Main" 텍스트가 `flex gap-1`로 수평 정렬된다
- [ ] (디자인) back link 투명도가 기본 65%, hover 시 90%로 전환된다
- [ ] (인터랙션) 페이지 로드 후 `0.2s` 딜레이로 `x:-20→0` 슬라이드인 애니메이션이 실행된다
- [ ] (디자인) 로고와 슬로건 사이에 `mb-3` 여백이 존재한다

---

### SocialLoginSection

#### 1. Overview (맥락)

- **목적**: Google, Naver, Kakao 3개의 소셜 로그인 버튼을 묶어 수직으로 나열하는 컨테이너 컴포넌트
- **위치**: `apps/web/app/login/_components/SocialLoginSection.tsx`
- **부모 컴포넌트**: `LoginPage`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: Tailwind CSS v4
- **스타일링 규칙**: 소셜 플랫폼별 색상은 `:root` CSS 변수로 정의 후 Tailwind utility class와 연동 (하드코딩 금지)

#### 3. Data Interface (I/O)

**Props**: 없음 (내부에서 3개의 `SocialButton` 렌더링)

**State**: 없음

**Events / Callbacks**: 없음

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건 | UI 표현                   |
| ----------- | ----------- | ------------------------- |
| **Default** | 초기 렌더링 | 3개의 소셜 버튼 수직 나열 |

#### 5. Functional Requirements (단계별 요구사항)

1. Google → Naver → Kakao 순서로 `SocialButton`을 수직 나열한다
2. 각 버튼 간 일관된 간격(`gap-3`)을 유지한다
3. 전체 너비(`w-full`)로 버튼 그룹을 배치한다

#### 6. Design Spec (디자인 명세)

- **Layout**: `flex flex-col`, `gap-3`, `w-full`
- **Animation**: 없음 (버튼 개별 애니메이션은 `SocialButton`에서 처리)
- **Responsive**: 모든 해상도에서 수직 스택 레이아웃 유지

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 3개의 소셜 버튼(Google, Naver, Kakao)이 지정 순서로 수직 나열된다
- [ ] (디자인) 버튼 간 일관된 간격이 적용된다
- [ ] (디자인) 컨테이너가 전체 너비를 사용한다

---

### SocialButton

#### 1. Overview (맥락)

- **목적**: 소셜 플랫폼별 공식 브랜드 가이드라인을 준수한 OAuth 로그인 트리거 버튼 (Google / Naver / Kakao)
- **위치**: `apps/web/app/login/_components/SocialButton.tsx`
- **부모 컴포넌트**: `SocialLoginSection`

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: Tailwind CSS v4, `framer-motion`
- **스타일링 규칙**: 소셜 색상은 반드시 `:root` CSS 변수 → Tailwind utility class 연동 (`bg-google`, `text-kakao-foreground` 등), 하드코딩 금지
- **브랜드 준수**:
  - [Google 브랜드 가이드라인](https://developers.google.com/identity/branding-guidelines?hl=ko)
  - [Naver 로그인 BI 가이드](https://developers.naver.com/docs/login/bi/bi.md)
  - [Kakao 디자인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide) — 텍스트 컬러: `rgba(0, 0, 0, 0.85)` 정확도 준수

> **변경 사유 (Context)**: 각 플랫폼의 공식 검수 통과 및 브랜드 아이덴티티 규칙을 보호하면서도, CSS 변수 맵핑 방식을 도입하여 코드의 단일 진실 공급원(SSOT)을 확보했습니다.

#### 3. Data Interface (I/O)

**Props**:

```ts
type SocialProvider = 'google' | 'naver' | 'kakao';

interface SocialButtonProps {
  provider: SocialProvider;
}
```

**State**:
| 상태명 | 타입 | 초기값 | 설명 |
|--------|------|--------|------|
| `isLoading` | `boolean` | `false` | OAuth 리다이렉트 트리거 후 로딩 상태 |

**Events / Callbacks**: 없음 (클릭 시 외부 OAuth URL로 직접 리다이렉트)

#### 4. UI States (상태 명세)

| 상태         | 트리거 조건             | UI 표현                                    |
| ------------ | ----------------------- | ------------------------------------------ |
| **Default**  | 초기 렌더링             | 플랫폼 브랜드 색상 + 로고 + 텍스트         |
| **Hover**    | 마우스 오버             | `translateY(-2px)` + `shadow-md` 부유 효과 |
| **Loading**  | 클릭 후 리다이렉트 대기 | 스피너 또는 버튼 텍스트 변경               |
| **Disabled** | `isLoading === true`    | 클릭 비활성화, 시각적 opacity 처리         |

#### 5. Functional Requirements (단계별 요구사항)

1. `provider` prop에 따라 해당 OAuth2 Authorization 경로로 서버 사이드 리다이렉트를 수행한다
   - Google: `http://localhost:8080/oauth2/authorization/google`
   - Naver: `http://localhost:8080/oauth2/authorization/naver`
   - Kakao: `http://localhost:8080/oauth2/authorization/kakao`
2. 각 플랫폼의 공식 브랜드 가이드라인에 따른 아이콘, 레이블, 색상을 렌더링한다
3. 클릭 시 `isLoading`을 `true`로 전환하여 중복 클릭을 방지한다
4. 호버 시 버튼이 위로 부드럽게 떠오르며(`-translate-y-0.5`) 그림자가 강조된다(`shadow-sm → shadow-md`)

#### 6. Design Spec (디자인 명세)

- **Layout**: `height: 52px` 이상, `width: 100%`, 내부 아이콘+텍스트 중앙 또는 좌측 정렬
- **Animation** (`framer-motion`):
  - 트리거: 마우스 호버
  - 효과: `y: 0 → -2`, `boxShadow: shadow-sm → shadow-md`
  - Duration: `200ms`
  - Easing: `linear`
- **Responsive**: 모든 해상도에서 `w-full` 및 `height: 52px+` 유지

#### 7. Definition of Done (검증 기준)

- [ ] (기능) 버튼 클릭 시 해당 플랫폼의 OAuth2 경로로 리다이렉트된다
- [ ] (기능) 클릭 후 `isLoading` 상태가 활성화되어 중복 클릭이 방지된다
- [ ] (디자인) 각 플랫폼의 공식 브랜드 색상과 아이콘이 가이드라인에 맞게 적용된다
- [ ] (디자인) Kakao 버튼 텍스트 색상이 `rgba(0, 0, 0, 0.85)`이다
- [ ] (인터랙션) 호버 시 `translateY(-2px)` + `shadow-md` 효과가 `200ms linear`로 동작한다
- [ ] (반응형) 모든 해상도에서 버튼 높이 52px 이상, 전체 너비를 유지한다

---

### LoginCallbackPage

#### 1. Overview (맥락)

- **목적**: OAuth 인증 성공 후 서버로부터 전달받은 JWT를 URL 쿼리 파라미터에서 추출하여 `localStorage`에 저장하고, 메인 페이지로 자동 라우팅하는 콜백 처리 페이지
- **위치**: `apps/web/app/login/callback/page.tsx`
- **부모 컴포넌트**: N/A (독립 Next.js Route)

#### 2. Tech Stack & Constraints (기술 및 제약)

- **주요 도구**: `next/navigation` (`useSearchParams`, `useRouter`), `authUtils`
- **기타 제약**: Client Component 필수 (`useSearchParams` 사용), 토큰 처리 완료 즉시 리다이렉트

#### 3. Data Interface (I/O)

**Props** (URL Query Params):

```ts
// URL: /login/callback?token={JWT}
interface CallbackSearchParams {
  token: string; // 서버로부터 전달받은 JWT
}
```

**State**:
| 상태명 | 타입 | 초기값 | 설명 |
|--------|------|--------|------|
| `isProcessing` | `boolean` | `true` | 토큰 처리 및 리다이렉트 진행 여부 |

**Events / Callbacks**: 없음

#### 4. UI States (상태 명세)

| 상태        | 트리거 조건                              | UI 표현                               |
| ----------- | ---------------------------------------- | ------------------------------------- |
| **Loading** | 컴포넌트 마운트 직후                     | 로딩 스피너 또는 빈 화면 (순간적)     |
| **Error**   | `token` 파라미터 없음 또는 유효하지 않음 | 에러 메시지 + 로그인 페이지 이동 링크 |

#### 5. Functional Requirements (단계별 요구사항)

1. `useSearchParams`로 URL 쿼리의 `token` 파라미터를 추출한다
2. `authUtils`를 사용하여 추출된 JWT를 `localStorage`에 안전하게 저장한다
3. 저장 완료 후 `useRouter`로 메인 페이지(`/`)로 자동 라우팅한다
4. `token` 파라미터가 없거나 유효하지 않으면 에러 상태를 노출하고 로그인 페이지(`/login`)로 유도한다

#### 6. Design Spec (디자인 명세)

- **Layout**: 화면 중앙 로딩 인디케이터 (처리 시간이 짧으므로 최소 UI)
- **Animation**: 없음
- **Responsive**: N/A

#### 7. Definition of Done (검증 기준)

- [ ] (기능) URL의 `token` 파라미터가 `localStorage`에 정상 저장된다
- [ ] (기능) 저장 완료 후 자동으로 `/`로 라우팅된다
- [ ] (상태) `token`이 없을 경우 에러 메시지를 노출하고 로그인 페이지로 안내한다
- [ ] (기능) 메인 페이지 GNB가 저장된 토큰을 감지하여 인증 아이콘을 동적으로 전환한다

---

## 4. 아키텍처 요약

```
LoginPage (app/login/page.tsx)
  ├── LoginBackground
  ├── LoginHeader
  └── SocialLoginSection
        ├── SocialButton (Google)
        ├── SocialButton (Naver)
        └── SocialButton (Kakao)

LoginCallbackPage (app/login/callback/page.tsx) ← 독립 Route
```

---

## 5. 핵심 동작 요구사항

- **소셜 전용 로그인**: 자체 가입 폼 없이 소셜 계정으로만 인증 처리
- **빠른 응답성**: 버튼 클릭 시 선형(Linear) 속도감으로 인증 단계 진입
- **인증 토큰 관리**: JWT를 `localStorage`에 저장 후 메인 페이지로 라우팅

---

## 6. API 연동 명세

### 6.1 소셜 로그인 엔드포인트 (Authorization)

사용자가 각 소셜 버튼을 클릭할 시 다음 경로로 **서버 사이드 리다이렉트**를 시도합니다.

| 소셜 플랫폼 | OAuth2 Authorization Path (Server)                  |
| :---------- | :-------------------------------------------------- |
| **Google**  | `http://localhost:8080/oauth2/authorization/google` |
| **Naver**   | `http://localhost:8080/oauth2/authorization/naver`  |
| **Kakao**   | `http://localhost:8080/oauth2/authorization/kakao`  |

### 6.2 인증 성공 후 콜백 (Response URL)

소셜 인증이 성공하면 서버는 프론트엔드로 다음과 같이 리다이렉트합니다.

- **Redirect URL**: `http://localhost:3000/login/callback?token={JWT}`
- **처리 순서**:
  1. `LoginCallbackPage`에서 `token` 쿼리 파라미터 추출
  2. `authUtils`로 JWT를 `localStorage`에 저장
  3. 메인 페이지(`/`)로 자동 라우팅
  4. GNB가 저장된 토큰을 감지하여 인증 아이콘을 동적으로 전환
