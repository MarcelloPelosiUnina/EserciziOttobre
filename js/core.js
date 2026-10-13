/* =========================================================
   Esercizi di Java — funzioni comuni a tutte le pagine
   (memoria locale, evidenziatore Java, barra superiore)
   ========================================================= */
const App = (() => {
  'use strict';

  /* ---------- memoria locale (resiste anche se bloccata) ---------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignora */ }
    },
    raw(key, value) {
      try {
        if (value === undefined) return localStorage.getItem(key);
        localStorage.setItem(key, value);
      } catch (e) { return null; }
    },
    del(key) {
      try { localStorage.removeItem(key); } catch (e) { /* ignora */ }
    }
  };

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  /* ---------- evidenziatore di sintassi Java ---------- */
  const KW = new Set(['public', 'private', 'protected', 'class', 'new', 'return', 'this',
    'void', 'static', 'if', 'else', 'for', 'while', 'do', 'final', 'switch', 'case',
    'break', 'continue', 'import', 'package']);
  const TYPES = new Set(['byte', 'short', 'int', 'long', 'float', 'double', 'char', 'boolean']);
  const LITS = new Set(['true', 'false', 'null']);
  const TOKEN = /(\/\/.*$)|(\/\*.*?\*\/)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(\b0[xX][0-9a-fA-F_]+[lL]?\b|\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?[lLfFdD]?\b|\.\d+[fFdD]?\b)|([A-Za-z_$][\w$]*)/g;

  function hl(src) {
    let out = '';
    let last = 0;
    let m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      out += esc(src.slice(last, m.index));
      const t = m[0];
      let cls = null;
      if (m[1] || m[2]) cls = 'com';
      else if (m[3]) cls = 'str';
      else if (m[4]) cls = 'chr';
      else if (m[5]) cls = 'num';
      else if (m[6]) {
        if (KW.has(t)) cls = 'kw';
        else if (TYPES.has(t)) cls = 'type';
        else if (LITS.has(t)) cls = 'lit';
        else if (/^[A-Z]/.test(t)) cls = 'cls';
        else if (/^\s*\(/.test(src.slice(TOKEN.lastIndex))) cls = 'fn';
      }
      out += cls ? `<span class="tok-${cls}">${esc(t)}</span>` : esc(t);
      last = TOKEN.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  /* Testo con `codice inline` tra apici inversi → <code> evidenziato */
  const rich = (s) => String(s || '').replace(/`([^`]+)`/g, (_, c) => `<code>${hl(c)}</code>`);

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* Blocco di codice con numeri di riga */
  function renderCode(code, opts = {}) {
    const box = el('div', { class: 'code' + (opts.clickable ? ' clickable' : '') });
    if (opts.title) box.appendChild(el('div', { class: 'code-title', text: opts.title }));
    code.replace(/\n$/, '').split('\n').forEach((line, i) => {
      const row = el('div', { class: 'code-line', 'data-line': i + 1 });
      row.appendChild(el('span', { class: 'ln', text: opts.noNumbers ? '' : String(i + 1) }));
      row.appendChild(el('span', { class: 'src' }, line ? hl(line) : ' '));
      box.appendChild(row);
    });
    return box;
  }

  /* ---------- tema e dimensione del testo ---------- */
  const root = document.documentElement;
  const SCALES = [0.9, 1, 1.15, 1.3, 1.5];

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.raw('jx-theme', next);
  }
  function stepScale(dir) {
    const cur = parseFloat(getComputedStyle(root).getPropertyValue('--scale')) || 1;
    let idx = SCALES.findIndex((s) => Math.abs(s - cur) < 0.01);
    if (idx < 0) idx = 1;
    idx = Math.max(0, Math.min(SCALES.length - 1, idx + dir));
    root.style.setProperty('--scale', SCALES[idx]);
    store.raw('jx-scale', String(SCALES[idx]));
  }

  /* ---------- barra superiore (uguale su tutte le pagine) ---------- */
  const PAGES = [
    { id: 'home', href: 'index.html', label: 'Indice' },
    { id: 'costruttori', href: 'costruttori.html', label: '1. Costruttori' },
    { id: 'tipi', href: 'tipi.html', label: '2. Tipi primitivi' },
    { id: 'finale', href: 'finale.html', label: '3. Esercizio finale' }
  ];

  function chrome() {
    const header = document.querySelector('header.topbar');
    if (!header) return;
    const current = header.dataset.page;
    header.innerHTML = `
      <div class="topbar-inner">
        <a class="brand" href="index.html">Esercizi di Java</a>
        <nav class="nav" aria-label="Sezioni">
          ${PAGES.map((p) => `<a href="${p.href}"${p.id === current ? ' aria-current="page"' : ''}>${p.label}</a>`).join('')}
        </nav>
        <div class="tools"></div>
      </div>`;
    const tools = header.querySelector('.tools');
    const mk = (label, title, fn) => {
      const b = el('button', { class: 'icon-btn', type: 'button', title, 'aria-label': title }, label);
      b.addEventListener('click', fn);
      tools.appendChild(b);
    };
    mk('A−', 'Riduci il testo', () => stepScale(-1));
    mk('A+', 'Ingrandisci il testo', () => stepScale(1));
    mk('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
      'Tema chiaro/scuro', toggleTheme);
  }

  /* <pre data-java> scritti nell'HTML → blocchi evidenziati */
  function upgradeCode() {
    document.querySelectorAll('pre[data-java]').forEach((pre) => {
      pre.replaceWith(renderCode(pre.textContent.replace(/^\n/, ''), { title: pre.dataset.title }));
    });
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('DOMContentLoaded', () => { chrome(); upgradeCode(); });

  return { store, esc, hl, rich, el, renderCode, shuffle };
})();
