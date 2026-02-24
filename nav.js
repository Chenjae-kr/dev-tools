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
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const items = TOOLS.map(item => {
    const active = page === item.href ? ' active' : '';
    return `<a class="nav-item${active}" href="${item.href}"><span class="nav-item-dot"></span>${item.label}</a>`;
  }).join('');

  document.write(`
<nav class="topnav">
  <div class="nav-inner container">
    <a class="nav-brand" href="index.html">
      <div class="nav-logo">DEV</div>
      <span class="nav-brand-name">Dev<em>Tools</em></span>
    </a>
    <div class="nav-tools">${items}</div>
    <div class="nav-actions">
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

// ─── Init after DOM ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  updateThemeIcon();
  document.addEventListener('click', function (e) {
    const wrap = document.querySelector('.kebab-wrap');
    const dropdown = document.getElementById('kebabDropdown');
    if (wrap && dropdown && !wrap.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});
