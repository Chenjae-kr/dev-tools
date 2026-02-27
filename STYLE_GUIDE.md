# Dev Tools — UI 컴포넌트 스타일 가이드

> **목적**: 모든 도구 페이지의 UI 규격을 통일해 새 도구 추가나 유지보수 시 기준으로 삼는다.

---

## 1. 실행 버튼 (`.generate-btn`)

| 케이스 | 라벨 |
|--------|------|
| 일반 실행 (변환·생성·분석·마스킹 등) | `⚡ RUN` |
| 파일 다운로드가 주 목적인 경우 | `⬇ DOWNLOAD` |

```html
<button class="generate-btn" onclick="run()">⚡ RUN</button>
<p class="kb-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd></p>
```

- `⚡ FORMAT`, `⚡ GENERATE`, `⚡ 변환`, `⚡ 추출` 등 도구별 개별 라벨 **사용 금지**

---

## 2. Empty State

### 아이콘
- **이모지만 사용** — 텍스트(`TAG`, `SQL`)나 화살표(`⬅`, `⇄`) 사용 금지
- 도구 성격에 맞는 이모지를 사용:

| 도구 유형 | 권장 아이콘 |
|-----------|------------|
| SQL 생성 | `🗄️` |
| 코드/텍스트 포매팅 | `📝` |
| 데이터 변환 | `🔄` |
| 이미지 처리 | `🖼️` |
| 분석/통계 | `📊` |
| 비교/Diff | `🔍` |
| 마스킹/보안 | `🛡️` |
| 추출 | `📄` |
| HTML 관련 | `🏷️` |
| 일정/크론 | `⏰` |
| 기타 | `🔧` |

### 메시지
```
[입력 대상] 입력 후 RUN을 누르세요
```

| 예시 상황 | 메시지 |
|-----------|--------|
| 단일 텍스트 입력 | `입력 후 RUN을 누르세요` |
| SQL 입력 | `SQL 입력 후 RUN을 누르세요` |
| JSON 입력 | `JSON 입력 후 RUN을 누르세요` |
| CSV 입력 | `CSV 입력 후 RUN을 누르세요` |
| HTML 입력 | `HTML 입력 후 RUN을 누르세요` |
| 파일 업로드 | `파일 업로드 후 RUN을 누르세요` |
| 다운로드형 | `설정 후 DOWNLOAD를 누르세요` |
| 두 패널 입력 | `텍스트 입력 후 RUN을 누르세요` |

```html
<div class="empty-state">
  <div class="icon">🔧</div>
  <p>입력 후 RUN을 누르세요</p>
</div>
```

---

## 3. 패널 제목 (`.panel-title`)

- 입력 패널 제목은 항상 **`INPUT`** 고정
- `CSV INPUT`, `SQL INPUT`, `JSON INPUT` 등 타입별 변형 **사용 금지**
- 입력 형식 힌트는 `<textarea placeholder="">` 로 전달

```html
<div class="panel-title"><div class="dot"></div>INPUT</div>
```

---

## 4. 도구 헤더 설명 (`<p>` in `.tool-header`)

- **한국어 명사형** 사용 (`~합니다` 정중체, 영어 혼용 문장 금지)
- 포맷: `// 핵심 기능 요약 (필요 시 기술 스택 나열)`

```html
<!-- Good -->
<p>// CSV · Excel · Markdown 데이터를 INSERT/UPSERT SQL로 변환</p>
<p>// SQL 정렬 + 위험 구문 점검 (MySQL · PostgreSQL · Oracle)</p>

<!-- Bad -->
<p>// paste your CREATE TABLE statement and generate queries instantly</p>
<p>// JSON 데이터를 자동 정렬하고 구문 오류를 검사합니다</p>
```

---

## 5. Footer

- 포맷: `// 도구명` (짧게, 설명 없이)
- `<title>` 태그의 `도구명` 부분과 일치시킬 것

```html
<!-- Good -->
<footer>// SQL Formatter</footer>
<footer>// Data Masker</footer>

<!-- Bad -->
<footer>// SQL Formatter + Quick Safety Lint</footer>
<footer>// CSV/Excel → INSERT Generator — supports MySQL · Oracle · ...</footer>
```

---

## 6. 고정 라벨 (변경 금지)

| 컴포넌트 | 라벨 |
|----------|------|
| 예시 버튼 | `예시 불러오기` |
| 복사 버튼 | `COPY` |
| WRAP 버튼 | `WRAP` |
| 키보드 힌트 | `<kbd>Ctrl</kbd> + <kbd>Enter</kbd>` |

---

## 7. 언어 사용 원칙

| 위치 | 언어 |
|------|------|
| 도구 헤더 설명 (`<p>`) | 한국어 명사형 |
| 버튼 라벨 | 영어 대문자 (`RUN`, `COPY`, `DOWNLOAD`) |
| Empty state 메시지 | 한국어 |
| 옵션 라벨 (`.options-label`) | 영어 (기술 용어) |
| 패널 제목 | 영어 대문자 (`INPUT`) |
| Footer | 영어 (도구명 그대로) |

---

## 8. 신규 도구 체크리스트

새 도구를 추가할 때 아래 항목을 확인한다:

- [ ] `_template.html` 을 복사해서 시작
- [ ] `generate-btn` 라벨 → `⚡ RUN` 또는 `⬇ DOWNLOAD`
- [ ] empty state 아이콘 → 이모지
- [ ] empty state 메시지 → `입력 후 RUN을 누르세요` 형태
- [ ] 패널 제목 → `INPUT`
- [ ] 도구 설명 → 한국어 명사형
- [ ] footer → `// 도구명`
- [ ] `sample-btn` + `loadSample()` 구현
- [ ] `kb-hint` 추가
- [ ] `wrapBtnId` in `renderSqlBlock` (텍스트 출력인 경우)
- [ ] `scrollToOutput()` 호출
- [ ] `Ctrl+Enter` 이벤트 리스너
- [ ] `nav.js` 의 `NAV_ITEMS` 에 등록
