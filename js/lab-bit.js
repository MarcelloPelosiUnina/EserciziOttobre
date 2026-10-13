/* =========================================================
   Rappresentazione binaria di byte, short, char, int
   ========================================================= */
const BitLab = (() => {
  'use strict';
  const { el } = App;

  const TYPES = {
    byte: { bits: 8, min: -128, max: 127, signed: true },
    short: { bits: 16, min: -32768, max: 32767, signed: true },
    char: { bits: 16, min: 0, max: 65535, signed: false },
    int: { bits: 32, min: -2147483648, max: 2147483647, signed: true }
  };

  // cifre raggruppate con uno spazio (il punto si confonderebbe con i decimali di Java)
  const fmt = (n) => String(n).replace('-', '−').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const wrap = (v, t) => {
    const m = 2 ** t.bits;
    return (((v - t.min) % m) + m) % m + t.min;
  };
  const toUnsigned = (v, t) => (v < 0 ? v + 2 ** t.bits : v);
  const fromUnsigned = (u, t) => (t.signed && u >= 2 ** (t.bits - 1) ? u - 2 ** t.bits : u);

  function mount(host) {
    const s = { type: 'byte', value: 0 };

    host.innerHTML = `
      <div class="lab-controls">
        <label class="field">Tipo
          <select class="lab-type">
            <option value="byte">byte (8 bit)</option>
            <option value="short">short (16 bit)</option>
            <option value="char">char (16 bit)</option>
            <option value="int">int (32 bit)</option>
          </select>
        </label>
        <label class="field">Valore
          <input class="lab-val" type="number" step="1" value="0" style="width:160px">
        </label>
        <div class="seg" style="justify-content:flex-start">
          <button type="button" data-op="min">min</button>
          <button type="button" data-op="-1">−1</button>
          <button type="button" data-op="zero">0</button>
          <button type="button" data-op="+1">+1</button>
          <button type="button" data-op="max">max</button>
        </div>
      </div>
      <div class="bits" aria-label="Rappresentazione binaria"></div>
      <div class="lab-readout">
        <div class="readout"><div class="k">Valore</div><div class="v lab-dec">0</div></div>
        <div class="readout"><div class="k">Intervallo del tipo</div><div class="v lab-range" style="font-size:.95rem"></div></div>
        <div class="readout lab-char-box"><div class="k">Carattere</div><div class="v lab-char"></div></div>
      </div>
      <div class="lab-log" aria-live="polite"></div>
      <p style="font-size:.9rem;color:var(--muted);margin:12px 0 0">Ogni bit si può attivare o disattivare con un clic. Nei tipi con segno il primo bit (sottolineato) è il bit del segno.
      Prove suggerite: partire dal massimo di un <code>byte</code> e aggiungere 1; ottenere −1 in un <code>byte</code> agendo sui bit; trovare il codice numerico del carattere <code>'J'</code>.</p>`;

    const $ = (sel) => host.querySelector(sel);
    const typeSel = $('.lab-type');
    const valInp = $('.lab-val');
    const bitsBox = $('.bits');
    const log = $('.lab-log');
    const say = (html) => { log.innerHTML = html; };

    function set(v, how) {
      const t = TYPES[s.type];
      const w = wrap(v, t);
      if (w !== v) say(`<span class="flash">Overflow:</span> ${fmt(v)} non è rappresentabile con un ${s.type}; il valore diventa ${fmt(w)}.`);
      else if (how) say(how);
      s.value = w;
      render();
    }

    function render() {
      const t = TYPES[s.type];
      const u = toUnsigned(s.value, t);
      const bin = u.toString(2).padStart(t.bits, '0');
      bitsBox.innerHTML = '';
      for (let g = 0; g < t.bits; g += 4) {
        const grp = el('div', { class: 'bit-group' });
        for (let k = g; k < g + 4; k++) {
          const b = el('button', {
            type: 'button',
            class: 'bit' + (bin[k] === '1' ? ' on' : '') + (k === 0 && t.signed ? ' sign' : ''),
            'aria-label': `bit ${t.bits - 1 - k}: ${bin[k]}`,
            title: `peso ${fmt(2 ** (t.bits - 1 - k))}${k === 0 && t.signed ? ' (bit del segno: −' + fmt(2 ** (t.bits - 1)) + ')' : ''}`
          }, bin[k]);
          b.addEventListener('click', () => {
            const weight = 2 ** (t.bits - 1 - k);
            s.value = fromUnsigned(bin[k] === '1' ? u - weight : u + weight, t);
            say(`Bit ${t.bits - 1 - k} ${bin[k] === '1' ? 'disattivato' : 'attivato'}: valore ${fmt(s.value)}.`);
            render();
          });
          grp.appendChild(b);
        }
        bitsBox.appendChild(grp);
      }
      $('.lab-dec').textContent = fmt(s.value);
      $('.lab-range').textContent = `${fmt(t.min)} … ${fmt(t.max)}`;
      const isChar = s.type === 'char';
      $('.lab-char-box').style.display = isChar ? '' : 'none';
      if (isChar) {
        const printable = s.value >= 32 && !(s.value >= 127 && s.value < 160) && !(s.value >= 0xD800 && s.value <= 0xDFFF);
        $('.lab-char').textContent = printable ? `'${String.fromCharCode(s.value)}'` : '(non stampabile)';
      }
      if (document.activeElement !== valInp) valInp.value = s.value;
    }

    typeSel.addEventListener('change', () => {
      s.type = typeSel.value;
      const t = TYPES[s.type];
      s.value = Math.max(t.min, Math.min(t.max, s.value));
      say(`${s.type}: ${t.bits} bit, ${t.signed ? 'con segno' : 'senza segno'}.`);
      render();
    });

    valInp.addEventListener('change', () => {
      const v = Math.trunc(Number(valInp.value));
      if (!Number.isFinite(v)) return;
      const t = TYPES[s.type];
      if (v > t.max || v < t.min) {
        s.value = wrap(v, t);
        say(`<span class="flash">Fuori intervallo:</span> <code>${s.type} x = ${v};</code> non compila. Con il cast <code>(${s.type}) ${v}</code> si otterrebbe ${fmt(s.value)}.`);
        render();
      } else {
        set(v, `Valore: ${fmt(v)}.`);
      }
    });

    host.querySelector('.seg').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const t = TYPES[s.type];
      const op = b.dataset.op;
      if (op === 'min') set(t.min, `Valore minimo di ${s.type}: ${fmt(t.min)}.`);
      else if (op === 'max') set(t.max, `Valore massimo di ${s.type}: ${fmt(t.max)}.`);
      else if (op === 'zero') set(0, 'Valore 0: tutti i bit a zero.');
      else {
        const d = Number(op);
        set(s.value + d, `${fmt(s.value)} ${d > 0 ? '+' : '−'} 1 = ${fmt(s.value + d)}.`);
      }
    });

    render();
  }

  return { mount };
})();
