# Esercizi di Java: costruttori e tipi primitivi

Esercizi di Java con verifica delle risposte e spiegazioni. Funzionano in qualsiasi browser, anche offline, e non usano librerie esterne: solo HTML, CSS e JavaScript.

## Contenuto

| Pagina | Argomento |
|---|---|
| `index.html` | Indice delle tre parti |
| `costruttori.html` | Costruttori (senza `super`): firma, costruttore di default, `this.attributo`, overloading, `this(...)`. 25 esercizi |
| `tipi.html` | Gli 8 tipi primitivi: dimensioni, intervalli, letterali, divisione intera, overflow, cast. 25 esercizi e uno strumento per visualizzare la rappresentazione binaria |
| `finale.html` | Esercizio finale: progettazione della classe `Personaggio`, con testo, richieste e soluzioni da mostrare a comando |

Tipi di esercizio: scelta multipla, vero/falso, "cosa stampa?", individuazione degli errori, completamento del codice, riordino delle righe, classificazione.

Ogni esercizio ha un pulsante **Verifica**; la soluzione diventa disponibile dopo la prima verifica. Le risposte restano salvate nel browser (`localStorage`) e si possono cancellare con **Cancella le risposte**. I pulsanti **A− / A+** cambiano la dimensione del testo, utile alla lavagna.

## Pubblicare su GitHub Pages

1. Crea un nuovo repository su GitHub e carica **tutto il contenuto** di questa cartella (le pagine `.html` e le cartelle `css/` e `js/`).
2. Nel repository apri **Settings**, poi **Pages**.
3. In *Build and deployment* scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi **Save**.
4. Dopo circa un minuto il sito è raggiungibile all'indirizzo `https://<utente>.github.io/<nome-repository>/`.

## Struttura

```
index.html  costruttori.html  tipi.html  finale.html
css/
  base.css          layout, colori, barra superiore
  exercises.css     schede degli esercizi, editor di codice
js/
  core.js           evidenziatore Java, memoria locale, tema
  engine.js         motore degli esercizi (7 tipi, salvataggio)
  data-costruttori.js, data-tipi.js   testi degli esercizi
  lab-bit.js        rappresentazione binaria
```

L'esercizio finale è scritto direttamente in `finale.html`.

## Modificare o aggiungere esercizi

Gli esercizi sono oggetti nei file `js/data-*.js`. Esempio:

```js
{
  id: "c18", type: "quiz",
  title: "Titolo",
  prompt: "Testo della domanda, con `codice inline` tra apici inversi.",
  options: ["`a`", "`b`", "`c`"],
  answer: 1,
  explain: "Spiegazione mostrata dopo la risposta corretta."
}
```

Campi per tipo:
- `quiz`: `options`, `answer` (indice), facoltativo `why` (spiegazione per ogni opzione sbagliata)
- `truefalse`: `items: [{ text, answer: true|false, why }]`
- `classify`: `buckets`, `items: [{ text, bucket, why }]` (`bucket` può essere un array di risposte accettate)
- `output`: `code`, `answer` (righe separate da `\n`), facoltativo `accept`
- `bug`: `code`, `bugs` (numeri di riga), `notes` (spiegazione per riga)
- `fill`: `code` con gli spazi da completare scritti come `[[risposta|alternativa]]`
- `order`: `lines` nell'ordine corretto, facoltativo `swap` (gruppi di righe interscambiabili)

Campi comuni facoltativi: `hint`, `code` (mostrato sopra la domanda).
Una voce `{ section: "Titolo" }` inserisce un titolo di sezione.
