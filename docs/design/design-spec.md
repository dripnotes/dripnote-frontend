# Dripnote Design Specification

## Overview

**Dripnote**는 커피 원두와 향미(Aroma)를 탐색하고 로스터리를 발견하는 프리미엄 커피 큐레이션 서비스입니다.
이 문서는 서비스의 시각적 언어, 사용자 인터페이스(UI) 원칙, 그리고 브랜드 경험을 정의합니다.

## 0. Target Audience & Identity

- **Target**: 2030 세대 (취향과 경험을 중시하는 커피 애호가)
- **Brand Image**:
  - **Calm & Intelligent**: 차분하고 지적인 무드. 스페셜티 커피의 전문성을 반영.
  - **Clean & Minimal**: 불필요한 장식을 배제하고 고품질 이미지와 공백을 통해 브랜드 가치 전달.

---

## 1. Design Concept: "Internal Coffee Lab"

커피를 연구하고 기록하는 지적인 공간(Laboratory)의 이미지를 현대적으로 재해석합니다.

- **Visual Dominance**: 텍스트 설명 없이도 이미지의 구도와 색감만으로 전문성이 전달되도록 기획.
- **High-Quality Imagery**: 상품(원두)과 공간(로스터리)을 보여주는 깔끔하고 감각적인 사진 활용.

---

## 2. Visual-First Content Strategy: "Show, Don't Just Tell"

사용자가 텍스트를 읽는 것이 아니라 이미지를 통해 **분위기(Feeling)**를 즉각적으로 느끼게 설계합니다.

- **Copywriting Principles**:
  - **Punchy Headings**: 강렬하고 짧은 한두 단어의 헤드라인 활용 (예: "Beyond Beans", "Find Your Aroma").
  - **One-Sentence Limit**: 모든 상세 설명이나 소개글은 **최대 한 문장** 이내로 제한하여 압축된 핵심 느낌만 전달.
- **Minimalist Sensory UI**:
  - **Visual Shorthand**: Color Chips 및 Minimal Icons를 활용한 직관적 향미 전달.
  - **Micro-Copy Labels**: 태그 당 최대 2단어 이내 유지.

---

## 3. Color Palette (Tokens)

### 3.1 Base Colors (Surface)

- **Primary-Surface**: `#1A1614` (Espresso Dark)
- **Secondary-Surface**: `#2A2522`
- **Tertiary-Surface**: `#FAF7F5` (Cream Foam)

### 3.2 Accent Colors (Flavor & Branding)

- **Brand-Amber**: `#D97706` (Honey/Caramel Accents)
- **Social-Google-Blue**: `#4285F4`
- **Social-Naver-Green**: `#03C75A`
- **Social-Kakao-Yellow**: `#FEE500`

---

## 4. Typography (Tokens)

- **Headings (Logo & Hero)**: `Playfair Display` (Classic & Professional)
- **Sub-Headings & Labels**: `Outfit` (Modern & Trendy)
- **Body & Information**: `Inter` (Max Readability)

---

## 5. Component Rules

### 5.1 Login & Onboarding (Social Only)

- **UI Focus**: 중앙 집중형 클린 레이아웃. 이미지 배경 오버레이를 통해 고급 무드 형성.

### 5.2 Hero Section (Main Landing)

- **Visual**: 고해상도 브루잉/공간 스틸컷 배경이 화면의 80% 이상 차지.
- **Typography**: 화면 중앙에 위치한 **한 줄의 강력한 헤드라인** (Minimal Description 제외).

### 5.3 Multi-Layer Sensory Card (Bean Cards)

- **Composition**: 원두 이미지 + 2~3개의 향미 요소를 지적으로 레이어링.
- **Visual-Text Balance**: 텍스트는 상품명과 원산지만 표시, 맛의 상세 설명은 생략하고 이미지 콜라주로 대체.

---

## 6. Visual Asset Guidelines

- **Product Photography**: 원두 텍스처를 강조하는 45도 시각.
- **Flavor Imagery**: 채도를 조절한 신선하고 깔끔한 스틸 컷.
- **Shadows**: 부드러운 'Drop Shadow' (Blur: 20px, Opacity: 10%).

---

## 7. Motion & Micro-interactions: "Fast & Linear Fluids"

- **Linear Fluidity**: 가속과 감속의 폭이 적은 선형적인 부드러움 강조.
- **Quick Response**: Duration 0.2s ~ 0.4s의 빠른 반응형 피드백.

---

## 8. Logo & Branding

- **Typographic Logo**: **"Dripnote"**
- **Strategy**: 현재 GNB의 깔끔한 타이포그래피 계승. 대문자 'D'를 사용해 브랜드의 신뢰도 확보.

---

## 9. Layout Principles

- **Grid System**: 12-Column Grid (Desktop), 4-Column Grid (Mobile).
- **Whitespace**: Gutter 24px 이상 유지 (깔끔한 무드 유지).

---

## 10. Page-Specific Design Patterns

### 10.1 Main Page

- **Sections**: Hero Carousel, Flavor Navigator, Recommended Beans, Roastery Map.
- **Constraint**: 섹션별 설명 텍스트를 배제하고 지배적인 이미지 한 장으로 각각의 목적 전달.

### 10.2 Shop (Bean Info)

- **Feature**: Sensory Filters, Story-telling Detail, Flavor Wheel Overlay.
- **Rule**: 원두 소개 시 긴 설명글 대신 **한 줄의 임팩트 있는 문장**으로 풍미 표현.

### 10.3 Classes

- **Description**: "전문가와 함께하는 브루잉 세션"과 같은 짧은 한 문장만 사용.
- **Visual**: 교육 과정의 특정 이미지가 주는 '분위기'와 '열정'을 시각적으로 강조.

### 10.4 Login

- **Rule**: "Dripnote 시작하기" 외 모든 텍스트 제거. 이미지 배경이 주도하는 심플한 UI.
