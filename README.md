# DevTools

브라우저에서 바로 쓰는 개발자 유틸리티 모음입니다.  
SQL/DB, 데이터 변환, 이미지 제작, 텍스트 비교, 유틸리티 도구를 **빌드 없이** 실행할 수 있습니다.

---

## 빠른 시작

```bash
cd dev-tools
python -m http.server 8080
# 또는
npx serve .
```

브라우저에서:
- `http://localhost:8080`
- 또는 `index.html`

---

## 핵심 특징

- **오프라인 우선**(폰트 제외)
- **단일 레지스트리 기반** 도구 관리 (`tools.js`)
- **공통 네비/헤더/푸터 동기화** (`nav.js`)
- **공통 UI 컴포넌트/유틸리티 재사용** (`ui-utils.js`, `styles.css`)
- 모바일/데스크톱 반응형 최적화
- 스모크 테스트 제공 (`scripts/smoke-test.mjs`)

---

## 현재 도구 구성

### SQL/DB (`tools/sql-db/*`)
- JSON ↔ SQL CRUD 생성기
- Table Data → INSERT/UPSERT SQL
- DDL → CRUD 생성기
- SQL → ERD
- SQL Formatter
- SQL Seeder Generator

### Data/Format (`tools/data-format/*`)
- Data Converter (JSON/Excel/Markdown)
- CSV Column Profiler
- JSON Formatter
- HTML → Markdown
- HTML Tag Analyzer
- HTML Text Extractor
- Mock Data Generator (DSL/DDL/JSON)
- Image → Hex
- URL & Query Builder

### Image (`tools/image/*`)
- Instagram Card Maker
- Blog Thumbnail Maker
- Watermark Tool
- Table/JSON Chart Maker
- PDF → Image Converter

### Text/Compare (`tools/text-compare/*`)
- Diff Viewer

### Utility (`tools/utility/*`)
- Cron Builder
- Data Masker

> `tools/md-to-insert.html`은 통합 도구로 리다이렉트됩니다.

---

## 프로젝트 구조

```text
dev-tools/
├── index.html
├── tools.js                 # 도구 레지스트리 (단일 소스)
├── nav.js                   # 공통 네비/헤더/푸터 동기화
├── ui-utils.js              # 공통 UI 유틸
├── image-tools-utils.js     # 공통 이미지 유틸
├── styles.css               # 전역 스타일
├── scripts/
│   └── smoke-test.mjs       # 기본 회귀 점검
├── vendor/
│   └── xlsx.full.min.js     # 로컬 번들(오프라인)
└── tools/
    ├── sql-db/
    ├── data-format/
    ├── image/
    ├── text-compare/
    ├── utility/
    ├── md-to-insert.html
    └── _template.html
```

---

## 새 도구 추가 방법

1. 적절한 카테고리 폴더에 HTML 생성 (`tools/<category>/...`)
2. 공통 리소스 로드
   - `tools.js`
   - `nav.js`
   - 필요 시 `ui-utils.js`, `image-tools-utils.js`
3. `<body>` 초반에 `renderNav()` 호출
4. `tools.js`의 `TOOLS`에 항목 추가
   - `category`, `href`, `label`, `title`, `desc`, `tags`, `footer`
5. 스모크 테스트 실행

```bash
node scripts/smoke-test.mjs
```

---

## UI/개발 컨벤션

- 인라인 `style="..."` 지양 (클래스 기반 우선)
- `style.display` 직접 토글 지양 (`hidden`/상태 클래스 사용)
- 공통 클래스/패턴 우선 재사용
- 모바일에서 `row-tight` 인라인 컨트롤 붕괴 방지 규칙 준수
- 도구 메타데이터는 `tools.js`를 단일 소스로 유지

---

## 테마

- 기본: `light`
- 저장 키: `localStorage['devtools-theme']`
- 값: `light | dark`

---

## 라이선스 / 사용

내부/개인 생산성 도구 중심으로 운영 중이며,
필요 시 기능과 구조를 계속 확장합니다.
