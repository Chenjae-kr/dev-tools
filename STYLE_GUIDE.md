# Dev Tools — UI 컴포넌트 스타일 가이드

모든 툴 페이지는 아래 규칙을 기본으로 사용합니다.

## 1) 버튼 규격

공통 버튼 계열:
- `.generate-btn` (주요 실행)
- `.toggle-btn` (보조/토글)
- `.copy-btn` (복사)
- `.wrap-btn` (출력 감싸기)
- `.sample-btn` (예시 불러오기)
- `.file-select-btn` (파일 선택)
- `.dialect-btn`, `.crud-toggle`, `.all-toggle`
- `.export-btn`

규칙:
- 높이/패딩/둥근 모서리/폰트는 공통 시스템 사용
- hover/focus-visible 동작 통일
- 버튼 텍스트는 되도록 아래 패턴 사용
  - `⚡ 생성`, `⚡ 변환`, `COPY`, `⬇ 다운로드`, `예시 불러오기`, `RESET`

## 2) Empty State

- 공통 `.empty-state` 사용
- 아이콘 크기/간격은 전역 규칙 유지
- 메시지는 1~2줄, 설명형 문장으로 작성

## 3) 헤더/설명

- 툴 상단 `.tool-header` 문구는 `tools.js` 단일 소스 기준
- 페이지 하드코딩 문구 대신 레지스트리 값 동기화(`nav.js`) 사용

## 4) 섹션 규격

- `.setting-group`, `.setting-title`, `.options-bar`, `.options-label` 공통 사용
- 인라인 스타일 금지(동적 레이아웃 제외)

## 5) 출력 패널

- 결과 액션 버튼은 헤더 우측 `block-actions` 그룹 배치
- 에러/성공/정보 메시지는 `UIUtils.renderResultMessage` 기반 사용

## 6) 추가/수정 체크리스트

- [ ] tools.js 등록
- [ ] tool-header 동기화 대상 구조 유지
- [ ] smoke-test 통과 (`node scripts/smoke-test.mjs`)
- [ ] 인라인 style 미사용(정적 마크업)
