/* ═══════════════════════════════════════════════════════════
   Dev Tools — Tool Registry
   Single source of truth for all tools.
   Used by nav.js (navigation) and index.html (tool cards).
   ═══════════════════════════════════════════════════════════ */

const TOOLS = [
  {
    href:   'ddl-crud.html',
    label:  'DDL → CRUD',
    icon:   'SQL',
    title:  'DDL → CRUD Generator',
    desc:   'CREATE TABLE DDL을 입력하면 INSERT, SELECT, UPDATE, DELETE 쿼리를 자동 생성합니다. PK 자동 감지, MyBatis XML 지원.',
    tags:   ['MySQL', 'Oracle', 'PostgreSQL', 'MyBatis'],
    footer: 'DDL → INSERT · SELECT · UPDATE · DELETE',
  },
  {
    href:   'md-to-insert.html',
    label:  'MD → INSERT',
    icon:   'MD',
    title:  'Markdown → INSERT SQL',
    desc:   '마크다운 테이블 형식을 INSERT SQL 쿼리로 변환합니다. 숫자·불리언·NULL 타입 자동 감지, Individual / Bulk 모드 선택 지원.',
    tags:   ['MySQL', 'Oracle', 'PostgreSQL', 'Bulk INSERT'],
    footer: 'Markdown Table → INSERT',
  },
];
