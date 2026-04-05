# Changelog

이 문서는 Dripnote 서비스에서 추가되거나 변경된 주요 기능, 아키텍처 결정 사항(ADR), 그리고 버그 수정 내역을 연대기순으로 기록합니다.

---

## [Unreleased]

### Added (추가됨)

- **Main Page UI 구축**:
  - `HeroSection.tsx`: `embla-carousel-react`와 `framer-motion`을 결합한 동적 환영 메시지 및 슬라이더 구현.
  - `FlavorNotes.tsx`: 좌우 터치 스와이프 가능한 향미 태그 영역 구성. (Tailwind CSS v4 `bg-linear-to-*` 문법 적용)
  - `RecommendedBeans.tsx`: CSS Grid 기반으로 작성된 추천 원두 카드 및 Hover 인터랙션 추가.
  - `RoasteryMapSection.tsx`: `react-naver-maps`를 활용하여 Client ID 기반의 사용자 주변 로스터리 지도 렌더링.
  - Mock Data 적용: 현재 백엔드 API 부재로 인해 `lib/api/main.ts` 를 통해 더미 데이터를 Props로 하향 전달하는 레이아웃 뼈대 생성.
- **Shared Components**:
  - `Header.tsx`: Glassmorphism 형태의 스크롤 감지 헤더 (framer-motion 활용).
  - `Footer.tsx`: 기초적인 페이지 하단 구성.

### Fixed (수정됨)

- **Monorepo 환경변수 로드 이슈**: 터보팩 환경 및 Next.js 모노레포 구조 상 프로젝트 최상단(`.env.local`)이 아닌 각 앱 폴더(`apps/web/.env.local`) 내부의 환경변수를 바라보는 문제를 해결하여 정상적으로 API 키가 주입되도록 조치.
- **Next Image Unsplash 연동 이슈**: 클라우드 외부 이미지를 캐싱 및 렌더링하기 위해 `next.config.ts`의 `images.remotePatterns`에 `images.unsplash.com` 허용 도메인 추가.
- **Naver Map 비동기 로드 에러**: `react-naver-maps` 내부적으로 스크립트 비동기 다운로드를 처리함에도 불구하고, 렌더링 측에서 수동으로 `window.naver` 유무를 판별하는 로직이 렌더 블로킹과 버그를 유발하여 제거함. Map 라이브러리에 렌더 의존성을 위임하는 아키텍처 결정.
- **카카오맵으로 코어 매핑 엔진 교체**: 최원 네이버 지도로 구현했던 요소를 카카오 지도(`react-kakao-maps-sdk`)로 완전히 교체. ❗️(Reason: 네이버 지도의 기본 요금 유료화 전환에 따른 스타트업 단위의 초기 운영/유지비용 부담을 최소화하기 위함)
- **ESLint/TailwindCSS 린트 경고**: Tailwind CSS v4 기준의 `linear-to` 와 `shrink-0` 같은 클래스명 업데이트를 반영.

### Architecture / Technical Decisions (설계 결정)

- 패키지 의존성: UI의 미적 퀄리티(Premium feel)를 위해 기본 Next.js+Tailwind 구성 위에 기능성 라이브러리를 추가했습니다 (`framer-motion`, `embla-carousel-react`, `lucide-react`).
- 지도 라이브러리: 단순히 script 태그를 넣기보다 React 컴포넌트 생명주기와 통합하기 용이하도록 선언적 wrapper인 `react-naver-maps`를 채택.
