# Changelog

이 프로젝트는 토큰 소모 최적화 및 히스토리 정합성을 위해 **'인덱스(CHANGELOG) - 아카이브(docs/history)'** 이원화 구조를 사용합니다.

- **`CHANGELOG.md`**: 작업 고유 번호(ID), 분류 태그, 작업명(링크)이 포함된 테이블 기반 인덱스입니다.
- **`docs/history/CHG-YYMMDD-NN.md`**: 각 작업에 대한 목적, 상세 과정(및 변수), 최종 결과가 기록된 상세 문서입니다.

---

## 📅 실시간 작업 이력 (Recent Changes)

| 고유 번호       | 분류   | 작업 명세 (Task)                                                                      |
| :-------------- | :----- | :------------------------------------------------------------------------------------ |
| `CHG-260408-01` | `docs` | [문서 체계 및 하네스 전략 고도화](docs/history/CHG-260408-01.md)                      |
| `CHG-260408-02` | `docs` | [카피라이트 문구 통일 및 푸터 디자인 조정](docs/history/CHG-260408-02.md)             |
| `CHG-260408-03` | `docs` | [프로세스 규칙 개선 및 문서화 전략 강화](docs/history/CHG-260408-03.md)               |
| `CHG-260408-04` | `docs` | [개발 라이프사이클 7단계 확장 및 프로토콜 정교화](docs/history/CHG-260408-04.md)      |
| `CHG-260408-05` | `fix`  | [로그인 페이지 애니메이션 타이밍 최적화 (피드백 반영)](docs/history/CHG-260408-05.md) |

---

## 🏛️ 이전 작업 이력 (Legacy / Initial Implementation)

- **[2026-04-07] 초기 메인 페이지 UI 및 공유 컴포넌트 구축**
  - `HeroSection`, `FlavorNotes`, `RecommendedBeans`, `RoasteryMapSection` 구현.
  - `react-kakao-maps-sdk` 도입 및 지형 라이브러리 교체(Naver -> Kakao).
  - 모노레포 환경 변수 로드 이슈 및 Unsplash 이미지 연동 이슈 해결.
