/* ═══════════════════════════════════════════════════════════
   Dev Tools — Tool Registry
   Single source of truth for all tools.
   Used by nav.js (navigation) and index.html (tool cards).
   hrefs are bare filenames (no path prefix).
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
  {
    href:   'img-to-hex.html',
    label:  'IMG → HEX',
    icon:   'HEX',
    title:  'Image → Hex Converter',
    desc:   '이미지 파일을 Hex Dump, C Array, Python bytes, Base64 형식으로 변환합니다. 드래그 앤 드롭 지원.',
    tags:   ['Hex Dump', 'C Array', 'Python', 'Base64'],
    footer: 'Image → Hex Dump · C Array · Python · Base64',
  },
  {
    href:   'diff-viewer.html',
    label:  'Diff Viewer',
    icon:   'DIFF',
    title:  'Text / Code Diff Viewer',
    desc:   '두 텍스트 또는 소스 코드를 비교하여 변경된 부분을 한눈에 확인합니다. 추가·삭제·수정 라인을 색상으로 구분합니다.',
    tags:   ['Line Diff', 'Code Compare', 'Unified View'],
    footer: 'Original vs Modified — line-by-line diff',
  },
  {
    href:   'json-formatter.html',
    label:  'JSON Format',
    icon:   'JSON',
    title:  'JSON Formatter / Validator',
    desc:   'JSON 데이터를 자동 포매팅하고 구문 오류를 감지합니다. 들여쓰기 설정, 미니파이, 문자열 이스케이프 변환을 지원합니다.',
    tags:   ['Format', 'Minify', 'Validate', 'Syntax Highlight'],
    footer: 'JSON → Prettify · Minify · Validate',
  },
];
