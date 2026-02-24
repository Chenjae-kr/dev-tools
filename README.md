# Dev Tools

개발 작업을 빠르게 처리하는 웹 기반 유틸리티 모음입니다.
대부분 빌드 없이 브라우저에서 바로 실행됩니다.

## 실행 방법

```bash
python -m http.server 8080
# 또는
npx serve .
```

`index.html`을 열면 됩니다.

---

## 도구 목록 (최신)

### SQL/DB
- **JSON ↔ SQL CRUD** (`tools/json-sql-crud.html`)
- **Table Data → INSERT/UPSERT SQL** (`tools/csv-to-insert.html`)  
  - CSV / Excel / Markdown 통합
- **DDL → CRUD** (`tools/ddl-crud.html`)
- **SQL → ERD** (`tools/sql-erd.html`)
- **SQL Formatter + Lint** (`tools/sql-formatter.html`)
- **SQL Test Data Seeder** (`tools/sql-seeder-generator.html`)

### Data/Format
- **CSV Column Profiler** (`tools/csv-column-profiler.html`)
- **JSON Formatter / Validator** (`tools/json-formatter.html`)
- **Mock Data Generator** (`tools/mock-data-generator.html`)
- **Image → Hex Converter** (`tools/img-to-hex.html`)
- **URL Encoder / Decoder** (`tools/url-encoder.html`)

### Text/Compare
- **Diff Viewer** (`tools/diff-viewer.html`)  
  - Text/JSON 비교 + unified patch copy

### Utility
- **Data Masker (PII)** (`tools/data-masker.html`)
- **Cron Builder & Humanize** (`tools/cron-builder.html`)

> `tools/md-to-insert.html`은 통합 도구(`csv-to-insert.html?mode=md`)로 리다이렉트됩니다.

---

## 프로젝트 구조

```text
dev-tools/
├── index.html
├── tools.js
├── nav.js
├── ui-utils.js
├── styles.css
└── tools/
    ├── json-sql-crud.html
    ├── csv-to-insert.html
    ├── ddl-crud.html
    ├── sql-erd.html
    ├── sql-formatter.html
    ├── sql-seeder-generator.html
    ├── csv-column-profiler.html
    ├── json-formatter.html
    ├── mock-data-generator.html
    ├── img-to-hex.html
    ├── url-encoder.html
    ├── diff-viewer.html
    ├── data-masker.html
    ├── cron-builder.html
    └── md-to-insert.html (redirect)
```

---

## 새 도구 추가

1. `tools/`에 새 HTML 파일 생성
2. 공통 스크립트 로드:
   - `tools.js`
   - `nav.js`
   - `ui-utils.js`
3. `<body>` 상단에서 `renderNav()` 호출
4. `tools.js`의 `TOOLS`에 항목 추가 (`category` 포함)

---

## 참고

- 공통 UI 헬퍼: `ui-utils.js`
  - `escHtml`, `showError`, `copyElementText`, `renderSqlBlock`
- 테마: `localStorage`의 `devtools-theme` (`dark`/`light`)
- 공통 단축키: 대부분 `Ctrl/Cmd + Enter`

## 의존성

- 기본은 Vanilla HTML/CSS/JS
- `csv-to-insert.html`의 Excel 파싱은 **SheetJS CDN** 사용
  - 오프라인 완전 지원이 필요하면 SheetJS를 로컬 번들로 교체하세요.
