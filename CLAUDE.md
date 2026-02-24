# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A collection of browser-based developer utility tools built with vanilla HTML/CSS/JavaScript — no build process, no package manager, no dependencies. Files are served directly from disk or a static server.

## Development

No build or install steps required. Open any `.html` file directly in a browser.

To serve locally (optional):
```bash
python -m http.server 8080
# or
npx serve .
```

## Architecture

### File Structure

Each tool is a self-contained `.html` file. Shared logic lives in two files:

- **`nav.js`** — Loaded on every page. Handles theme init (prevents flash), injects navigation via `renderNav()`, and manages the AI shortcuts dropdown. Must be loaded early in `<body>` to prevent theme flash.
- **`styles.css`** — Global stylesheet (~1000 lines). All pages share this; do not add page-specific styles inline if they belong in a component class here.

### Adding a New Tool Page

Follow the pattern of `ddl-crud.html` or `md-to-insert.html`:

1. Create a new `.html` file in the root.
2. Link `styles.css` in `<head>`.
3. Load `nav.js` as the first script in `<body>` (theme init happens here).
4. Register the tool in `NAV_ITEMS` array inside `nav.js`.
5. Use the two-panel layout: `.options-bar` (left) + `.sql-block`/output (right).

### Theme System

- Theme stored in `localStorage` as key `devtools-theme` (values: `dark` / `light`).
- Applied as `data-theme` attribute on `<html>`.
- CSS custom properties switch automatically via `[data-theme="light"]` selector overrides in `styles.css`.
- **Do not hard-code colors** — always use CSS variables (`--bg`, `--text`, `--accent`, etc.).

Key color variables:
```
--bg, --surface, --surface2   Background layers
--border                       Borders
--accent (#4fffb0 green)       Primary actions
--accent2 (#7c6aff purple)     Secondary
--accent3 (#ff6a6a red)        Destructive/error
--text, --text-dim, --text-muted  Text hierarchy
```

### SQL Dialect Support Pattern

Tools that generate SQL support 4 dialects via `.dialect-btn` toggles: `mysql`, `oracle`, `postgresql`, `mybatis`. Store selected dialect in a JS variable and use a `switch` or `if/else` per dialect in the generation function.

### Navigation Active State

`nav.js` auto-detects the active page using `window.location.pathname.split('/').pop()` compared against each item's `href` in `NAV_ITEMS`. New pages are automatically highlighted when added to `NAV_ITEMS`.

### UI Patterns in Use

- **Copy buttons** — `.copy-btn` class, uses `navigator.clipboard.writeText()`
- **Generate trigger** — Primary button + `Ctrl+Enter` keyboard shortcut
- **Error display** — Inject into `.sql-code` or a dedicated error element with red styling
- **Responsive breakpoint** — Two-column grid collapses to single column below 900px (`@media (max-width: 900px)`)
