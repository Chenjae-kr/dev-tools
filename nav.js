/* ═══════════════════════════════════════════════════════════
   Dev Tools — Shared Navigation
   ═══════════════════════════════════════════════════════════ */

// ─── Theme init (runs immediately to prevent flash) ──────
(function () {
  const t = localStorage.getItem('devtools-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

// ─── Render nav at current script position ───────────────
function renderNav() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop() || 'index.html';
  // Detect if current page is inside the tools/ subdirectory
  const pathParts = pathname.split('/').filter(Boolean);
  const inTools   = pathParts.length >= 2 && pathParts[pathParts.length - 2] === 'tools';

  const items = TOOLS.map(item => {
    const active = filename === item.href ? ' active' : '';
    // Compute correct relative href based on current location
    const href   = inTools ? item.href : 'tools/' + item.href;
    return `<a class="nav-item${active}" href="${href}"><span class="nav-item-dot"></span>${item.label}</a>`;
  }).join('');

  const brandHref = inTools ? '../index.html' : 'index.html';

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

// ─── Output Wrap Toggle (global, used by all tool pages) ─
function toggleWrap(id) {
  const el  = document.getElementById(id);
  const btn = document.getElementById('wrap_' + id);
  if (!el) return;
  el.classList.toggle('wrapped');
  if (btn) btn.classList.toggle('active');
}

// ─── Mobile: scroll to output after generate ─────────────
function scrollToOutput(outputEl) {
  if (window.innerWidth <= 900) {
    setTimeout(() => outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

// ─── Init after DOM ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  updateThemeIcon();

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
  });

  // Close mobile menu on resize to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when a nav item is clicked
  const navTools = document.getElementById('navTools');
  if (navTools) {
    navTools.addEventListener('click', function (e) {
      if (e.target.closest('.nav-item')) {
        closeMobileMenu();
      }
    });
  }
});
