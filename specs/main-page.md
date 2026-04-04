# 메인 페이지 명세서 (Main Page / Landing)

## 1. 페이지 개요

Dripnote 서비스의 메인 진입점(Landing Page)이자 메인 페이지(Main Page) 역할을 동시에 수행합니다. 사용자에게 직관적이고 시각적인 커피 경험을 제안하고, 추천 원두와 로스터리 위치 등 핵심 서비스로 빠르게 유도합니다.

## 2. 주요 구성 요소 (UI/UX)

### 2.1 글로벌 네비게이션 (GNB)

- **로고**: 좌측 상단 Dripnote 로고
- **메뉴**: Home, Bean Info(원두 정보 페이지 라우팅), Classes
- **유저 액션**: 북마크(저장) 아이콘, 마이페이지/로그인 아이콘 (로그인 페이지 이동 기능)

### 2.2 메인 배경 캐러셀 & 히어로 섹션 (Hero Overlay)

- **메인 백그라운드 캐러셀**: GNB 바로 아래에 대형 이미지 슬라이더(캐러셀)가 위치합니다.
- **히어로 텍스트 (오버레이)**: 캐러셀 위로 사용자에게 인사말을 겹쳐서(Overlay) 표시합니다.
  - **개인화 인사말**: "안녕하세요, [사용자/지역]님. 오늘은 어떤 한 잔을 내려볼까요?"
  - **Call To Action (CTA) 버튼**:
    - `원두 탐색`: 원두 추천 서비스로 이동
    - `근처 클래스`: 바리스타/로스터리 클래스 정보로 이동

### 2.3 플레이버 노트 탐색 (Flavor Notes)

- 커피의 주된 향미(Tasting Notes)를 직관적으로 선택할 수 있는 가로형 리스트. (API `tastings` 데이터 연동)
- 각 향미 터치 시 `tasting_link`로 연결된 라우팅 처리.

### 2.4 오늘의 추천 원두 (Recommended Beans)

- API(`beans`)로 제공받은 큐레이션 추천 원두 리스트를 카드 형태로 배열.
- **카드 정보**:
  - 원두 썸네일 이미지 (`bean_image_link`)
  - 원두 이름 (`bean_name`)
  - 향미 노트 (`bean_tasting` 배열 항목들 표기)
  - 이동 경로 (`bean_link`)

### 2.5 주변 로스터리 (Location-based Roastery)

- 현재 사용자의 위치 기반으로 주변의 로스터리 카페 위치정보를 제공하는 섹션.
- **지도 뷰 (우측)**: **네이버 지도(Naver Map)** API를 사용하여 지도 화면 및 카페들의 위치 마커를 렌더링.

### 2.6 푸터 (Footer)

- 초기 단계이므로 복잡한 요소는 제외하고 기초적인 카피라이트 텍스트 정도만 **간단하게 구현**합니다.

---

## 3. 핵심 동작 요구사항

- **SPA 라우팅 연동**: 로그인 페이지, 원두 정보 페이지 등 내부 라우팅 요소 완비.
- **지도 라이브러리 연동**: 네이버 지도 최적화.

---

## 4. API 연동 명세

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

| Name         | Type   | Description                                                                                                                                                                                                                                                                   | null 여부 | 형식 |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| - statusCode | String | 커스텀한 응답 코드                                                                                                                                                                                                                                                            | x         |      |
| - message    | String | 성공 : 빈 문자열<br>실패 : 실패한 이유                                                                                                                                                                                                                                        | x         |      |
| - data       | Object | `tastings` (array) : 향미 목록<br>`tasting_name` (string) : 향미 이름<br>`tasting_link` (string) : 향미 정렬 링크<br>`beans` (array) : 추천 원두 목록<br>`bean_name` (string) : 추천 원두 이름<br>`bean_tasting` (array) : 원두 향미 목록<br>`bean_link` (string) : 원두 링크 | x         |      |

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
        "tasting_link": "/api/beans?tastingId=1"
      },
      {
        "tasting_name": "복숭아",
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
