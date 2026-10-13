/* =========================================================
   Java Lab — motore degli esercizi
   Tipi supportati: quiz, truefalse, classify, output, bug, fill, order
   ========================================================= */
const Engine = (() => {
  'use strict';
  const { el, rich, hl, renderCode, store, shuffle } = App;

  const TYPE_LABEL = {
    quiz: 'Scelta multipla',
    truefalse: 'Vero o falso',
    classify: 'Classifica',
    output: 'Cosa stampa?',
    bug: "Trova l'errore",
    fill: 'Completa il codice',
    order: 'Riordina il codice'
  };

  const asArray = (v) => (Array.isArray(v) ? v : [v]);
  const norm = (s) => s.trim().replace(/\s+/g, ' ');

  /* ---------- gestori dei singoli tipi ---------- */
  const handlers = {

    quiz(ex, body) {
      let sel = -1;
      const wrap = el('div', { class: 'options', role: 'radiogroup' });
      const btns = ex.options.map((o, i) => {
        const b = el('button', { class: 'option', type: 'button', role: 'radio', 'aria-checked': 'false' },
          `<span class="letter">${'ABCDEFG'[i]}</span><span>${rich(o)}</span>`);
        b.addEventListener('click', () => {
          sel = i;
          btns.forEach((x, j) => {
            x.classList.toggle('sel', j === i);
            x.setAttribute('aria-checked', j === i ? 'true' : 'false');
            x.classList.remove('is-ok', 'is-bad');
          });
        });
        wrap.appendChild(b);
        return b;
      });
      body.appendChild(wrap);
      return {
        check() {
          if (sel < 0) return { empty: true, msg: 'Scegli una risposta.' };
          const ok = sel === ex.answer;
          btns[sel].classList.add(ok ? 'is-ok' : 'is-bad');
          return { ok, msg: !ok && ex.why && ex.why[sel] ? rich(ex.why[sel]) : null };
        },
        reveal() {
          btns.forEach((b, j) => {
            b.classList.remove('sel', 'is-bad');
            b.classList.toggle('is-ok', j === ex.answer);
          });
        },
        lock() { btns.forEach((b) => { b.disabled = true; }); }
      };
    },

    truefalse(ex, body) {
      return handlers.classify({ ...ex, buckets: ['Vero', 'Falso'], items: ex.items.map((it) => ({ ...it, bucket: it.answer ? 0 : 1 })) }, body);
    },

    classify(ex, body) {
      const wide = ex.buckets.length > 3 || ex.buckets.some((b) => b.length > 16);
      const rows = el('div', { class: 'rows' + (wide ? ' wide' : '') });
      const items = ex.items.map((it) => {
        const row = el('div', { class: 'row' });
        row.innerHTML = `<div class="row-text">${rich(it.text)}</div>
          <div class="seg" role="group">${ex.buckets.map((b, i) => `<button type="button" data-i="${i}">${rich(b)}</button>`).join('')}</div>
          <div class="row-why"></div>`;
        const o = { it, row, val: null, bs: [...row.querySelectorAll('.seg button')] };
        o.bs.forEach((b) => b.addEventListener('click', () => {
          o.val = +b.dataset.i;
          o.bs.forEach((x) => x.classList.toggle('sel', x === b));
          row.classList.remove('is-ok', 'is-bad');
        }));
        rows.appendChild(row);
        return o;
      });
      body.appendChild(rows);
      const right = (o) => asArray(o.it.bucket).includes(o.val);
      return {
        check() {
          const missing = items.filter((o) => o.val === null).length;
          if (missing) return { empty: true, msg: `Rispondi a tutte le righe (ne mancano ${missing}).` };
          let good = 0;
          items.forEach((o) => {
            const ok = right(o);
            if (ok) good++;
            o.row.classList.toggle('is-ok', ok);
            o.row.classList.toggle('is-bad', !ok);
          });
          return { ok: good === items.length, msg: `${good} su ${items.length} corrette: sistema quelle in rosso.` };
        },
        reveal(fromSuccess) {
          items.forEach((o) => {
            const ans = asArray(o.it.bucket);
            if (!fromSuccess || !right(o)) o.val = ans[0];
            o.bs.forEach((b, i) => {
              b.classList.toggle('sel', i === o.val);
              b.classList.toggle('right-answer', ans.includes(i) && i !== o.val);
            });
            o.row.classList.remove('is-bad');
            o.row.classList.add('is-ok');
            if (o.it.why) o.row.querySelector('.row-why').innerHTML = rich(o.it.why);
          });
        },
        lock() { items.forEach((o) => o.bs.forEach((b) => { b.disabled = true; })); }
      };
    },

    output(ex, body, api) {
      const expected = ex.answer.replace(/\n$/, '');
      const lines = expected.split('\n').length;
      const con = el('div', { class: 'console' });
      con.innerHTML = '<div class="console-head">Output del programma</div>';
      const ta = el('textarea', {
        rows: Math.max(2, lines + 1), spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off',
        'aria-label': 'Output previsto', placeholder: 'Una riga per ogni println… (Ctrl+Invio per verificare)'
      });
      ta.addEventListener('input', () => con.classList.remove('is-ok', 'is-bad'));
      ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) api.submit(); });
      con.appendChild(ta);
      body.appendChild(con);
      const toLines = (s) => s.replace(/\r/g, '').split('\n').map((l) => l.trim()).filter((l) => l !== '');
      const want = toLines(expected);
      const accepted = [want, ...(ex.accept || []).map(toLines)];
      return {
        check() {
          const got = toLines(ta.value);
          if (!got.length) return { empty: true, msg: 'Scrivi l\'output prima di verificare.' };
          const ok = accepted.some((a) => a.length === got.length && a.every((l, i) => l === got[i]));
          con.classList.toggle('is-ok', ok);
          con.classList.toggle('is-bad', !ok);
          if (ok) return { ok };
          if (got.length !== want.length) {
            return { ok, msg: `Il programma stampa ${want.length} ${want.length === 1 ? 'riga' : 'righe'}, tu ne hai scritte ${got.length}.` };
          }
          const k = want.findIndex((l, i) => l !== got[i]);
          return { ok, msg: `La riga ${k + 1} dell'output non è corretta.` };
        },
        reveal(fromSuccess) {
          if (!fromSuccess && !ta.value.trim()) ta.value = expected;
          con.classList.remove('is-bad');
          con.classList.add('is-ok');
          if (!fromSuccess && !con.querySelector('.expected')) {
            con.appendChild(el('div', { class: 'expected', text: expected }));
          }
        },
        lock() { ta.readOnly = true; }
      };
    },

    bug(ex, body) {
      const code = renderCode(ex.code, { clickable: true });
      const lines = [...code.querySelectorAll('.code-line')];
      const bugs = new Set(ex.bugs);
      const sel = new Set();
      let locked = false;
      lines.forEach((l) => {
        const n = +l.dataset.line;
        l.tabIndex = 0;
        l.setAttribute('role', 'button');
        l.setAttribute('aria-pressed', 'false');
        const toggle = () => {
          if (locked) return;
          if (sel.has(n)) sel.delete(n); else sel.add(n);
          l.classList.toggle('sel', sel.has(n));
          l.setAttribute('aria-pressed', String(sel.has(n)));
          lines.forEach((x) => x.classList.remove('is-ok', 'is-bad'));
        };
        l.addEventListener('click', toggle);
        l.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      });
      body.appendChild(code);
      return {
        check() {
          if (!sel.size) return { empty: true, msg: 'Clicca sulle righe che contengono un errore.' };
          let found = 0;
          lines.forEach((l) => {
            const n = +l.dataset.line;
            l.classList.remove('is-ok', 'is-bad');
            if (sel.has(n)) {
              l.classList.add(bugs.has(n) ? 'is-ok' : 'is-bad');
              if (bugs.has(n)) found++;
            }
          });
          const extra = sel.size - found;
          const ok = found === bugs.size && extra === 0;
          let msg = `Righe con errore trovate: ${found} su ${bugs.size}.`;
          if (extra) msg += ` ${extra === 1 ? 'Una riga selezionata è corretta' : extra + ' righe selezionate sono corrette'} (in rosso).`;
          return { ok, msg };
        },
        reveal() {
          lines.forEach((l) => {
            const n = +l.dataset.line;
            l.classList.remove('sel', 'is-bad');
            l.classList.toggle('is-ok', bugs.has(n));
            const note = ex.notes && ex.notes[n];
            if (note && !(l.nextElementSibling && l.nextElementSibling.classList.contains('code-note'))) {
              l.after(el('div', { class: 'code-note' }, rich(note)));
            }
          });
        },
        lock() {
          locked = true;
          code.classList.add('locked');
          lines.forEach((l) => { l.tabIndex = -1; l.removeAttribute('role'); });
        }
      };
    },

    fill(ex, body, api) {
      const box = el('div', { class: 'code' });
      const answers = [];
      ex.code.replace(/\n$/, '').split('\n').forEach((line, i) => {
        const row = el('div', { class: 'code-line' });
        row.appendChild(el('span', { class: 'ln', text: String(i + 1) }));
        const parts = line.split(/\[\[(.+?)\]\]/);
        let html = '';
        parts.forEach((p, k) => {
          if (k % 2 === 0) { html += hl(p); return; }
          const alts = p.split('|');
          const w = Math.max(3, ...alts.map((a) => a.length)) + 2;
          html += `<input class="blank" data-k="${answers.length}" style="width:${w}ch" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Spazio ${answers.length + 1}">`;
          answers.push(alts);
        });
        row.appendChild(el('span', { class: 'src' }, html || ' '));
        box.appendChild(row);
      });
      body.appendChild(box);
      const inputs = [...box.querySelectorAll('.blank')];
      inputs.forEach((inp) => {
        inp.addEventListener('input', () => inp.classList.remove('is-ok', 'is-bad'));
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') api.submit(); });
      });
      const isRight = (inp) => answers[+inp.dataset.k].some((a) => norm(a) === norm(inp.value));
      return {
        check() {
          const missing = inputs.filter((i) => !i.value.trim()).length;
          if (missing) return { empty: true, msg: `Completa tutti gli spazi (ne mancano ${missing}).` };
          let good = 0;
          inputs.forEach((inp) => {
            const ok = isRight(inp);
            if (ok) good++;
            inp.classList.toggle('is-ok', ok);
            inp.classList.toggle('is-bad', !ok);
          });
          return { ok: good === inputs.length, msg: `${good} su ${inputs.length} spazi corretti. Attenzione: Java distingue maiuscole e minuscole.` };
        },
        reveal(fromSuccess) {
          inputs.forEach((inp) => {
            if (!fromSuccess || !isRight(inp)) inp.value = answers[+inp.dataset.k][0];
            inp.classList.remove('is-bad');
            inp.classList.add('is-ok');
          });
        },
        lock() { inputs.forEach((i) => { i.readOnly = true; }); }
      };
    },

    order(ex, body) {
      const n = ex.lines.length;
      const group = new Array(n).fill(-1);
      (ex.swap || []).forEach((g, gi) => g.forEach((idx) => { group[idx] = gi; }));
      const fits = (pos, idx) => idx === pos || (group[idx] !== -1 && group[idx] === group[pos]);
      const isSolved = (arr) => arr.every((idx, pos) => fits(pos, idx));

      let start = shuffle([...Array(n).keys()]);
      for (let t = 0; t < 20 && isSolved(start); t++) start = shuffle(start);

      const list = el('ol', { class: 'order-list', 'aria-label': 'Righe da riordinare' });
      const clearMarks = () => [...list.children].forEach((li) => li.classList.remove('is-ok', 'is-bad'));
      let locked = false;

      start.forEach((idx) => {
        const li = el('li', { class: 'order-item', 'data-idx': idx });
        li.innerHTML = `<span class="handle" title="Trascina" aria-hidden="true">≡</span>
          <span class="src">${hl(ex.lines[idx]) || ' '}</span>
          <span class="moves"><button type="button" data-d="-1" aria-label="Sposta su">↑</button><button type="button" data-d="1" aria-label="Sposta giù">↓</button></span>`;
        li.querySelectorAll('.moves button').forEach((b) => b.addEventListener('click', () => {
          if (locked) return;
          if (b.dataset.d === '-1' && li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
          if (b.dataset.d === '1' && li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
          clearMarks();
          b.focus();
        }));

        // trascinamento con mouse, penna o dito (anche sulla LIM)
        const handle = li.querySelector('.handle');
        let startY = 0;
        let dragging = false;
        handle.addEventListener('pointerdown', (e) => {
          if (locked) return;
          e.preventDefault();
          dragging = true;
          startY = e.clientY;
          handle.setPointerCapture(e.pointerId);
          li.classList.add('dragging');
          clearMarks();
        });
        handle.addEventListener('pointermove', (e) => {
          if (!dragging) return;
          const gap = parseFloat(getComputedStyle(list).rowGap) || 6;
          const next = li.nextElementSibling;
          const prev = li.previousElementSibling;
          if (next) {
            const r = next.getBoundingClientRect();
            if (e.clientY > r.top + r.height / 2) { list.insertBefore(next, li); startY += r.height + gap; }
          }
          if (prev) {
            const r = prev.getBoundingClientRect();
            if (e.clientY < r.top + r.height / 2) { list.insertBefore(li, prev); startY -= r.height + gap; }
          }
          li.style.transform = `translateY(${e.clientY - startY}px)`;
        });
        const end = () => { dragging = false; li.style.transform = ''; li.classList.remove('dragging'); };
        handle.addEventListener('pointerup', end);
        handle.addEventListener('pointercancel', end);
        list.appendChild(li);
      });
      body.appendChild(list);

      const current = () => [...list.children].map((li) => +li.dataset.idx);
      return {
        check() {
          const cur = current();
          let good = 0;
          [...list.children].forEach((li, pos) => {
            const ok = fits(pos, cur[pos]);
            if (ok) good++;
            li.classList.toggle('is-ok', ok);
            li.classList.toggle('is-bad', !ok);
          });
          return { ok: good === n, msg: good === 1 ? `Solo 1 riga su ${n} è al posto giusto.` : `${good} righe su ${n} sono al posto giusto.` };
        },
        reveal(fromSuccess) {
          if (!fromSuccess) {
            const byIdx = {};
            [...list.children].forEach((li) => { byIdx[li.dataset.idx] = li; });
            for (let i = 0; i < n; i++) list.appendChild(byIdx[i]);
          }
          [...list.children].forEach((li) => { li.classList.remove('is-bad'); li.classList.add('is-ok'); });
        },
        lock() { locked = true; list.classList.add('locked'); }
      };
    }
  };

  /* ---------- montaggio di una sezione ---------- */
  function mount(cfg) {
    const KEY = 'jx-ex-' + cfg.key;
    const state = store.get(KEY, {});
    const list = cfg.list;
    const exercises = cfg.exercises.filter((e) => !e.section);
    const save = () => store.set(KEY, state);
    const st = (id) => (state[id] = state[id] || { attempts: 0, status: null });
    const isDone = (s) => s.status === 'correct' || s.status === 'revealed';

    /* barra di avanzamento e indice degli esercizi */
    const mapLinks = {};
    let statusParts = null;
    if (cfg.status) {
      cfg.status.innerHTML = `
        <div class="status-inner">
          <span class="progress-text">Svolti <b class="done-n">0</b> su ${exercises.length}</span>
          <button class="btn btn-sm btn-ghost reset" type="button">Cancella le risposte</button>
        </div>
        <nav class="ex-map" aria-label="Indice degli esercizi"></nav>`;
      statusParts = {
        done: cfg.status.querySelector('.done-n'),
        map: cfg.status.querySelector('.ex-map')
      };
      cfg.status.querySelector('.reset').addEventListener('click', () => {
        if (confirm('Cancellare tutte le risposte di questa sezione?')) {
          store.del(KEY);
          location.reload();
        }
      });
    }

    let num = 0;
    cfg.exercises.forEach((ex) => {
      if (ex.section) {
        list.appendChild(el('h2', { class: 'section-title' }, rich(ex.section)));
        return;
      }
      num++;
      list.appendChild(buildCard(ex, num));
      if (statusParts) {
        const a = el('a', { href: '#ex-' + ex.id, title: ex.title.replace(/`/g, ''), text: String(num) });
        statusParts.map.appendChild(a);
        mapLinks[ex.id] = a;
      }
    });

    const summary = el('p', { class: 'summary', hidden: true });
    list.after(summary);

    function buildCard(ex, n) {
      const s = st(ex.id);
      const card = el('article', { class: 'ex', id: 'ex-' + ex.id });
      card.innerHTML = `
        <header class="ex-head">
          <h3><span class="ex-num">${n}.</span> ${rich(ex.title)}</h3>
          <span class="ex-type">${TYPE_LABEL[ex.type]}</span>
        </header>
        <div class="ex-prompt">${rich(ex.prompt)}</div>`;
      const body = el('div', { class: 'ex-body' });
      if (ex.code && ex.type !== 'bug' && ex.type !== 'fill') body.appendChild(renderCode(ex.code, { title: ex.codeTitle }));
      card.appendChild(body);

      const actions = el('div', { class: 'ex-actions' });
      const bCheck = el('button', { class: 'btn btn-primary', type: 'button' }, 'Verifica');
      const bHint = ex.hint ? el('button', { class: 'btn', type: 'button' }, 'Suggerimento') : null;
      const bReveal = el('button', { class: 'btn btn-ghost', type: 'button', disabled: true, title: 'Disponibile dopo la prima verifica' }, 'Mostra la soluzione');
      actions.append(bCheck);
      if (bHint) actions.append(bHint);
      actions.append(el('span', { class: 'spacer' }), bReveal);
      card.appendChild(actions);

      const feedback = el('div', { class: 'ex-feedback', role: 'status', 'aria-live': 'polite' });
      card.appendChild(feedback);
      const hintBox = el('div', { class: 'ex-hint', hidden: true }, rich(ex.hint || ''));
      card.appendChild(hintBox);
      const explain = el('div', { class: 'ex-explain', hidden: true }, rich(ex.explain || ''));
      card.appendChild(explain);

      const api = { submit: () => bCheck.click() };
      const h = handlers[ex.type](ex, body, api);

      const say = (cls, html) => { feedback.className = 'ex-feedback ' + cls; feedback.innerHTML = html; };
      const finish = () => {
        h.lock();
        bCheck.disabled = true;
        bReveal.disabled = true;
        if (bHint) bHint.disabled = true;
        if (ex.explain) explain.hidden = false;
        card.dataset.status = s.status;
      };

      bCheck.addEventListener('click', () => {
        const r = h.check();
        if (r.empty) { say('info', r.msg); return; }
        s.attempts++;
        if (r.ok) {
          s.status = 'correct';
          h.reveal(true);
          say('ok', 'Risposta corretta.');
          finish();
        } else {
          s.status = 'tried';
          card.dataset.status = 'tried';
          say('bad', r.msg ? `Risposta non corretta. ${r.msg}` : 'Risposta non corretta.');
          bReveal.disabled = false;
          bReveal.removeAttribute('title');
        }
        save(); refresh();
      });

      if (bHint) {
        bHint.addEventListener('click', () => {
          hintBox.hidden = false;
          bHint.disabled = true;
          s.hint = true;
          save();
        });
      }

      bReveal.addEventListener('click', () => {
        s.status = 'revealed';
        h.reveal(false);
        say('info', 'Soluzione.');
        finish();
        save(); refresh();
      });

      /* ripristino dello stato salvato */
      if (isDone(s)) {
        h.reveal(false);
        say(s.status === 'correct' ? 'ok' : 'info', s.status === 'correct' ? 'Risposta corretta.' : 'Soluzione.');
        finish();
      } else if (s.status === 'tried') {
        card.dataset.status = 'tried';
        bReveal.disabled = false;
      }
      if (s.hint && bHint) { hintBox.hidden = false; bHint.disabled = true; }
      return card;
    }

    function refresh() {
      let done = 0;
      exercises.forEach((ex) => {
        const s = st(ex.id);
        if (isDone(s)) done++;
        if (mapLinks[ex.id]) mapLinks[ex.id].classList.toggle('done', isDone(s));
      });
      if (statusParts) statusParts.done.textContent = done;
      if (done === exercises.length) {
        summary.innerHTML = 'Tutti gli esercizi di questa sezione sono stati svolti.'
          + (cfg.next ? ` <a href="${cfg.next.href}">${cfg.next.label} →</a>` : '');
        summary.hidden = false;
      } else {
        summary.hidden = true;
      }
    }

    refresh();
    return { refresh };
  }

  return { mount };
})();
