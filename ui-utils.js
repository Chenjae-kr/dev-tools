/* Shared UI helpers for Dev Tools */
(function () {
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderResultMessage(kind = 'error', message = '') {
    const icon = kind === 'success' ? '✅' : kind === 'info' ? 'ℹ️' : '⚠️';
    const cls = `result-msg ${kind}`;
    return `<div class="${cls}"><span class="result-msg-icon">${icon}</span><span class="result-msg-text">${escHtml(message)}</span></div>`;
  }

  function showError(targetElOrId, message) {
    const el = typeof targetElOrId === 'string'
      ? document.getElementById(targetElOrId)
      : targetElOrId;
    if (!el) return;
    el.innerHTML = renderResultMessage('error', message);
  }

  function showSuccess(targetElOrId, message) {
    const el = typeof targetElOrId === 'string'
      ? document.getElementById(targetElOrId)
      : targetElOrId;
    if (!el) return;
    el.innerHTML = renderResultMessage('success', message);
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

  function bindToggleGroup(selector, { activeClass = 'active', onChange } = {}) {
    const buttons = [...document.querySelectorAll(selector)];
    function setActive(btn) {
      buttons.forEach(b => b.classList.remove(activeClass));
      btn.classList.add(activeClass);
      if (typeof onChange === 'function') onChange(btn);
    }
    buttons.forEach(btn => btn.addEventListener('click', () => setActive(btn)));
    return {
      buttons,
      get active() { return buttons.find(b => b.classList.contains(activeClass)); },
      setBy(predicate) { const target = buttons.find(predicate); if (target) setActive(target); },
    };
  }

  function wireTextFileInput(inputId, onLoad, encoding = 'utf-8') {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => onLoad && onLoad(ev.target.result || '', file);
      reader.readAsText(file, encoding);
    });
  }

  function downloadTextFile(text, filename = 'output.txt', mime = 'text/plain;charset=utf-8') {
    const blob = new Blob([String(text ?? '')], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function resetFields(defaults = {}, afterReset) {
    Object.entries(defaults).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.type === 'checkbox') el.checked = !!val;
      else el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    if (typeof afterReset === 'function') afterReset();
  }

  window.UIUtils = {
    escHtml,
    showError,
    copyTextWithFeedback,
    copyElementText,
    renderSqlBlock,
    bindToggleGroup,
    wireTextFileInput,
    downloadTextFile,
    resetFields,
    renderResultMessage,
    showSuccess,
  };
})();
