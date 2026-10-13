/* =========================================================
   Esercizi — COSTRUTTORI (senza super / senza ereditarietà)
   ========================================================= */
window.EX_COSTRUTTORI = [
  { section: "Le regole del costruttore" },
  {
    id: "c1", type: "quiz",
    title: "Dichiarazione di un costruttore",
    prompt: "Abbiamo la classe `Libro`. Quale riga dichiara correttamente un <strong>costruttore</strong> senza parametri?",
    options: ["`public void Libro() { }`", "`public Libro() { }`", "`public libro() { }`", "`public Libro Libro() { }`"],
    answer: 1,
    why: [
      "Con `void` diventa un normale <em>metodo</em> che si chiama Libro, non un costruttore.",
      "",
      "Java distingue maiuscole e minuscole: `libro` non è il nome della classe `Libro`.",
      "Il costruttore non ha <em>nessun</em> tipo di ritorno, nemmeno il nome della classe."
    ],
    explain: "Un costruttore ha <strong>lo stesso nome della classe</strong> (maiuscole comprese) e <strong>nessun tipo di ritorno</strong>, nemmeno `void`."
  },
  {
    id: "c2", type: "truefalse",
    title: "Proprietà dei costruttori",
    prompt: "Decidi se ogni affermazione è vera o falsa.",
    items: [
      { text: "Il costruttore deve avere lo stesso nome della classe.", answer: true, why: "Identico, comprese le maiuscole." },
      { text: "Un costruttore può terminare con `return 5;`", answer: false, why: "Il costruttore non restituisce valori: non ha tipo di ritorno." },
      { text: "Se non scrivo nessun costruttore, Java ne aggiunge uno senza parametri.", answer: true, why: "È il <em>costruttore di default</em>, aggiunto dal compilatore." },
      { text: "Il costruttore viene eseguito ogni volta che si crea un oggetto con `new`.", answer: true, why: "`new` crea l'oggetto e subito dopo esegue il costruttore." },
      { text: "Una classe può avere un solo costruttore.", answer: false, why: "Può averne più di uno, purché con parametri diversi (overloading)." },
      { text: "Il costruttore si può chiamare come un metodo normale, ad esempio `p.Persona();`", answer: false, why: "Non si chiama come un metodo: entra in azione quando si scrive `new`." }
    ],
    explain: "Riassumendo: stesso nome della classe, niente tipo di ritorno, si attiva con `new`, e ce ne possono essere più di uno."
  },
  {
    id: "c3", type: "bug",
    title: "Costruttore con tipo di ritorno",
    prompt: "Il `main` non compila: Java dice che <em>non esiste</em> un costruttore `Auto(String, int)`. Clicca sulla riga che causa il problema.",
    code: `public class Auto {
    private String marca;
    private int anno;

    public void Auto(String marca, int anno) {
        this.marca = marca;
        this.anno = anno;
    }
}

// nel main
Auto a = new Auto("Fiat", 2020);`,
    bugs: [5],
    notes: { 5: "Togli `void`: con un tipo di ritorno questo è un metodo, non un costruttore." },
    hint: "Un costruttore non ha tipo di ritorno… controlla bene le intestazioni.",
    explain: "Con `void` abbiamo scritto un <em>metodo</em> che per caso si chiama `Auto`. La classe quindi non ha costruttori scritti da noi: Java usa quello di default <strong>senza parametri</strong>, e `new Auto(\"Fiat\", 2020)` non trova un costruttore adatto."
  },
  {
    id: "c4", type: "bug",
    title: "Costruttore di default",
    prompt: "Una sola riga del `main` non compila. Quale?",
    code: `public class Lampada {
    private boolean accesa;
    private int watt;

    public Lampada(int watt) {
        this.watt = watt;
        accesa = false;
    }
}

// nel main
Lampada a = new Lampada(60);
Lampada b = new Lampada();
Lampada c = new Lampada(100);`,
    bugs: [13],
    notes: { 13: "Non esiste `Lampada()`: il costruttore di default sparisce appena ne scrivi uno tu." },
    hint: "Quando Java aggiunge da solo il costruttore senza parametri?",
    explain: "Java aggiunge il costruttore di default <strong>solo se la classe non ne ha nessuno</strong>. Qui c'è `Lampada(int watt)`, quindi `new Lampada()` non compila. Per usarlo dobbiamo scrivere anche `public Lampada() { ... }`."
  },

  {
    id: "c18", type: "classify",
    title: "Costruttore o metodo?",
    prompt: "Ogni riga si trova all'interno della classe `Lampada`. Indica se dichiara un costruttore, un metodo oppure se contiene un errore.",
    buckets: ["Costruttore", "Metodo", "Errore"],
    items: [
      { text: "`public Lampada() { }`", bucket: 0, why: "Stesso nome della classe e nessun tipo di ritorno." },
      { text: "`public void accendi() { }`", bucket: 1, why: "Ha un tipo di ritorno (`void`) e un nome diverso da quello della classe." },
      { text: "`public Lampada(int watt) { }`", bucket: 0, why: "Un costruttore può avere parametri." },
      { text: "`public void Lampada() { }`", bucket: 1, why: "Con `void` diventa un metodo, anche se ha il nome della classe." },
      { text: "`public int Lampada(int watt) { return watt; }`", bucket: 1, why: "Ha un tipo di ritorno: è un metodo." },
      { text: "`public lampada() { }`", bucket: 2, why: "Il nome non coincide con quello della classe (manca la maiuscola) e non c'è un tipo di ritorno: non è né un costruttore né un metodo valido." }
    ],
    explain: "Il compilatore riconosce un costruttore da due elementi: il nome identico a quello della classe e l'assenza di qualsiasi tipo di ritorno."
  },
  {
    id: "c19", type: "quiz",
    title: "Classe senza costruttori",
    prompt: "La classe `Punto` non contiene costruttori scritti dal programmatore. Quale istruzione compila?",
    code: `public class Punto {
    private int x;
    private int y;

    public void sposta(int dx, int dy) {
        x = x + dx;
        y = y + dy;
    }
}`,
    options: ["`new Punto()`", "`new Punto(1, 2)`", "`new Punto(0)`", "Nessuna: la classe non ha costruttori"],
    answer: 0,
    why: [
      "",
      "Non esiste un costruttore con due parametri: il metodo `sposta` non è un costruttore.",
      "Non esiste un costruttore con un parametro.",
      "Java aggiunge automaticamente il costruttore di default senza parametri."
    ],
    explain: "Poiché la classe non dichiara costruttori, il compilatore aggiunge il costruttore di default `Punto()`, che lascia gli attributi ai valori predefiniti (`x` e `y` valgono 0)."
  },

  { section: "Inizializzazione degli attributi" },
  {
    id: "c5", type: "fill",
    title: "Costruttore della classe Rettangolo",
    prompt: "Completa la classe in modo che `new Rettangolo(4.0, 2.5)` crei un rettangolo con base 4.0 e altezza 2.5.",
    code: `public class Rettangolo {
    private double base;
    private double altezza;

    public [[Rettangolo]]([[double]] base, double altezza) {
        [[this]].base = base;
        this.altezza = [[altezza]];
    }
}`,
    hint: "Per distinguere l'attributo dal parametro con lo stesso nome si usa una parola chiave di 4 lettere.",
    explain: "Il costruttore si chiama come la classe; ogni parametro ha il suo tipo; `this.base` è l'<strong>attributo</strong> dell'oggetto, mentre `base` da solo è il <strong>parametro</strong>."
  },
  {
    id: "c6", type: "output",
    title: "Parametri con lo stesso nome degli attributi",
    prompt: "Cosa stampa questo programma?",
    code: `public class Punto {
    private int x;
    private int y;

    public Punto(int x, int y) {
        x = x;
        y = y;
    }

    public void stampa() {
        System.out.println(x + "," + y);
    }
}

// nel main
Punto p = new Punto(3, 7);
p.stampa();`,
    answer: "0,0",
    accept: ["0, 0"],
    hint: "Dentro il costruttore, `x` indica il parametro o l'attributo?",
    explain: "Nel costruttore il parametro `x` <strong>nasconde</strong> l'attributo con lo stesso nome: `x = x;` copia il parametro su sé stesso. Gli attributi restano al valore iniziale `0`. La versione corretta è `this.x = x;`."
  },
  {
    id: "c7", type: "output",
    title: "Scelta del costruttore",
    prompt: "Cosa stampa il `main`?",
    code: `public class Contatore {
    private int valore;

    public Contatore() {
        valore = 10;
    }

    public Contatore(int iniziale) {
        valore = iniziale;
    }

    public int getValore() {
        return valore;
    }
}

// nel main
Contatore a = new Contatore();
Contatore b = new Contatore(5);
System.out.println(a.getValore());
System.out.println(b.getValore());`,
    answer: "10\n5",
    explain: "`new Contatore()` esegue il costruttore <strong>senza parametri</strong> (valore 10); `new Contatore(5)` esegue quello con un `int`. Java sceglie il costruttore guardando gli argomenti."
  },
  {
    id: "c8", type: "output",
    title: "Valori predefiniti degli attributi",
    prompt: "Il costruttore imposta un solo attributo. Cosa stampa `info()`?",
    code: `public class Termometro {
    private double temperatura;
    private boolean acceso;
    private int letture;

    public Termometro(double t) {
        temperatura = t;
    }

    public void info() {
        System.out.println(temperatura);
        System.out.println(acceso);
        System.out.println(letture);
    }
}

// nel main
Termometro t = new Termometro(21.5);
t.info();`,
    answer: "21.5\nfalse\n0",
    hint: "Un attributo numerico o booleano non assegnato non è \"vuoto\": ha un valore predefinito.",
    explain: "Gli attributi non assegnati ricevono un <strong>valore predefinito</strong>: `0` per gli interi, `0.0` per `double`, `false` per `boolean`. Solo `temperatura` è stato impostato dal costruttore."
  },
  {
    id: "c9", type: "quiz",
    title: "Controllo dei valori nel costruttore",
    prompt: "Che valore ha l'attributo `valore` dopo `new Voto(15)`?",
    code: `public class Voto {
    private int valore;

    public Voto(int v) {
        if (v < 1 || v > 10) {
            valore = 1;
        } else {
            valore = v;
        }
    }
}`,
    options: ["`15`", "`10`", "`1`", "Errore di compilazione"],
    answer: 2,
    why: [
      "Il costruttore controlla il parametro prima di assegnarlo…",
      "Il costruttore non \"taglia\" a 10: guarda cosa fa il ramo `if`.",
      "",
      "Il codice è corretto: un costruttore può contenere `if`, cicli e calcoli."
    ],
    explain: "Il costruttore è il posto ideale per <strong>controllare i dati</strong>: 15 non è tra 1 e 10, quindi si esegue il ramo `if` e `valore` diventa 1. Nessun `Voto` può nascere con un valore assurdo."
  },
  {
    id: "c10", type: "order",
    title: "Struttura di una classe",
    prompt: "Trascina le righe (oppure usa i pulsanti su/giù) per ottenere una classe `Cane` con due attributi e un costruttore che li inizializza.",
    lines: [
      "public class Cane {",
      "    private String nome;",
      "    private int eta;",
      "    public Cane(String nome, int eta) {",
      "        this.nome = nome;",
      "        this.eta = eta;",
      "    }",
      "}"
    ],
    swap: [[1, 2], [4, 5]],
    hint: "Usa l'indentazione come indizio: più una riga è spostata a destra, più è \"interna\".",
    explain: "Prima l'intestazione della classe, poi gli attributi, poi il costruttore con le assegnazioni e infine le graffe di chiusura: prima quella del costruttore, poi quella della classe. L'ordine dei due attributi (o delle due assegnazioni) è indifferente."
  },
  {
    id: "c11", type: "output",
    title: "Quando viene eseguito il costruttore",
    prompt: "Cosa compare sullo schermo eseguendo le tre righe del `main`?",
    code: `public class Pizza {
    private int fette;

    public Pizza() {
        fette = 8;
        System.out.println("Pizza intera: " + fette);
    }

    public Pizza(int fette) {
        this.fette = fette;
        System.out.println("Pizza da " + fette);
    }
}

// nel main
Pizza p1 = new Pizza(4);
Pizza p2;
Pizza p3 = new Pizza();`,
    answer: "Pizza da 4\nPizza intera: 8",
    hint: "Un costruttore parte solo quando c'è `new`.",
    explain: "Il costruttore viene eseguito <strong>solo con `new`</strong>. La riga `Pizza p2;` dichiara una variabile ma non crea nessun oggetto, quindi non stampa nulla."
  },

  {
    id: "c20", type: "output",
    title: "Ordine delle istruzioni nel costruttore",
    prompt: "Cosa stampa il `main`?",
    code: `public class Rettangolo {
    private int base;
    private int altezza;
    private int area;

    public Rettangolo(int base, int altezza) {
        area = this.base * this.altezza;
        this.base = base;
        this.altezza = altezza;
    }

    public void stampa() {
        System.out.println(base + " x " + altezza + " = " + area);
    }
}

// nel main
Rettangolo r = new Rettangolo(4, 3);
r.stampa();`,
    answer: "4 x 3 = 0",
    hint: "Quando viene calcolata l'area, che valore hanno gli attributi `this.base` e `this.altezza`?",
    explain: "Le istruzioni del costruttore vengono eseguite in ordine. L'area viene calcolata per prima, quando gli attributi valgono ancora 0, quindi il risultato è 0. Il calcolo va spostato dopo le assegnazioni, oppure fatto con i parametri: `area = base * altezza;`."
  },
  {
    id: "c21", type: "fill",
    title: "Saldo iniziale di un conto",
    prompt: "Completa il costruttore: se il saldo iniziale è negativo, il conto deve partire da 0; altrimenti dal valore ricevuto.",
    code: `public class Conto {
    private double saldo;

    public Conto(double saldoIniziale) {
        if (saldoIniziale [[<|<=]] 0) {
            saldo = [[0|0.0]];
        } [[else]] {
            saldo = [[saldoIniziale]];
        }
    }
}`,
    explain: "Il costruttore controlla il parametro prima di assegnarlo all'attributo: in questo modo nessun oggetto `Conto` può essere creato con un saldo negativo."
  },
  {
    id: "c22", type: "bug",
    title: "Errori in una classe con due costruttori",
    prompt: "In questa classe ci sono <strong>3 righe</strong> che impediscono la compilazione. Selezionale.",
    code: `public class Termostato {
    private double temperatura;
    private boolean acceso;

    public Termostato(double temperatura) {
        this.temperatura = temperatura;
        acceso = 1;
        return true;
    }

    public Termostato(double t) {
        temperatura = t;
    }
}`,
    bugs: [7, 8, 11],
    notes: {
      7: "Un `boolean` accetta solo `true` o `false`.",
      8: "Un costruttore non restituisce valori.",
      11: "Esiste già un costruttore `Termostato(double)`: il nome del parametro non conta."
    },
    hint: "Controlla i tipi nelle assegnazioni, le istruzioni non ammesse in un costruttore e le firme.",
    explain: "La riga 7 assegna un intero a un `boolean`; la riga 8 tenta di restituire un valore da un costruttore; la riga 11 dichiara un secondo costruttore con la stessa firma `(double)` del primo."
  },

  { section: "Overloading: più costruttori nella stessa classe" },
  {
    id: "c12", type: "quiz",
    title: "Corrispondenza degli argomenti",
    prompt: "La classe ha <strong>solo</strong> questo costruttore. Quale istruzione compila?",
    code: `public class Studente {
    private String nome;
    private int eta;

    public Studente(String nome, int eta) {
        this.nome = nome;
        this.eta = eta;
    }
}`,
    options: ["`new Studente()`", "`new Studente(17, \"Anna\")`", "`new Studente(\"Anna\", 17)`", "`new Studente(\"Anna\")`"],
    answer: 2,
    why: [
      "C'è già un costruttore scritto da noi, quindi quello di default non esiste più.",
      "L'ordine conta: prima il nome, poi l'età.",
      "",
      "Servono esattamente due argomenti: manca l'età."
    ],
    explain: "Gli argomenti di `new` devono corrispondere ai parametri del costruttore per <strong>numero, tipo e ordine</strong>."
  },
  {
    id: "c13", type: "classify",
    title: "Firme dei costruttori",
    prompt: "Per ogni coppia di costruttori della classe `Prodotto`, decidi se possono stare <strong>insieme</strong> nella stessa classe.",
    buckets: ["Possono coesistere", "Firma duplicata"],
    items: [
      { text: "`Prodotto(int codice)` e `Prodotto(double prezzo)`", bucket: 0, why: "Tipi diversi (`int` e `double`): firme diverse." },
      { text: "`Prodotto(int codice)` e `Prodotto(int quantita)`", bucket: 1, why: "Il nome del parametro non conta: sono entrambi `Prodotto(int)`." },
      { text: "`Prodotto()` e `Prodotto(int codice)`", bucket: 0, why: "Numero di parametri diverso." },
      { text: "`Prodotto(int a, double b)` e `Prodotto(double b, int a)`", bucket: 0, why: "Stessi tipi in ordine diverso: `(int, double)` è diverso da `(double, int)`." },
      { text: "`Prodotto(String nome, int q)` e `Prodotto(String descr, int pezzi)`", bucket: 1, why: "Sempre `(String, int)`: cambiano solo i nomi." },
      { text: "`Prodotto(int codice)` e `Prodotto(long codice)`", bucket: 0, why: "`int` e `long` sono tipi diversi." }
    ],
    hint: "Copri con il dito i nomi dei parametri e guarda solo i tipi.",
    explain: "Nell'<strong>overloading</strong> conta la <em>firma</em>: numero, tipo e ordine dei parametri. I nomi dei parametri non contano."
  },
  {
    id: "c14", type: "classify",
    title: "Chiamate ai costruttori",
    prompt: "La classe `Libro` ha due costruttori. Quali istruzioni compilano?",
    code: `public class Libro {
    private String titolo;
    private int pagine;

    public Libro(String titolo) {
        this.titolo = titolo;
        pagine = 100;
    }

    public Libro(String titolo, int pagine) {
        this.titolo = titolo;
        this.pagine = pagine;
    }
}`,
    buckets: ["Compila", "Non compila"],
    items: [
      { text: "`new Libro(\"Dune\")`", bucket: 0, why: "Usa il primo costruttore (pagine = 100)." },
      { text: "`new Libro(\"Dune\", 412)`", bucket: 0, why: "Usa il secondo costruttore." },
      { text: "`new Libro()`", bucket: 1, why: "Non c'è un costruttore senza parametri." },
      { text: "`new Libro(412, \"Dune\")`", bucket: 1, why: "Ordine degli argomenti sbagliato." },
      { text: "`new Libro(\"Dune\", 412.5)`", bucket: 1, why: "`412.5` è un `double`: non entra in un `int` senza cast." },
      { text: "`new Libro(\"Dune\", (int) 412.5)`", bucket: 0, why: "Con il cast il `double` diventa l'`int` 412." },
      { text: "`new Libro(\"Dune\", 'A')`", bucket: 0, why: "La conversione da `char` a `int` è automatica ('A' vale 65)." }
    ],
    hint: "Ricorda le conversioni tra tipi primitivi: alcune sono automatiche, altre richiedono il cast.",
    explain: "Java cerca un costruttore con parametri compatibili. Le conversioni che <strong>allargano</strong> (es. `char` → `int`) sono automatiche; quelle che possono perdere informazioni (es. `double` → `int`) richiedono il cast."
  },

  {
    id: "c23", type: "truefalse",
    title: "Overloading dei costruttori",
    prompt: "Vero o falso?",
    items: [
      { text: "Due costruttori possono differire solo per il nome dei parametri.", answer: false, why: "Il nome dei parametri non fa parte della firma." },
      { text: "Due costruttori possono avere lo stesso numero di parametri, se i tipi sono diversi.", answer: true, why: "Ad esempio `Prodotto(int)` e `Prodotto(double)`." },
      { text: "L'ordine dei tipi dei parametri serve a distinguere due costruttori.", answer: true, why: "`(int, double)` e `(double, int)` sono firme diverse." },
      { text: "Java sceglie il costruttore da eseguire in base agli argomenti passati a `new`.", answer: true, why: "Confronta numero, tipo e ordine degli argomenti." },
      { text: "Se una classe ha tre costruttori, ogni `new` li esegue tutti e tre.", answer: false, why: "Ogni `new` esegue un solo costruttore (salvo chiamate esplicite con `this(...)`)." },
      { text: "L'overloading è possibile solo se uno dei costruttori non ha parametri.", answer: false, why: "Basta che le firme siano diverse." }
    ],
    explain: "Overloading significa avere più costruttori con lo stesso nome, quello della classe, e firme diverse."
  },
  {
    id: "c24", type: "output",
    title: "Overloading e tipi degli argomenti",
    prompt: "Quale costruttore viene eseguito da ciascuna istruzione del `main`? Scrivi l'output.",
    code: `public class Misura {
    public Misura(int x) {
        System.out.println("int");
    }

    public Misura(double x) {
        System.out.println("double");
    }

    public Misura(char x) {
        System.out.println("char");
    }
}

// nel main
new Misura(5);
new Misura(5.0);
new Misura('5');
new Misura(5L);`,
    answer: "int\ndouble\nchar\ndouble",
    hint: "Non esiste un costruttore con parametro `long`: in quali tipi può essere convertito automaticamente un `long`?",
    explain: "I primi tre argomenti hanno esattamente il tipo di un parametro (`int`, `double`, `char`). Per `5L`, che è un `long`, non c'è un costruttore corrispondente: Java usa quello con `double`, perché `long` → `double` è una conversione automatica, mentre `long` → `int` richiederebbe un cast."
  },

  { section: "Costruttori che richiamano altri costruttori: `this(...)`" },
  {
    id: "c15", type: "output",
    title: "Ordine di esecuzione con `this(...)`",
    prompt: "Cosa stampa `new Orologio()`?",
    code: `public class Orologio {
    private int ore;
    private int minuti;

    public Orologio() {
        this(12, 0);
        System.out.println("A");
    }

    public Orologio(int ore, int minuti) {
        this.ore = ore;
        this.minuti = minuti;
        System.out.println("B");
    }
}

// nel main
Orologio o = new Orologio();`,
    answer: "B\nA",
    hint: "`this(12, 0)` è la prima istruzione eseguita: dove porta?",
    explain: "`this(12, 0)` salta subito all'altro costruttore, che imposta gli attributi e stampa <strong>B</strong>. Poi si torna nel costruttore senza parametri, che stampa <strong>A</strong>."
  },
  {
    id: "c16", type: "bug",
    title: "Errori nei costruttori",
    prompt: "Ci sono <strong>2 righe</strong> che impediscono la compilazione. Selezionale entrambe.",
    code: `public class Orologio {
    private int ore;
    private int minuti;

    public Orologio(int ore, int minuti) {
        this.ore = ore;
        this.minuti = minuti;
    }

    public Orologio(int ore) {
        System.out.println("Solo le ore");
        this(ore, 0);
    }

    public Orologio(int h) {
        this(h, 0);
    }
}`,
    bugs: [12, 15],
    notes: {
      12: "`this(...)` deve essere la <strong>prima</strong> istruzione del costruttore.",
      15: "Esiste già `Orologio(int)`: cambiare il nome del parametro non basta."
    },
    hint: "Un errore riguarda la <em>posizione</em> di una istruzione, l'altro la <em>firma</em> di un costruttore.",
    explain: "`this(...)` è ammesso solo come prima istruzione. Inoltre due costruttori con la stessa lista di tipi (`int`) non possono convivere, anche se i parametri hanno nomi diversi."
  },
  {
    id: "c17", type: "fill",
    title: "Riutilizzo di un costruttore con `this(...)`",
    prompt: "Completa i costruttori in modo che i due più corti <strong>riusino</strong> quello completo. Il biglietto standard costa 8 euro ed è intero.",
    code: `public class Biglietto {
    private double prezzo;
    private boolean ridotto;

    public Biglietto(double prezzo, boolean ridotto) {
        this.prezzo = prezzo;
        this.ridotto = ridotto;
    }

    // biglietto intero (non ridotto)
    public Biglietto(double prezzo) {
        [[this]](prezzo, [[false]]);
    }

    // biglietto standard
    public [[Biglietto]]() {
        this([[8.0|8|8d|8.0d]], false);
    }
}`,
    hint: "Un biglietto <em>intero</em> è un biglietto <em>non</em> ridotto.",
    explain: "Con `this(...)` un costruttore <strong>riusa</strong> un altro costruttore della stessa classe: la logica sta in un solo punto e non si duplica il codice."
  },
  {
    id: "c25", type: "classify",
    title: "Uso corretto di `this(...)`",
    prompt: "La classe `Punto` ha già il costruttore `Punto(int x, int y)`. Quali dei seguenti costruttori aggiuntivi sono corretti?",
    buckets: ["Corretto", "Errore di compilazione"],
    items: [
      { text: "`public Punto() { this(0, 0); }`", bucket: 0, why: "Chiama `Punto(int, int)` come prima istruzione." },
      { text: "`public Punto(int x) { this(x, x); }`", bucket: 0, why: "Crea un punto con le due coordinate uguali." },
      { text: "`public Punto() { this(); }`", bucket: 1, why: "Il costruttore richiamerebbe sé stesso all'infinito: il compilatore lo segnala come errore." },
      { text: "`public Punto(int x) { this.x = x; this(x, 0); }`", bucket: 1, why: "`this(...)` non è la prima istruzione." },
      { text: "`public Punto(double x) { this(x, 0); }`", bucket: 1, why: "Non esiste `Punto(double, int)` e la conversione `double` → `int` non è automatica." },
      { text: "`public Punto(char c) { this(c, c); }`", bucket: 0, why: "`char` → `int` è una conversione automatica." }
    ],
    hint: "Controlla la posizione di `this(...)` e se esiste un costruttore compatibile con gli argomenti.",
    explain: "`this(...)` deve essere la prima istruzione e deve corrispondere a un altro costruttore della classe, con argomenti compatibili. Un costruttore non può richiamare sé stesso."
  }
];
