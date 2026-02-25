/* ═══════════════════════════════════════════════════════════
   Dev Tools — Shared Navigation
   ═══════════════════════════════════════════════════════════ */

// ─── Theme init (runs immediately to prevent flash) ──────
(function () {
  const root = document.documentElement;
  const t = localStorage.getItem('devtools-theme');
  root.setAttribute('data-theme', t || 'light');

  const mq = window.matchMedia('(max-width: 768px)');
  const syncViewportClass = () => {
    const isMobile = mq.matches;
    root.classList.toggle('is-mobile', isMobile);
    root.classList.toggle('is-desktop', !isMobile);
  };
  syncViewportClass();
  if (mq.addEventListener) mq.addEventListener('change', syncViewportClass);
  else window.addEventListener('resize', syncViewportClass);
})();

// ─── Render nav at current script position ───────────────
function getRouteInfo() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop() || 'index.html';
  const toolsIdx = pathname.indexOf('/tools/');
  const inTools = toolsIdx !== -1;
  const appBase = inTools ? pathname.slice(0, toolsIdx) : '';
  const toolsRoot = inTools ? `${appBase}/tools/` : 'tools/';
  const currentToolPath = inTools ? pathname.slice(toolsIdx + '/tools/'.length) : filename;
  return { pathname, filename, inTools, appBase, toolsRoot, currentToolPath };
}

function renderNav() {
  const { pathname, filename, inTools, appBase, toolsRoot, currentToolPath } = getRouteInfo();

  const categories = (typeof TOOL_CATEGORIES !== 'undefined' && TOOL_CATEGORIES.length)
    ? TOOL_CATEGORIES
    : [...new Set(TOOLS.map(t => t.category || 'Other'))];

  const items = categories.map((cat, idx) => {
    const grouped = TOOLS.filter(t => (t.category || 'Other') === cat);
    if (!grouped.length) return '';

    const links = grouped.map(item => {
      const active = currentToolPath === item.href ? ' active' : '';
      const href = inTools ? `${toolsRoot}${item.href}` : `tools/${item.href}`;
      return `<a class="nav-item${active}" href="${href}"><span class="nav-item-dot"></span>${item.title || item.label}</a>`;
    }).join('');

    const hasActive = grouped.some(item => currentToolPath === item.href);
    return `
      <div class="nav-menu${hasActive ? ' open' : ''}" data-menu="${idx}">
        <button class="nav-menu-btn" onclick="toggleNavGroup(${idx})" aria-expanded="${hasActive ? 'true' : 'false'}">${cat}<span class="nav-caret">▾</span></button>
        <div class="nav-submenu">${links}</div>
      </div>`;
  }).join('');

  const brandHref = inTools ? `${appBase}/index.html` : 'index.html';

  document.write(`
<nav class="topnav">
  <div class="nav-inner container">
    <a class="nav-brand" href="${brandHref}">
      <div class="nav-logo">DEV</div>
      <span class="nav-brand-name">Dev<em>Tools</em></span>
    </a>
    <div class="nav-tools" id="navTools">${items}</div>
    <div class="nav-actions">
      <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()" title="메뉴 열기" aria-label="메뉴 열기" aria-expanded="false">
        <span class="mobile-menu-icon"></span>
      </button>
      <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" title="다크/라이트 모드 전환">☀</button>
      <div class="kebab-wrap">
        <button class="kebab-btn" id="kebabBtn" onclick="toggleKebab()" title="바로가기">⋮</button>
        <div class="kebab-dropdown" id="kebabDropdown">
          <span class="kebab-section-label">AI 바로가기</span>
          <a class="kebab-link" href="https://gemini.google.com/" target="_blank" rel="noopener"><span class="kebab-link-icon">✦</span>Gemini</a>
          <a class="kebab-link" href="https://chatgpt.com/" target="_blank" rel="noopener"><span class="kebab-link-icon">⊕</span>ChatGPT</a>
          <a class="kebab-link" href="https://claude.ai/" target="_blank" rel="noopener"><span class="kebab-link-icon">◈</span>Claude</a>
        </div>
      </div>
    </div>
  </div>
</nav>`);
}

// ─── Theme ───────────────────────────────────────────────
function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = isDark ? '☀' : '🌙';
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('devtools-theme', next);
  updateThemeIcon();
}

// ─── Kebab ───────────────────────────────────────────────
function toggleKebab() {
  document.getElementById('kebabDropdown').classList.toggle('open');
}

// ─── Mobile Menu ─────────────────────────────────────────
function toggleMobileMenu() {
  const nav = document.querySelector('.topnav');
  const btn = document.getElementById('mobileMenuBtn');
  const isOpen = nav.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  btn.setAttribute('title', isOpen ? '메뉴 닫기' : '메뉴 열기');
  // Close kebab if open
  document.getElementById('kebabDropdown').classList.remove('open');
}

function closeMobileMenu() {
  const nav = document.querySelector('.topnav');
  const btn = document.getElementById('mobileMenuBtn');
  if (nav) nav.classList.remove('nav-open');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('title', '메뉴 열기');
  }
}

// ─── Output helpers (global) ─────────────────────────────
function toggleWrap(id) {
  const el = document.getElementById(id);
  const btn = document.getElementById('wrap_' + id);
  if (!el) return;
  el.classList.toggle('wrapped');
  if (btn) btn.classList.toggle('active');
}

function scrollToOutput(outputEl) {
  if (!outputEl) return;
  if (window.innerWidth <= 900) {
    setTimeout(() => outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

function closeAllNavMenus() {
  document.querySelectorAll('.nav-menu').forEach(m => {
    m.classList.remove('open');
    const b = m.querySelector('.nav-menu-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
}

function toggleNavGroup(idx) {
  // Desktop: hover-only dropdown (no sticky open on click)
  if (window.innerWidth > 768) return;

  const menu = document.querySelector(`.nav-menu[data-menu="${idx}"]`);
  if (!menu) return;

  const willOpen = !menu.classList.contains('open');
  closeAllNavMenus();

  if (willOpen) {
    menu.classList.add('open');
    const btn = menu.querySelector('.nav-menu-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

function syncToolHeaderFromRegistry() {
  if (!Array.isArray(window.TOOLS)) return false;
  const { inTools, currentToolPath } = getRouteInfo();
  if (!inTools) return true;

  const meta = window.TOOLS.find(t => t.href === currentToolPath);
  if (!meta) return true;

  const header = document.querySelector('.tool-header');
  if (!header) return false;

  const h1 = header.querySelector('h1');
  const p = header.querySelector('p');
  const titleText = meta.title || meta.label || h1?.textContent || '';
  if (h1) h1.textContent = titleText;
  if (p) p.textContent = `// ${meta.desc || ''}`;

  const footerEl = document.querySelector('footer');
  if (footerEl && meta.footer) footerEl.textContent = `// ${meta.footer}`;

  if (titleText) document.title = `${titleText} | Dev Tools`;
  return true;
}

function ensureToolHeaderSync(maxRetry = 20, intervalMs = 80) {
  let n = 0;
  const timer = setInterval(() => {
    n += 1;
    if (syncToolHeaderFromRegistry() || n >= maxRetry) clearInterval(timer);
  }, intervalMs);
}

function initAdvancedSettingsCollapse() {
  const { inTools } = getRouteInfo();
  if (!inTools) return;

  const groups = [...document.querySelectorAll('.panel .setting-group')];
  if (groups.length < 2) return;

  const basicTitleHints = ['source', 'input', '기본', 'basic', 'convert', 'render', 'export', 'file'];

  const basicGroups = [];
  const advancedGroups = [];

  groups.forEach((g, idx) => {
    const titleEl = g.querySelector('.setting-title');
    const t = (titleEl?.textContent || '').trim().toLowerCase();

    const explicitBasic = g.dataset.level === 'basic';
    const explicitAdvanced = g.dataset.level === 'advanced';
    const hintedBasic = basicTitleHints.some(h => t.includes(h));

    if (explicitAdvanced) advancedGroups.push(g);
    else if (explicitBasic || hintedBasic) basicGroups.push(g);
    else advancedGroups.push(g);

    // 최소 1개는 basic으로 보장
    if (idx === 0 && !basicGroups.includes(g) && !explicitAdvanced) {
      basicGroups.push(g);
      const i = advancedGroups.indexOf(g);
      if (i >= 0) advancedGroups.splice(i, 1);
    }
  });

  if (!advancedGroups.length) return;

  advancedGroups.forEach((g) => {
    g.classList.add('is-advanced');
    g.classList.add('collapsed');

    const title = g.querySelector('.setting-title');
    if (!title || title.dataset.collapseBound === '1') return;
    title.dataset.collapseBound = '1';
    title.addEventListener('click', () => {
      g.classList.toggle('collapsed');
    });
  });

  document.querySelector('.settings-mode-bar')?.remove();

  let btn = document.getElementById('settingsModeToggle');
  if (!btn) {
    const firstPanel = document.querySelector('.main-grid .panel');
    const header = firstPanel?.querySelector('.panel-header');
    const title = header?.querySelector('.panel-title');
    if (!header || !title) return;

    let actions = header.querySelector('.panel-header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'panel-header-actions';
      [...header.children].forEach((child) => {
        if (child !== title) actions.appendChild(child);
      });
      header.appendChild(actions);
    }

    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'settingsModeToggle';
    btn.className = 'sample-btn settings-mode-toggle';
    btn.textContent = '고급 기능 펼치기';
    actions.appendChild(btn);
  }

  if (btn.dataset.boundCollapse !== '1') {
    btn.dataset.boundCollapse = '1';
    btn.addEventListener('click', () => {
      const expand = !btn.classList.contains('active');
      document.querySelectorAll('.setting-group.is-advanced').forEach(g => g.classList.toggle('collapsed', !expand));
      btn.classList.toggle('active', expand);
      btn.textContent = expand ? '고급 기능 접기' : '고급 기능 펼치기';
    });
  }
}

// ─── Init after DOM ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  updateThemeIcon();
  ensureToolHeaderSync();
  initAdvancedSettingsCollapse();

  document.addEventListener('click', function (e) {
    // Close kebab when clicking outside
    const wrap = document.querySelector('.kebab-wrap');
    const dropdown = document.getElementById('kebabDropdown');
    if (wrap && dropdown && !wrap.contains(e.target)) {
      dropdown.classList.remove('open');
    }

    // Close mobile menu when clicking outside topnav
    const nav = document.querySelector('.topnav');
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (nav && nav.classList.contains('nav-open') && !nav.contains(e.target)) {
      closeMobileMenu();
    }

    // Close desktop dropdown when clicking outside nav menus
    if (!e.target.closest('.nav-menu')) {
      closeAllNavMenus();
    }
  });

  // Close mobile menu on resize to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // On desktop: auto-close dropdown when pointer leaves top nav
  const topnav = document.querySelector('.topnav');
  if (topnav) {
    let closeTimer = null;

    topnav.addEventListener('mouseleave', function () {
      if (window.innerWidth <= 768) return;
      closeTimer = setTimeout(() => closeAllNavMenus(), 420);
    });

    topnav.addEventListener('mouseenter', function () {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    });
  }

  // Close mobile menu when a nav item is clicked
  const navTools = document.getElementById('navTools');
  if (navTools) {
    navTools.addEventListener('click', function (e) {
      if (e.target.closest('.nav-item')) {
        closeMobileMenu();
      }
    });
  }

  // Global back-to-top button
  if (!document.querySelector('.to-top-btn')) {
    const btn = document.createElement('button');
    btn.className = 'to-top-btn';
    btn.type = 'button';
    btn.title = '맨 위로';
    btn.setAttribute('aria-label', '맨 위로');
    btn.textContent = '↑';
    document.body.appendChild(btn);

    const sync = () => btn.classList.toggle('show', window.scrollY > 280);
    window.addEventListener('scroll', sync, { passive: true });
    sync();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

if (document.readyState !== 'loading') {
  ensureToolHeaderSync();
  initAdvancedSettingsCollapse();
}
