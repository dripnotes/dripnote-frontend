# Changelog

이 프로젝트는 토큰 소모 최적화 및 히스토리 정합성을 위해 **'인덱스(CHANGELOG) - 아카이브(docs/history)'** 이원화 구조를 사용합니다.

- **`CHANGELOG.md`**: 작업 고유 번호(ID), 분류 태그, 작업명(링크)이 포함된 테이블 기반 인덱스입니다.
- **`docs/history/CHG-YYMMDD-NN.md`**: 각 작업에 대한 목적, 상세 과정(및 변수), 최종 결과가 기록된 상세 문서입니다.
- 작업 이력을 작성할 때는 가장 마지막에 작업 이력을 테이블의 가장 위에 작성합니다.

---

## 📅 실시간 작업 이력 (Recent Changes)

| 고유 번호       | 분류   | 작업 명세 (Task)                                                                                     |
| :-------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| `CHG-260416-10` | `fix`  | [BeanSearchBar IME 입력 및 버튼 타입 개선](docs/history/CHG-260416-10.md)                            |
| `CHG-260416-09` | `fix`  | [필터 초기화(Reset) 시 로컬 상태 동기화 누락 수정](docs/history/CHG-260416-09.md)                    |
| `CHG-260416-08` | `feat` | [필터 칩(Chip) 컴포넌트 웹 접근성(aria-pressed) 개선](docs/history/CHG-260416-08.md)                 |
| `CHG-260416-07` | `feat` | [BeanFilterDrawer 접근성 개선 및 하단 버튼 레이아웃 리뉴얼](docs/history/CHG-260416-07.md)           |
| `CHG-260416-06` | `feat` | [원두 탐색 페이지 브랜드 로고 추가 및 카드 디자인 리뉴얼](docs/history/CHG-260416-06.md)             |
| `CHG-260416-05` | `feat` | [모바일 드로어 인터랙션 및 레이아웃 고도화 (드래그 핸들)](docs/history/CHG-260416-05.md)             |
| `CHG-260416-04` | `feat` | [원두 탐색 필터 지연 반영(Deferred) 및 엔터 검색 적용](docs/history/CHG-260416-04.md)                |
| `CHG-260416-03` | `feat` | [원두 페이지 UX 고도화 및 레이아웃 안정화 (Fade 애니메이션)](docs/history/CHG-260416-03.md)          |
| `CHG-260416-02` | `feat` | [레이아웃 아키텍처 개편 및 모바일 앱 뷰(Bottom Nav) 도입](docs/history/CHG-260416-02.md)             |
| `CHG-260416-01` | `feat` | [원두 탐색 검색창(BeanSearchBar) 통합 및 UI 구조 일원화](docs/history/CHG-260416-01.md)              |
| `CHG-260415-05` | `feat` | [원두 정보 페이지 UI 사용성 개선 (Rating Bar 및 레이아웃 최적화)](docs/history/CHG-260415-05.md)     |
| `CHG-260415-04` | `feat` | [원두 정보 페이지(/beans) 스펙 작성 및 구현](docs/history/CHG-260415-04.md)                          |
| `CHG-260415-03` | `fix`  | [로그인 페이지 복귀 링크 UX 개선](docs/history/CHG-260415-03.md)                                     |
| `CHG-260415-02` | `fix`  | [스펙-구현 정합성 반영 (13개 항목)](docs/history/CHG-260415-02.md)                                   |
| `CHG-260415-01` | `docs` | [에이전트 규칙 체계 통합 및 스펙 컴포넌트 단위 마이그레이션](docs/history/CHG-260415-01.md)          |
| `CHG-260413-01` | `fix`  | [플레이버 노트 이미지 정합성 수정 및 경로 최적화](docs/history/CHG-260413-01.md)                     |
| `CHG-260409-01` | `feat` | [플레이버 노트 탐색(Flavor Notes) UI 개편 및 이미지 카드 적용](docs/history/CHG-260409-01.md)        |
| `CHG-260408-11` | `fix`  | [최종 정밀 피드백 반영 및 코드 안정성 강화](docs/history/CHG-260408-11.md)                           |
| `CHG-260408-10` | `fix`  | [HeroSection Layout Shift 해결 및 Skeleton UI 도입](docs/history/CHG-260408-10.md)                   |
| `CHG-260408-09` | `fix`  | [Button variant active:scale 충돌 해결 및 스타일 명확화](docs/history/CHG-260408-09.md)              |
| `CHG-260408-08` | `feat` | [히어로 섹션 개인화 및 UI 최적화 (메인 페이지 전용 드래그 방지 포함)](docs/history/CHG-260408-08.md) |
| `CHG-260408-07` | `fix`  | [로그인 페이지 모바일 뷰 최적화 (스크롤 제거)](docs/history/CHG-260408-07.md)                        |
| `CHG-260408-06` | `feat` | [Button icon variant 추가 및 Header 리팩토링](docs/history/CHG-260408-06.md)                         |
| `CHG-260408-05` | `fix`  | [로그인 페이지 애니메이션 타이밍 최적화 (피드백 반영)](docs/history/CHG-260408-05.md)                |
| `CHG-260408-04` | `docs` | [개발 라이프사이클 7단계 확장 및 프로토콜 정교화](docs/history/CHG-260408-04.md)                     |
| `CHG-260408-03` | `docs` | [프로세스 규칙 개선 및 문서화 전략 강화](docs/history/CHG-260408-03.md)                              |
| `CHG-260408-02` | `docs` | [카피라이트 문구 통일 및 푸터 디자인 조정](docs/history/CHG-260408-02.md)                            |
| `CHG-260408-01` | `docs` | [문서 체계 및 하네스 전략 고도화](docs/history/CHG-260408-01.md)                                     |

---

## 🏛️ 이전 작업 이력 (Legacy / Initial Implementation)

- **[2026-04-07] 초기 메인 페이지 UI 및 공유 컴포넌트 구축**
  - `HeroSection`, `FlavorNotes`, `RecommendedBeans`, `RoasteryMapSection` 구현.
  - `react-kakao-maps-sdk` 도입 및 지형 라이브러리 교체(Naver -> Kakao).
  - 모노레포 환경 변수 로드 이슈 및 Unsplash 이미지 연동 이슈 해결.
