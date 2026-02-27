# Instagram Card News Maker — 간편 모드 추가 계획

## 현재 구조 분석

- 좌측 패널: Canvas & Background / Headline & Subtitle / Body / Footer & Paging / Export 등 5개 섹션, 30개 이상의 컨트롤
- 우측 패널: 실시간 Canvas 미리보기
- 상태: `pages[]` 배열로 페이지 관리, `renderCard()`가 모든 그리기 담당

**문제**: 처음 쓰는 사람에겐 옵션이 너무 많음

---

## 구현 방향

기존 `renderCard()` / 페이지 데이터 구조를 **그대로 유지**하고,
간편 모드는 "폼 값을 채워서 `renderCard()`를 호출하는 얇은 레이어"로 구현.

```
간편 모드 필드 ──→ pages[0] 데이터 구조 ──→ renderCard() ──→ Canvas
                   (기존 그대로)
```

---

## 변경 파일

`tools/image/instagram-card-maker.html` 단일 파일만 수정.

---

## UI 구조 변경

### 1. 모드 탭 추가 (패널 상단)

```
┌──────────────────────────────────┐
│  ⚡ 간편 모드   │   ⚙ 고급 모드  │
└──────────────────────────────────┘
```

- `.mode-tab` 버튼 2개
- 클릭 시 `#simplePanel` / `#advancedPanel` 토글
- 간편→고급 전환 시: 간편 모드 값을 기존 advanced 필드에 sync
- 고급→간편 전환 시: advanced 필드 값을 간편 모드 필드에 sync

### 2. 간편 모드 패널 (`#simplePanel`)

섹션 4개로 구성:

```
┌─ CONTENT ──────────────────────────────┐
│  제목 (H1 — 검정)     [textarea 1줄]   │
│  강조 문구 (H2 — 강조색) [textarea 1줄] │
│  소제목               [textarea 1줄]   │
│  본문                 [textarea 4줄]   │
└────────────────────────────────────────┘
┌─ STYLE ────────────────────────────────┐
│  Theme:  [Navy] [Blue] [Green]         │
│  Size:   [1:1]  [4:5]  [9:16]         │
└────────────────────────────────────────┘
┌─ BRANDING (선택) ──────────────────────┐
│  출처:    [____________]  [ON/OFF]     │
│  워터마크: [____________]  [ON/OFF]     │
└────────────────────────────────────────┘
┌─ EXPORT ───────────────────────────────┐
│  Format: [PNG] [JPG] [WEBP]            │
│  [⬇ DOWNLOAD]                         │
└────────────────────────────────────────┘
```

**간편 모드 필드 ID** (기존 필드와 분리, `s-` prefix):
| 간편 ID | 매핑되는 advanced 필드 |
|---------|----------------------|
| `s-title` | `titleText` |
| `s-title2` | `titleText2` |
| `s-subtitle` | `subTitleText` |
| `s-body` | `bodyText` |
| `s-source` | `sourceText` |
| `s-brand` | `brandText` |

테마/사이즈/포맷은 기존 `themeKey`, `sizeKey`, `exportFormat` 변수 공유  
→ 간편 모드 테마 버튼은 advanced 버튼 상태도 함께 업데이트

### 3. 고급 모드 패널 (`#advancedPanel`)

기존 HTML 구조 그대로 `<div id="advancedPanel" class="hidden">` 으로 감싸기.
기존 export 버튼(저장/전체다운)은 고급 모드에만 유지.

---

## 데이터 동기화 로직

### 간편→renderCard 흐름

```js
function syncSimpleToPage() {
  // 간편 모드 필드 → pages[page-1] 직접 쓰기
  const p = pages[page-1];
  p.title    = document.getElementById('s-title').value;
  p.title2   = document.getElementById('s-title2').value;
  p.subtitle = document.getElementById('s-subtitle').value;
  p.bodyType = 'text';
  p.bodyText = document.getElementById('s-body').value;
  p.source   = document.getElementById('s-source').value;
  p.brand    = document.getElementById('s-brand').value;
  // visibility flags
  p.showHeadline = true;
  p.showSubtitle = !!p.subtitle;
  p.showSource   = (simpleSourceVis === 'on');
  p.showBrand    = (simpleBrandVis === 'on');
}
```

### 모드 전환 시 sync

```js
function switchToAdvanced() {
  syncSimpleToPage();
  fillInputsFromPage(); // 기존 함수, advanced 필드 채우기
  simplePanel.classList.add('hidden');
  advancedPanel.classList.remove('hidden');
}

function switchToSimple() {
  savePage(); // 기존 함수, advanced 필드 → pages[] 저장
  // pages[] → 간편 필드 채우기
  const p = current();
  document.getElementById('s-title').value    = p.title || '';
  document.getElementById('s-title2').value   = p.title2 || '';
  document.getElementById('s-subtitle').value = p.subtitle || '';
  document.getElementById('s-body').value     = p.bodyText || '';
  document.getElementById('s-source').value   = p.source || '출처: 관련 자료';
  document.getElementById('s-brand').value    = p.brand || '@instagram';
  advancedPanel.classList.add('hidden');
  simplePanel.classList.remove('hidden');
}
```

---

## CSS 추가

```css
/* 모드 탭 */
.mode-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
}
.mode-tab {
  flex: 1;
  padding: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color .15s, border-color .15s;
}
.mode-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* 간편 모드 전용 textarea */
.simple-textarea {
  width: 100%;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
}
```

---

## 구현 단계

1. **CSS 추가**: `.mode-tabs`, `.mode-tab`, `.simple-textarea` 스타일
2. **HTML 구조**: 기존 panel 내부를 `#simplePanel` + `#advancedPanel`로 분리
3. **간편 모드 폼**: `s-title`, `s-title2`, `s-subtitle`, `s-body`, `s-source`, `s-brand` + 공유 테마/사이즈 버튼
4. **JS 함수 추가**: `syncSimpleToPage()`, `switchToSimple()`, `switchToAdvanced()`
5. **이벤트 바인딩**: 간편 모드 필드 input 이벤트 → `syncSimpleToPage()` + `renderCard()`
6. **초기화**: 페이지 로드 시 간편 모드로 시작

---

## 구현하지 않는 것 (범위 외)

- 간편 모드에서 Table / Image body 타입 지원 → 고급 모드에서만
- 멀티 페이지 관리 → 고급 모드에서만
- 프리셋 저장/불러오기 → 고급 모드에서만
- Body Background 설정 → 고급 모드에서만
