# Dev Tools

개발 작업을 빠르게 처리하는 웹 기반 유틸리티 모음입니다.  
대부분 빌드 없이 브라우저에서 바로 실행됩니다.

## 실행 방법

```bash
python -m http.server 8080
# 또는
npx serve .
```

브라우저에서 `index.html`(또는 `http://localhost:8080`)을 열면 됩니다.

---

## 도구 목록 (최신)

### SQL/데이터베이스
- **JSON ↔ SQL CRUD 생성기** (`tools/json-sql-crud.html`)
  - CREATE / INSERT / SELECT / UPDATE / DELETE 선택 생성
- **테이블 데이터 → INSERT/UPSERT SQL** (`tools/csv-to-insert.html`)
  - CSV / Excel / Markdown 통합
- **DDL → CRUD 생성기** (`tools/ddl-crud.html`)
- **SQL → ERD 뷰어** (`tools/sql-erd.html`)
- **SQL 포맷터 + 린트** (`tools/sql-formatter.html`)
- **SQL 테스트 데이터 시더 생성기** (`tools/sql-seeder-generator.html`)

### 데이터/포맷
- **JSON ↔ Excel ↔ Markdown 변환기** (`tools/data-converter.html`)
- **CSV/Excel 컬럼 프로파일러** (`tools/csv-column-profiler.html`)
- **JSON 포맷터 / 검증기** (`tools/json-formatter.html`)
- **HTML ↔ Markdown 변환기** (`tools/html-to-markdown.html`)
- **HTML 태그 분석기** (`tools/html-tag-analyzer.html`)
- **HTML 표시 텍스트 추출기** (`tools/html-text-extractor.html`)
- **목업 데이터 생성기** (`tools/mock-data-generator.html`)
- **이미지 → Hex 변환기** (`tools/img-to-hex.html`)
- **URL 인코더 / 디코더** (`tools/url-encoder.html`)

### 이미지
- **블로그 썸네일 메이커** (`tools/thumbnail-maker.html`)
- **인스타 카드뉴스 메이커** (`tools/instagram-card-maker.html`)
- **이미지 워터마크 도구** (`tools/watermark-tool.html`)
  - 텍스트/PNG 워터마크, 타임스탬프 ON/OFF
- **테이블/JSON → 차트 이미지 메이커** (`tools/table-chart-maker.html`)

### 텍스트/비교
- **텍스트 / 코드 Diff 뷰어** (`tools/diff-viewer.html`)
  - Text/JSON 비교, Unified/Split 뷰, 인라인 하이라이트, 파일 업로드 비교, patch 복사

### 유틸리티
- **데이터 마스킹 (PII 비식별화)** (`tools/data-masker.html`)
- **Cron 빌더 & 해석기** (`tools/cron-builder.html`)

> `tools/md-to-insert.html`은 통합 도구(`csv-to-insert.html?mode=md`)로 리다이렉트됩니다.

---

## 프로젝트 구조

```text
dev-tools/
├── index.html
├── tools.js
├── nav.js
├── ui-utils.js
├── image-tools-utils.js
├── styles.css
├── vendor/
│   └── xlsx.full.min.js
└── tools/
    ├── json-sql-crud.html
    ├── csv-to-insert.html
    ├── ddl-crud.html
    ├── sql-erd.html
    ├── sql-formatter.html
    ├── sql-seeder-generator.html
    ├── data-converter.html
    ├── csv-column-profiler.html
    ├── json-formatter.html
    ├── html-to-markdown.html
    ├── html-tag-analyzer.html
    ├── html-text-extractor.html
    ├── mock-data-generator.html
    ├── img-to-hex.html
    ├── url-encoder.html
    ├── thumbnail-maker.html
    ├── instagram-card-maker.html
    ├── watermark-tool.html
    ├── table-chart-maker.html
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
   - (필요 시) `ui-utils.js`, `image-tools-utils.js`
3. `<body>` 상단에서 `renderNav()` 호출
4. `tools.js`의 `TOOLS`에 항목 추가 (`category`, `label`, `title`)

---

## 참고

- 공통 UI 헬퍼: `ui-utils.js`
  - `escHtml`, `showError`, `copyElementText`, `renderSqlBlock`
- 공통 이미지 헬퍼: `image-tools-utils.js`
  - `clamp`, `fitTextSize`, `drawImageCover`, `downloadCanvas`
- 테마: `localStorage`의 `devtools-theme` (`dark`/`light`)
- 공통 단축키: 대부분 `Ctrl/Cmd + Enter`

## 의존성

- 기본은 Vanilla HTML/CSS/JS
- Excel 파싱용 SheetJS는 로컬 번들 사용: `vendor/xlsx.full.min.js`
- 오프라인 사용(폰트 제외) 기준으로 CDN 런타임 의존 없이 동작하도록 유지