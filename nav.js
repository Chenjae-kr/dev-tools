/* ═══════════════════════════════════════════════════════════
   Dev Tools — Shared Navigation
   ═══════════════════════════════════════════════════════════ */

// ─── Theme init (runs immediately to prevent flash) ──────
(function () {
  const t = localStorage.getItem('devtools-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
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
  if (h1) h1.textContent = meta.title || meta.label || h1.textContent;
  if (p) p.textContent = `// ${meta.desc || ''}`;
  return true;
}

function ensureToolHeaderSync(maxRetry = 20, intervalMs = 80) {
  let n = 0;
  const timer = setInterval(() => {
    n += 1;
    if (syncToolHeaderFromRegistry() || n >= maxRetry) clearInterval(timer);
  }, intervalMs);
}

// ─── Init after DOM ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  updateThemeIcon();
  ensureToolHeaderSync();

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
}
