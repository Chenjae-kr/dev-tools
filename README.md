# Dev Tools

개발 작업을 빠르게 처리하는 웹 기반 유틸리티 모음입니다.
빌드 도구, 패키지 매니저, 인터넷 연결 없이 브라우저에서 바로 실행됩니다.

## 실행 방법

별도의 설치나 빌드가 필요 없습니다.

```bash
# 로컬 서버 실행 (선택 사항)
python -m http.server 8080
# 또는
npx serve .
```

`index.html`을 브라우저에서 열거나, 각 `.html` 파일을 직접 열어도 동작합니다.

> **분리망(오프라인) 환경**: 폰트를 포함한 모든 리소스가 로컬에 번들되어 있어 인터넷 없이도 정상 작동합니다.

---

## 도구 목록

| 도구 | 파일 | 설명 |
|------|------|------|
| **CSV → INSERT** | `tools/csv-to-insert.html` | CSV 파일을 INSERT SQL로 변환. 드래그 앤 드롭, 구분자 자동 감지 |
| **DDL → CRUD** | `tools/ddl-crud.html` | CREATE TABLE DDL → INSERT / SELECT / UPDATE / DELETE 쿼리 자동 생성 |
| **MD → INSERT** | `tools/md-to-insert.html` | 마크다운 테이블 → INSERT SQL 변환 |
| **IMG → HEX** | `tools/img-to-hex.html` | 이미지 파일 → Hex Dump / C Array / Python bytes / Base64 변환 |
| **Diff Viewer** | `tools/diff-viewer.html` | 두 텍스트/코드의 변경 사항을 줄 단위로 비교 |
| **SQL → ERD** | `tools/sql-erd.html` | SQL DDL → ERD(테이블 관계도) 자동 시각화. SVG 내보내기 지원 |
| **JSON Format** | `tools/json-formatter.html` | JSON 포매팅 / 미니파이 / 구문 검증 |

---

## 프로젝트 구조

```
dev-tools/
├── index.html          # 홈 (도구 목록 카드)
├── tools.js            # 도구 레지스트리 (단일 소스)
├── nav.js              # 공통 네비게이션 + 테마
├── styles.css          # 공통 스타일시트
├── fonts/              # 로컬 폰트 (오프라인 지원)
│   ├── jetbrains-mono-latin-*.woff2
│   └── syne-latin-*.woff2
└── tools/
    ├── csv-to-insert.html
    ├── ddl-crud.html
    ├── diff-viewer.html
    ├── img-to-hex.html
    ├── json-formatter.html
    ├── md-to-insert.html
    └── sql-erd.html
```

---

## 새 도구 추가 방법

1. `tools/` 디렉토리에 새 `.html` 파일 생성
2. `<head>`에 `styles.css` 링크
3. `<body>` 첫 스크립트로 `nav.js` 로드 후 `renderNav()` 호출
4. `tools.js`의 `TOOLS` 배열에 항목 등록

기존 도구(`ddl-crud.html`, `md-to-insert.html`)를 패턴 참고용으로 사용하세요.

---

## 아키텍처

### 테마 시스템

- `localStorage` 키: `devtools-theme` (`dark` / `light`)
- `<html>` 엘리먼트의 `data-theme` 속성으로 적용
- CSS 커스텀 프로퍼티(`--bg`, `--text`, `--accent` 등)로 자동 전환

### SQL Dialect 지원

MySQL · Oracle · PostgreSQL · MyBatis 4가지 방언을 `.dialect-btn` 토글로 선택합니다.

### 공통 단축키

| 단축키 | 동작 |
|--------|------|
| `Ctrl + Enter` | 쿼리 / 변환 실행 |

---

## 기술 스택

- **Vanilla HTML / CSS / JavaScript** — 프레임워크 없음
- **폰트**: JetBrains Mono, Syne (로컬 woff2 번들)
- **빌드 도구**: 없음
- **외부 의존성**: 없음 (완전 오프라인 동작)
