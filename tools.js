/* ═══════════════════════════════════════════════════════════
   Dev Tools — Tool Registry
   ═══════════════════════════════════════════════════════════ */

const TOOL_CATEGORIES = [
  'SQL/데이터베이스',
  '데이터/포맷',
  '이미지',
  '텍스트/비교',
  '유틸리티',
];

const TOOLS = [
  {
    category: 'SQL/데이터베이스', href: 'json-sql-crud.html', label: 'JSON ↔ SQL CRUD', icon: 'JSQL',
    title: 'JSON ↔ SQL CRUD 생성기',
    desc: 'JSON 샘플 객체를 기반으로 SELECT/INSERT/UPDATE/DELETE SQL 템플릿을 자동 생성합니다. PK 컬럼 지정과 MySQL/Oracle/PostgreSQL 방언 지원.',
    tags: ['JSON', 'CRUD', 'MySQL', 'Oracle', 'PostgreSQL'],
    footer: 'JSON Object → SELECT · INSERT · UPDATE · DELETE',
  },
  {
    category: 'SQL/데이터베이스', href: 'csv-to-insert.html', label: '테이블 → SQL', icon: 'TBL',
    title: '테이블 데이터 → INSERT/UPSERT SQL',
    desc: 'CSV/Excel/Markdown 테이블 데이터를 INSERT/UPSERT SQL로 변환합니다. 드래그 앤 드롭, 구분자 자동 감지, 컬럼 매핑, Preview, Chunk 출력 지원.',
    tags: ['MySQL', 'Oracle', 'PostgreSQL', 'CSV/Excel/Markdown'],
    footer: 'Table Data → INSERT · UPSERT SQL',
  },
  {
    category: 'SQL/데이터베이스', href: 'ddl-crud.html', label: 'DDL → CRUD', icon: 'SQL',
    title: 'DDL → CRUD 생성기',
    desc: 'CREATE TABLE DDL을 입력하면 INSERT, SELECT, UPDATE, DELETE 쿼리를 자동 생성합니다. PK 자동 감지, MyBatis XML 지원.',
    tags: ['MySQL', 'Oracle', 'PostgreSQL', 'MyBatis'],
    footer: 'DDL → INSERT · SELECT · UPDATE · DELETE',
  },
  {
    category: 'SQL/데이터베이스', href: 'sql-erd.html', label: 'SQL → ERD', icon: 'ERD',
    title: 'SQL → ERD 뷰어',
    desc: 'SQL DDL 파일을 업로드하거나 붙여넣으면 테이블 관계도(ERD)를 자동으로 그려줍니다. FK 관계·PK·컬럼 타입 시각화, 드래그 배치, SVG 내보내기 지원.',
    tags: ['ERD', 'FK Relations', 'Schema Viz', 'SVG Export'],
    footer: 'DDL → Entity Relationship Diagram',
  },
  {
    category: 'SQL/데이터베이스', href: 'sql-formatter.html', label: 'SQL 포맷', icon: 'FMT',
    title: 'SQL 포맷터 + 린트',
    desc: 'SQL 구문을 자동 정렬하고 위험 패턴을 빠르게 점검합니다. DELETE/UPDATE without WHERE, SELECT *, DROP/TRUNCATE TABLE 경고를 제공합니다.',
    tags: ['Format', 'Lint', 'MySQL', 'PostgreSQL', 'Oracle'],
    footer: 'SQL → Format · Quick Safety Lint',
  },
  {
    category: 'SQL/데이터베이스', href: 'sql-seeder-generator.html', label: 'SQL 시더', icon: 'SEED',
    title: 'SQL 테스트 데이터 시더 생성기',
    desc: '간단한 테이블 DSL에서 FK 의존 순서를 계산해 다중 테이블 INSERT 시드 데이터를 생성합니다.',
    tags: ['Seed Data', 'FK Order', 'INSERT'],
    footer: 'Schema DSL → Seed INSERT SQL',
  },

  {
    category: '데이터/포맷', href: 'data-converter.html', label: '데이터 변환', icon: 'CVT',
    title: 'JSON ↔ Excel ↔ Markdown 변환기',
    desc: 'JSON, 엑셀(.xlsx/.xls), Markdown 테이블 간 데이터를 상호 변환합니다. 엑셀 출력은 파일 다운로드를 지원합니다.',
    tags: ['JSON', 'Excel', 'Markdown', 'Converter'],
    footer: 'JSON ↔ Excel ↔ Markdown',
  },
  {
    category: '데이터/포맷', href: 'csv-column-profiler.html', label: 'CSV 프로파일', icon: 'PROF',
    title: 'CSV/Excel 컬럼 프로파일러',
    desc: '컬럼별 null 비율, 중복 건수, 타입 추정, 길이 통계를 빠르게 분석합니다.',
    tags: ['CSV', 'Profiling', 'Null', 'Duplicate'],
    footer: 'Column Stats · Type Inference',
  },
  {
    category: '데이터/포맷', href: 'json-formatter.html', label: 'JSON 포맷', icon: 'JSON',
    title: 'JSON 포맷터 / 검증기',
    desc: 'JSON 데이터를 자동 포매팅하고 구문 오류를 감지합니다. 들여쓰기 설정, 미니파이, 문자열 이스케이프 변환을 지원합니다.',
    tags: ['Format', 'Minify', 'Validate', 'Syntax Highlight'],
    footer: 'JSON → Prettify · Minify · Validate',
  },
  {
    category: '데이터/포맷', href: 'html-to-markdown.html', label: 'HTML ↔ MD', icon: 'H2M',
    title: 'HTML ↔ Markdown 변환기',
    desc: 'HTML/Markdown 코드를 입력하거나 파일 업로드하면 양방향으로 변환합니다. heading/list/table/code block 변환을 지원합니다.',
    tags: ['HTML', 'Markdown', 'Converter', 'Bi-directional'],
    footer: 'HTML ↔ Markdown',
  },
  {
    category: '데이터/포맷', href: 'html-tag-analyzer.html', label: 'HTML 태그 분석', icon: 'TAG',
    title: 'HTML 태그 분석기',
    desc: 'HTML 소스 또는 파일을 입력하면 사용된 태그 종류/빈도/비율을 분석합니다.',
    tags: ['HTML', 'Tag', 'Analyzer', 'Stats'],
    footer: 'HTML → Tag Stats',
  },
  {
    category: '데이터/포맷', href: 'html-text-extractor.html', label: 'HTML 텍스트 추출', icon: 'TXT',
    title: 'HTML 표시 텍스트 추출기',
    desc: 'HTML 파일/소스에서 사용자에게 보이는 텍스트만 추출합니다. 숨김 요소(script/style/hidden/aria-hidden)를 제외합니다.',
    tags: ['HTML', 'Text', 'Extractor', 'Visible Text'],
    footer: 'HTML → Visible Text',
  },
  {
    category: '데이터/포맷', href: 'mock-data-generator.html', label: '목업 데이터', icon: 'MOCK',
    title: '목업 데이터 생성기',
    desc: '컬럼 스키마(DSL 또는 SQL DDL)를 기반으로 테스트 데이터를 생성합니다. CSV/JSON/SQL INSERT 출력, seed 기반 재현 가능한 랜덤 데이터 지원.',
    tags: ['CSV', 'JSON', 'SQL INSERT', 'Seeded Random'],
    footer: 'Schema → Mock Data',
  },
  {
    category: '데이터/포맷', href: 'img-to-hex.html', label: '이미지 → HEX', icon: 'HEX',
    title: '이미지 → Hex 변환기',
    desc: '이미지 파일을 Hex Dump, C Array, Python bytes, Base64 형식으로 변환합니다. 드래그 앤 드롭 지원.',
    tags: ['Hex Dump', 'C Array', 'Python', 'Base64'],
    footer: 'Image → Hex Dump · C Array · Python · Base64',
  },
  {
    category: '데이터/포맷', href: 'url-encoder.html', label: 'URL 인코딩', icon: 'URL',
    title: 'URL 인코더 / 디코더',
    desc: 'URL 인코딩·디코딩과 쿼리 파라미터 분석을 지원합니다. encodeURIComponent / encodeURI 모드 선택, 파라미터 파싱 및 JSON 복사 지원.',
    tags: ['Encode', 'Decode', 'Query Params', 'Parse'],
    footer: 'URL → Encode · Decode · Parse',
  },
  {
    category: '이미지', href: 'thumbnail-maker.html', label: '썸네일', icon: 'THMB',
    title: '블로그 썸네일 메이커',
    desc: '블로그 썸네일을 빠르게 제작합니다. 이미지 비율 선택, 배경 단색/이미지, 텍스트 입력 및 PNG 다운로드를 지원합니다.',
    tags: ['Thumbnail', 'Canvas', 'Ratio', 'PNG'],
    footer: 'Text + Background → Thumbnail PNG',
  },
  {
    category: '이미지', href: 'instagram-card-maker.html', label: '인스타 카드뉴스', icon: 'CARD',
    title: '인스타 카드뉴스 메이커',
    desc: '인스타 카드뉴스를 제작합니다. 비율 선택, 배경 단색/이미지, 제목/항목 구성, 다중 페이지 PNG 내보내기를 지원합니다.',
    tags: ['Instagram', 'Card News', 'Canvas', 'Multi Page'],
    footer: 'Card News Template → PNG',
  },
  {
    category: '이미지', href: 'watermark-tool.html', label: '워터마크', icon: 'WM',
    title: '이미지 워터마크 도구',
    desc: '이미지에 텍스트 또는 PNG 워터마크를 넣습니다. 위치, 투명도, 회전, 크기 조절과 PNG/JPG/WEBP 저장을 지원합니다.',
    tags: ['Watermark', 'Text', 'PNG', 'Image Edit'],
    footer: 'Image + Watermark → Export',
  },
  {
    category: '이미지', href: 'table-chart-maker.html', label: '테이블 차트', icon: 'CHRT',
    title: '테이블/JSON → 차트 이미지 메이커',
    desc: 'JSON 배열 또는 테이블 텍스트(CSV/TSV/PIPE/Markdown)를 입력하면 Bar/Line/Pie 차트 이미지를 생성합니다.',
    tags: ['Chart', 'Bar', 'Line', 'Pie', 'JSON', 'CSV'],
    footer: 'Data → Chart Image',
  },

  {
    category: '텍스트/비교', href: 'diff-viewer.html', label: 'Diff 비교', icon: 'DIFF',
    title: '텍스트 / 코드 Diff 뷰어',
    desc: '두 텍스트 또는 JSON을 비교하여 변경된 부분을 한눈에 확인합니다. 추가·삭제·수정 라인 하이라이트와 unified patch 복사를 지원합니다.',
    tags: ['Line Diff', 'JSON Diff', 'Patch Copy', 'Unified View'],
    footer: 'Original vs Modified — diff + patch',
  },

  {
    category: '유틸리티', href: 'data-masker.html', label: '데이터 마스킹', icon: 'MASK',
    title: '데이터 마스킹 (PII 비식별화)',
    desc: '텍스트/JSON 내 이메일, 전화번호, 카드번호, 주민번호 패턴을 감지하여 마스킹합니다.',
    tags: ['PII', 'Masking', 'Security'],
    footer: 'Redact Sensitive Data',
  },
  {
    category: '유틸리티', href: 'cron-builder.html', label: 'Cron 빌더', icon: 'CRON',
    title: 'Cron 빌더 & 해석기',
    desc: 'Linux 5-field cron 식을 빠르게 생성하고 자연어 해석을 제공합니다. 자주 쓰는 프리셋(매 5분, 평일 9시 등)과 복사 버튼 지원.',
    tags: ['Cron', 'Schedule', 'Humanize', 'Preset'],
    footer: 'Cron → Build · Explain',
  },
];
