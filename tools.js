/* ═══════════════════════════════════════════════════════════
   Dev Tools — Tool Registry
   ═══════════════════════════════════════════════════════════ */

const TOOL_CATEGORIES = [
  'SQL/DB',
  'Data/Format',
  'Text/Compare',
  'Utility',
];

const TOOLS = [
  {
    category: 'SQL/DB', href: 'json-sql-crud.html', label: 'JSON ↔ CRUD', icon: 'JSQL',
    title: 'JSON ↔ SQL CRUD Generator',
    desc: 'JSON 샘플 객체를 기반으로 SELECT/INSERT/UPDATE/DELETE SQL 템플릿을 자동 생성합니다. PK 컬럼 지정과 MySQL/Oracle/PostgreSQL 방언 지원.',
    tags: ['JSON', 'CRUD', 'MySQL', 'Oracle', 'PostgreSQL'],
    footer: 'JSON Object → SELECT · INSERT · UPDATE · DELETE',
  },
  {
    category: 'SQL/DB', href: 'csv-to-insert.html', label: 'Table → SQL', icon: 'TBL',
    title: 'Table Data → INSERT/UPSERT SQL',
    desc: 'CSV/Excel/Markdown 테이블 데이터를 INSERT/UPSERT SQL로 변환합니다. 드래그 앤 드롭, 구분자 자동 감지, 컬럼 매핑, Preview, Chunk 출력 지원.',
    tags: ['MySQL', 'Oracle', 'PostgreSQL', 'CSV/Excel/Markdown'],
    footer: 'Table Data → INSERT · UPSERT SQL',
  },
  {
    category: 'SQL/DB', href: 'ddl-crud.html', label: 'DDL → CRUD', icon: 'SQL',
    title: 'DDL → CRUD Generator',
    desc: 'CREATE TABLE DDL을 입력하면 INSERT, SELECT, UPDATE, DELETE 쿼리를 자동 생성합니다. PK 자동 감지, MyBatis XML 지원.',
    tags: ['MySQL', 'Oracle', 'PostgreSQL', 'MyBatis'],
    footer: 'DDL → INSERT · SELECT · UPDATE · DELETE',
  },
  {
    category: 'SQL/DB', href: 'sql-erd.html', label: 'SQL → ERD', icon: 'ERD',
    title: 'SQL → ERD Viewer',
    desc: 'SQL DDL 파일을 업로드하거나 붙여넣으면 테이블 관계도(ERD)를 자동으로 그려줍니다. FK 관계·PK·컬럼 타입 시각화, 드래그 배치, SVG 내보내기 지원.',
    tags: ['ERD', 'FK Relations', 'Schema Viz', 'SVG Export'],
    footer: 'DDL → Entity Relationship Diagram',
  },
  {
    category: 'SQL/DB', href: 'sql-formatter.html', label: 'SQL Format', icon: 'FMT',
    title: 'SQL Formatter + Lint',
    desc: 'SQL 구문을 자동 정렬하고 위험 패턴을 빠르게 점검합니다. DELETE/UPDATE without WHERE, SELECT *, DROP/TRUNCATE TABLE 경고를 제공합니다.',
    tags: ['Format', 'Lint', 'MySQL', 'PostgreSQL', 'Oracle'],
    footer: 'SQL → Format · Quick Safety Lint',
  },
  {
    category: 'SQL/DB', href: 'sql-seeder-generator.html', label: 'SQL Seeder', icon: 'SEED',
    title: 'SQL Test Data Seeder Generator',
    desc: '간단한 테이블 DSL에서 FK 의존 순서를 계산해 다중 테이블 INSERT 시드 데이터를 생성합니다.',
    tags: ['Seed Data', 'FK Order', 'INSERT'],
    footer: 'Schema DSL → Seed INSERT SQL',
  },

  {
    category: 'Data/Format', href: 'data-converter.html', label: 'Data Convert', icon: 'CVT',
    title: 'JSON ↔ Excel ↔ Markdown Converter',
    desc: 'JSON, 엑셀(.xlsx/.xls), Markdown 테이블 간 데이터를 상호 변환합니다. 엑셀 출력은 파일 다운로드를 지원합니다.',
    tags: ['JSON', 'Excel', 'Markdown', 'Converter'],
    footer: 'JSON ↔ Excel ↔ Markdown',
  },
  {
    category: 'Data/Format', href: 'csv-column-profiler.html', label: 'CSV Profiler', icon: 'PROF',
    title: 'CSV/Excel Column Profiler',
    desc: '컬럼별 null 비율, 중복 건수, 타입 추정, 길이 통계를 빠르게 분석합니다.',
    tags: ['CSV', 'Profiling', 'Null', 'Duplicate'],
    footer: 'Column Stats · Type Inference',
  },
  {
    category: 'Data/Format', href: 'json-formatter.html', label: 'JSON Format', icon: 'JSON',
    title: 'JSON Formatter / Validator',
    desc: 'JSON 데이터를 자동 포매팅하고 구문 오류를 감지합니다. 들여쓰기 설정, 미니파이, 문자열 이스케이프 변환을 지원합니다.',
    tags: ['Format', 'Minify', 'Validate', 'Syntax Highlight'],
    footer: 'JSON → Prettify · Minify · Validate',
  },
  {
    category: 'Data/Format', href: 'mock-data-generator.html', label: 'Mock Data', icon: 'MOCK',
    title: 'Mock Data Generator',
    desc: '컬럼 스키마(DSL 또는 SQL DDL)를 기반으로 테스트 데이터를 생성합니다. CSV/JSON/SQL INSERT 출력, seed 기반 재현 가능한 랜덤 데이터 지원.',
    tags: ['CSV', 'JSON', 'SQL INSERT', 'Seeded Random'],
    footer: 'Schema → Mock Data',
  },
  {
    category: 'Data/Format', href: 'img-to-hex.html', label: 'IMG → HEX', icon: 'HEX',
    title: 'Image → Hex Converter',
    desc: '이미지 파일을 Hex Dump, C Array, Python bytes, Base64 형식으로 변환합니다. 드래그 앤 드롭 지원.',
    tags: ['Hex Dump', 'C Array', 'Python', 'Base64'],
    footer: 'Image → Hex Dump · C Array · Python · Base64',
  },
  {
    category: 'Data/Format', href: 'url-encoder.html', label: 'URL Encode', icon: 'URL',
    title: 'URL Encoder / Decoder',
    desc: 'URL 인코딩·디코딩과 쿼리 파라미터 분석을 지원합니다. encodeURIComponent / encodeURI 모드 선택, 파라미터 파싱 및 JSON 복사 지원.',
    tags: ['Encode', 'Decode', 'Query Params', 'Parse'],
    footer: 'URL → Encode · Decode · Parse',
  },
  {
    category: 'Data/Format', href: 'thumbnail-maker.html', label: 'Thumbnail', icon: 'THMB',
    title: 'Blog Thumbnail Maker',
    desc: '블로그 썸네일을 빠르게 제작합니다. 이미지 비율 선택, 배경 단색/이미지, 텍스트 입력 및 PNG 다운로드를 지원합니다.',
    tags: ['Thumbnail', 'Canvas', 'Ratio', 'PNG'],
    footer: 'Text + Background → Thumbnail PNG',
  },

  {
    category: 'Text/Compare', href: 'diff-viewer.html', label: 'Diff Viewer', icon: 'DIFF',
    title: 'Text / Code Diff Viewer',
    desc: '두 텍스트 또는 JSON을 비교하여 변경된 부분을 한눈에 확인합니다. 추가·삭제·수정 라인 하이라이트와 unified patch 복사를 지원합니다.',
    tags: ['Line Diff', 'JSON Diff', 'Patch Copy', 'Unified View'],
    footer: 'Original vs Modified — diff + patch',
  },

  {
    category: 'Utility', href: 'data-masker.html', label: 'Data Masker', icon: 'MASK',
    title: 'Data Masker (PII Redaction)',
    desc: '텍스트/JSON 내 이메일, 전화번호, 카드번호, 주민번호 패턴을 감지하여 마스킹합니다.',
    tags: ['PII', 'Masking', 'Security'],
    footer: 'Redact Sensitive Data',
  },
  {
    category: 'Utility', href: 'cron-builder.html', label: 'Cron Builder', icon: 'CRON',
    title: 'Cron Builder & Humanize',
    desc: 'Linux 5-field cron 식을 빠르게 생성하고 자연어 해석을 제공합니다. 자주 쓰는 프리셋(매 5분, 평일 9시 등)과 복사 버튼 지원.',
    tags: ['Cron', 'Schedule', 'Humanize', 'Preset'],
    footer: 'Cron → Build · Explain',
  },
];
