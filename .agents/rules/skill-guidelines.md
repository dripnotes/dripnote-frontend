---
trigger: always_on
description: 이 문서는 `agentskills.io`의 표준 사양을 기반으로, 프로젝트 내에서 에이전트의 기능을 확장하고 전문성을 패키징하는 **Agent Skills**를 작성하는 방법을 규정합니다.
---

# 에이전트 스킬 개발 가이드 (Agent Skill Development Guidelines)

이 문서는 `agentskills.io`의 표준 사양을 기반으로, 프로젝트 내에서 에이전트의 기능을 확장하고 전문성을 패키징하는 **Agent Skills**를 작성하는 방법을 규정합니다.

## 1. 스킬 디렉토리 구조 (Directory Structure)

각 스킬은 반드시 독립된 폴더 내에 위치해야 하며, 해당 폴더는 다음과 같은 구조를 가집니다.

```
.agents/skills/
└── skill-name/                 # 스킬 폴더 (lowercase + hyphen)
    ├── SKILL.md                # [필수] 메타데이터 및 지침
    ├── scripts/                # [선택] 실행 가능한 스크립트 (Python, JS, Bash 등)
    ├── references/             # [선택] 기술 문서 및 참고 자료
    └── assets/                 # [선택] 템플릿, 이미지 등 리소스
```

## 2. SKILL.md 포맷 (SKILL.md Format)

`SKILL.md`는 **YAML Frontmatter**와 **본문(Body)**으로 구성됩니다.

### 2.1 YAML Frontmatter

```yaml
---
name: skill-name # [필수] 폴더 이름과 일치해야 함
description: >- # [필수] 스킬의 동작과 사용 시점에 대한 설명 (1-1024자)
  이 스킬은 ~을 수행할 때 사용합니다. 유저가 ~을 언급할 때 트리거하십시오.
license: MIT # [선택] 라이선스 명시
metadata: # [선택] 클라이언트 전용 추가 메타데이터
  author: baristation-team
  version: '1.0'
---
```

### 2.2 본문 (Body Content)

본문에는 에이전트가 스킬을 실행할 때 따라야 할 **단계별 지침(Instructions)**을 Markdown 형식으로 작성합니다.

- 복잡한 작업은 하위 단계로 분할합니다.
- 입력값과 출력값의 예시를 포함합니다.
- 발생 가능한 에지 케이스(Edge Case)와 오류 처리 방법을 명시합니다.

## 3. 핵심 규칙 (Key Principles)

1.  **점진적 노출 (Progressive Disclosure)**:
    - `name`과 `description`은 검색 시 가장 먼저 로드되므로, 명확하고 검색 가능한 키워드를 포함해야 합니다.
    - 전체 `SKILL.md` 본문은 스킬이 활성화된 후 로드되므로, 지침은 상세하게 작성하십시오.
2.  **명명 규칙 (Naming Convention)**:
    - 스킬 이름은 소문자 영문(a-z)과 하이픈(-)만 허용됩니다.
    - 하이픈으로 시작하거나 끝나지 않아야 하며, 연속된 하이픈(--)은 금지됩니다.
3.  **참조 및 실행 (File References)**:
    - 본문에서 다른 파일을 참조할 때는 `[Reference](references/FILE.md)` 또는 `scripts/run.sh`와 같이 **상대 경로**를 사용하십시오.

## 4. 모범 사례 (Best Practices)

- **Show, Don't Just Tell**: 복잡한 개념은 예제 코드나 다이어그램을 활용하십시오.
- **Self-Correction**: 에이전트가 작업을 수행하면서 스스로 잘못된 점을 고칠 수 있는 체크리스트를 지침에 포함하십시오.
- **Isolation**: 각 스킬은 하나의 전문 영역에 집중해야 하며, 너무 많은 기능을 하나의 스킬에 넣지 마십시오.

---

> 본 가이드는 [agentskills.io](https://agentskills.io/home)의 Specification을 따릅니다.
