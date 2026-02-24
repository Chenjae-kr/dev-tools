/* Shared UI helpers for Dev Tools */
(function () {
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function showError(targetElOrId, message) {
    const el = typeof targetElOrId === 'string'
      ? document.getElementById(targetElOrId)
      : targetElOrId;
    if (!el) return;
    el.innerHTML = `<div class="error-msg">❌ ${escHtml(message)}</div>`;
  }

  function copyTextWithFeedback(text, btnEl, defaultLabel = 'COPY', copiedLabel = '✓ COPIED', ms = 1400) {
    return navigator.clipboard.writeText(String(text ?? '')).then(() => {
      if (!btnEl) return;
      const prev = defaultLabel || btnEl.textContent;
      btnEl.textContent = copiedLabel;
      btnEl.classList.add('copied');
      setTimeout(() => {
        btnEl.textContent = prev;
        btnEl.classList.remove('copied');
      }, ms);
    });
  }

  function copyElementText(id, btnId, defaultLabel = 'COPY') {
    const el = document.getElementById(id);
    const btn = btnId ? document.getElementById(btnId) : null;
    if (!el) return Promise.resolve();
    return copyTextWithFeedback(el.innerText || el.textContent || '', btn, defaultLabel);
  }

  function renderSqlBlock({
    badge = 'SQL',
    tag = '',
    copyBtnId = '',
    copyLabel = 'COPY',
    copyHandler = '',
    extraHeaderHtml = '',
    bodyHtml = '',
  } = {}) {
    const copyBtn = copyBtnId && copyHandler
      ? `<button class="copy-btn" id="${escHtml(copyBtnId)}" onclick="${copyHandler}">${escHtml(copyLabel)}</button>`
      : '';

    return `
      <div class="panel sql-block">
        <div class="sql-block-header">
          <span class="sql-type-badge badge-insert">${escHtml(badge)}</span>
          <span class="sql-dialect-tag">${escHtml(tag)}</span>
          ${copyBtn}
          ${extraHeaderHtml}
        </div>
        ${bodyHtml}
      </div>`;
  }

  window.UIUtils = {
    escHtml,
    showError,
    copyTextWithFeedback,
    copyElementText,
    renderSqlBlock,
  };
})();
