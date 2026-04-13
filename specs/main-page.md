# 메인 페이지 명세서 (Main Page / Landing)

## 1. 페이지 개요

Dripnote 서비스의 메인 진입점(Landing Page)이자 메인 페이지(Main Page) 역할을 동시에 수행합니다. 사용자에게 직관적이고 시각적인 커피 경험을 제안하고, 추천 원두와 로스터리 위치 등 핵심 서비스로 빠르게 유도합니다.

## 2. 디자인 시스템 및 원칙 (Design System)

메인 페이지의 모든 디자인 토큰(Color, Typography, Motion)과 브랜드 아이덴티티 원칙은 [공통 UI 명세서(common-ui-spec.md)](common-ui-spec.md)를 기반으로 합니다.

### 2.1 메인 무드: "Visual-First Landing"

- **Visual Strategy**: 공통 명세의 `Internal Coffee Lab` 무드를 적극 활용하여, 텍스트 설명 대신 고해상도 이미지와 공백(White Space)을 통해 브랜드 가치를 전달합니다. (상세 설명은 최대 한 문장 이내로 제한)

## 3. 주요 구성 요소 (UI/UX)

### 2.1 글로벌 네비게이션 (GNB)

- **로고**: 좌측 상단 Dripnote 로고
- **메뉴**: Home, Bean Info(원두 정보 페이지 라우팅), Classes
- **유저 액션 및 인증 연동**:
  - **북마크(저장) 아이콘**: 저장된 원두 및 클래스 목록 보기
  - **인증 가변 아이콘**:
    - `미인증 상태`: 유저(`User`) 아이콘 노출 (로그인 페이지로 이동)
    - `인증 완료 상태`: 로그아웃(`LogOut`) 아이콘 노출 (클릭 시 `authUtils.removeToken` 수행 및 세션 종료)

### 2.2 메인 배경 캐러셀 & 히어로 섹션 (Hero Overlay)

- **메인 백그라운드 캐러셀**: GNB 바로 아래에 대형 이미지 슬라이더(캐러셀)가 위치합니다.
- **히어로 텍스트 (오버레이)**: 캐러셀 위로 사용자에게 인사말을 겹쳐서(Overlay) 표시합니다.
  - **개인화 인사말**: "안녕하세요, [사용자/지역]님. 오늘은 어떤 한 잔을 내려볼까요?"
  - **Call To Action (CTA) 버튼**:
    - `원두 탐색`: 원두 추천 서비스로 이동
    - `근처 클래스`: 바리스타/로스터리 클래스 정보로 이동

### 2.3 플레이버 노트 탐색 (Flavor Notes)

- **변경 사유 (Context)**:
  - 기존 텍스트 위주 인터페이스에서 이미지 중심의 시각적 탐색(Visual Exploration) 방식으로 전환하여 사용자의 몰입감과 직관성을 높임.
  - 2026-04-13: 사용자가 제공한 정확한 Unsplash 원본 이미지 링크로 전면 교체하여 시각적 정합성을 확보함. 일부 항목명을 브랜드 선호도에 맞춰 변경(밀크 초콜릿 -> 아몬드, 포도 -> 자몽). 또한 '캐러멜'과 '스모키' 항목을 추가하여 총 8종의 향미를 제공하며, 레이아웃을 데스크톱 4열, 태블릿 3열, 모바일 2열로 최적화함.
- **컴포넌트 구조**: 정사각형 이미지 기반 가로 카드 리스트.
  - **카드 스타일**:
    - **Aspect Ratio**: 1:1 (Square)
    - **Border Radius**: `rounded-xl` (약 12px) - 부드러운 인상을 위해 약간의 라운드 적용.
    - **Background**: 각 향미를 상징하는 고감도 이미지를 `object-cover`로 배치.
    - **Container**: `overflow-hidden` 처리를 통해 내부 이미지가 확대되어도 카드 전체 사이즈가 유지되도록 설정.
  - **인터랙션 (Framer Motion)**:
    - **Hover Effect**: 카드 마우스 호버 시 내부 이미지만 `scale: 1.1`로 부드럽게 확대됨. (Duration: 0.3s, Easing: `easeOut`)
    - **Tap/Click**: 클릭 시 해당 향미 카테고리(`tasting_link`)로 라우팅.
  - **텍스트 레이어**:
    - **Position**: 카드 좌측 최하단에 위치.
    - **Style**: 가독성을 위해 하단에 `linear-gradient` (Transparent to Black/40%) 스크림 오버레이를 배경으로 깔고, `Brand-Cream` 색상 혹은 화이트 텍스트 적용.
    - **Typography**: `Outfit` (Label Style), Bold.

### 2.4 오늘의 추천 원두 (Recommended Beans)

- API(`beans`)로 제공받은 큐레이션 추천 원두 리스트를 카드 형태로 배열.
- **카드 정보**:
  - 원두 썸네일 이미지 (`bean_image_link`)
  - 원두 이름 (`bean_name`)
  - 향미 노트 (`bean_tasting` 배열 항목들 표기)
  - 이동 경로 (`bean_link`)

### 2.5 주변 로스터리 (Location-based Roastery)

- 현재 사용자의 위치 기반으로 주변의 로스터리 카페 위치정보를 제공하는 섹션.
- 지도 뷰 (우측): **카카오 지도(Kakao Maps)** API를 사용하여 지도 화면 및 카페들의 위치 마커를 렌더링. (현재 Client 컴포넌트 내에서 SDK인 `react-kakao-maps-sdk`의 `useKakaoLoader` 훅을 활용해 렌더링 중)

### 2.6 푸터 (Footer)

- 초기 단계이므로 복잡한 요소는 제외하고 기초적인 카피라이트 텍스트 정도만 **간단하게 구현**합니다.

### 2.7 추가 기능 및 라이브러리 (Enhanced UI)

- **애니메이션 및 전환 효과**: `framer-motion`을 사용하여 페이지 스크롤 및 요소 등장 시 동적인 느낌 제공.
- **캐러셀**: `embla-carousel-react`를 사용하여 터치 친화적이고 매끄러운 스와이프 경험 제공.
- **지도 최적화**: `react-kakao-maps-sdk` 컴포넌트를 사용하여 카카오 지도 렌더링 선언적 구성 및 최적화. (네이버 지도 API의 기본 유료화 정책으로 인해 초기 비용 통제가 필요하여 무료 사용량이 넉넉한 카카오 지도로 교체함)
- **상단 GNB 이펙트**: 최상단에서는 투명한 배경을 유지하다가, 페이지 스크롤 시 반투명/배경색이 나타나는 방식 채택.

## 4. 아키텍처 및 컴포넌트 계층 (Architecture)

### 4.1 컴포넌트 트리

메인 페이지(`app/page.tsx`) 내부는 다음 계층으로 구성됩니다:

- `RootLayout` (전역, Header/Footer 포함)
  - `page.tsx` (메인 엔트리)
    - `HeroSection` (Client Component - 캐러셀 및 모션)
    - `FlavorNotes` (Client Component - 향미 태그)
    - `RecommendedBeans` (Client Component - 추천 원두)
    - RoasteryMapSection (useKakaoLoader를 이용한 비동기 스크립트 렌더링)

### 4.2 데이터 흐름 (Data Flow)

현재는 서버사이드 렌더링 혹은 백엔드 API 연동 이전 단계이므로 로컬의 `mockMainData`(`apps/web/lib/api/main.ts`)를 조회하여 하위 컴포넌트에 Props로 주입합니다.

---

## 5. 핵심 동작 요구사항

- **SPA 라우팅 연동**: 로그인 페이지, 원두 정보 페이지 등 내부 라우팅 요소 완비.
- 지도 라이브러리 연동: 카카오 지도(Kakao Maps) 기능 최적화.

---

## 6. API 연동 명세

### 상황

> 메인페이지 로딩

### Request Header

| key           | value    |
| ------------- | -------- |
| Authorization | Bearer ~ |

### Request Body

| Name | Type | Description | null 여부 | 형식 |
| ---- | ---- | ----------- | --------- | ---- |
|      |      |             |           |      |

### Response Header

```bash
// 성공
HTTP/1.1 200 OK

// 실패
HTTP/1.1 400

1. 토큰 승인 실패
```

| key          | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Response Body

| Name         | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                   | null 여부 | 형식 |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| - statusCode | String | 커스텀한 응답 코드                                                                                                                                                                                                                                                                                                                                                                            | x         |      |
| - message    | String | 성공 : 빈 문자열<br>실패 : 실패한 이유                                                                                                                                                                                                                                                                                                                                                        | x         |      |
| - data       | Object | `tastings` (array) : 향미 목록<br>`tasting_name` (string) : 향미 이름<br>`tasting_image_link` (string) : 향미 배경 이미지 URL<br>`tasting_link` (string) : 향미 정렬 링크<br>`beans` (array) : 추천 원두 목록<br>`bean_name` (string) : 추천 원두 이름<br>`bean_image_link` (string) : 추천 원두 썸네일 이미지<br>`bean_tasting` (array) : 원두 향미 목록<br>`bean_link` (string) : 원두 링크 | x         |      |

### Success JSON

```json
{
  "statusCode": "200",
  "message": "OK",
  "data": {
    // 향미노트
    "tastings": [
      {
        "tasting_name": "카카오",
        "tasting_image_link": "https://example.com/images/cacao.jpg",
        "tasting_link": "/api/beans?tastingId=1"
      },
      {
        "tasting_name": "복숭아",
        "tasting_image_link": "https://example.com/images/peach.jpg",
        "tasting_link": "/api/beans?tastingId=2"
      }
    ],
    // 추천 원두
    "beans": [
      {
        "bean_name": "콜롬비아 엘 파라이소",
        "bean_tasting": ["리치", "요거트", "복숭아"],
        "bean_image_link": "이미지 링크",
        "bean_link": "/beans/detail/12"
      },
      {
        "bean_name": "케냐 AA 타투 N",
        "bean_tasting": ["자몽", "블랙커런트", "와이니"],
        "bean_image_link": "이미지 링크",
        "bean_link": "/beans/detail/11"
      }
    ]
  }
}
```
