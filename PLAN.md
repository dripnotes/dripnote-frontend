# Spec Reorganization Plan

`specs/` 디렉토리 내의 명세서들을 정리하여 현재 프로젝트 상태와 일치시키고 가독성을 높입니다.

## 1. 작업 개요

- **변경 사유(Context) 제거**: 명세서 도입부나 컴포넌트별로 기록된 변경 이력 섹션을 삭제합니다.
- **현재 구현 사항 반영**: `FlavorNotes` -> `AromaNotes`와 같이 실제 코드의 컴포넌트 명칭과 파일 구조를 반영합니다.
- **미반영/미결 사항 제거**: 아직 구현되지 않았거나 결정되지 않은 기획 내용을 삭제합니다.
- **중복 정리**: 여러 파일에 걸쳐 중복된 명세나 서술을 간소화합니다.

## 2. 대상 파일 및 수정 계획

### [common-ui-spec.md](file:///Users/ujaehyeon/project/dripnote-frontend/specs/common-ui-spec.md)

- 브랜드 아이덴티티 및 디자인 토큰 서술 간소화.
- 현재 구현된 공통 UI 패턴만 유지.

### [main-page.md](file:///Users/ujaehyeon/project/dripnote-frontend/specs/main-page.md)

- `FlavorNotes` 섹션을 실제 코드인 `AromaNotes`로 업데이트.
- `AromaCard` 컴포넌트 구조 반영.
- API 연동 명세에서 사용하지 않는 필드나 예시 정리.

### [beans-page.md](file:///Users/ujaehyeon/project/dripnote-frontend/specs/beans-page.md)

- 상단 "변경 사유" 섹션 삭제.
- 필터링 시스템 및 `BeanCard` 명세 최신화.

### [bean-detail-page.md](file:///Users/ujaehyeon/project/dripnote-frontend/specs/bean-detail-page.md)

- "변경 사유" 및 "미결 사항" 섹션 전면 삭제.
- 히어로 영역 및 정보 테이블 명세를 현재 구현 상태에 맞춰 조정.

### [login-page.md](file:///Users/ujaehyeon/project/dripnote-frontend/specs/login-page.md)

- 소셜 로그인 프로세스 중심의 명세로 슬림화.

## 3. 검증 계획

- 모든 명세서 파일에서 "변경 사유", "Context", "미결 사항" 키워드가 제거되었는지 확인.
- 명세서 내의 파일 경로와 컴포넌트명이 실제 소스 코드와 일치하는지 대조.
