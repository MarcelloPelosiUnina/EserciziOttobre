/* =========================================================
   Esercizi — TIPI DI DATI PRIMITIVI
   (solo gli 8 primitivi: nessun tipo riferimento)
   ========================================================= */
window.EX_TIPI = [
  { section: "Gli 8 tipi primitivi" },
  {
    id: "t1", type: "classify",
    title: "Dimensione dei tipi",
    prompt: "Associa a ogni tipo primitivo la sua dimensione in memoria.",
    buckets: ["8 bit", "16 bit", "32 bit", "64 bit"],
    items: [
      { text: "`byte`", bucket: 0 },
      { text: "`short`", bucket: 1 },
      { text: "`int`", bucket: 2 },
      { text: "`long`", bucket: 3 },
      { text: "`float`", bucket: 2 },
      { text: "`double`", bucket: 3, why: "\"double\" = doppia precisione rispetto a `float`." },
      { text: "`char`", bucket: 1, why: "16 bit perché usa la codifica Unicode (65 536 caratteri)." }
    ],
    explain: "Interi: `byte` 8, `short` 16, `int` 32, `long` 64 bit. Decimali: `float` 32, `double` 64. `char` 16 bit. L'ottavo tipo, `boolean`, può valere solo `true` o `false`."
  },
  {
    id: "t2", type: "classify",
    title: "Scelta del tipo",
    prompt: "Scegli il tipo più adatto per memorizzare ciascun dato.",
    buckets: ["boolean", "char", "int", "long", "double"],
    items: [
      { text: "Se la luce della camera è accesa", bucket: 0 },
      { text: "La lettera iniziale del tuo cognome", bucket: 1 },
      { text: "Il numero di studenti della classe", bucket: 2 },
      { text: "Gli abitanti della Terra (circa 8 miliardi)", bucket: 3, why: "Supera il massimo di `int` (circa 2,1 miliardi)." },
      { text: "Il prezzo di un caffè: 1,20 €", bucket: 4 },
      { text: "La temperatura corporea: 36,6 °C", bucket: 4 },
      { text: "La distanza Terra–Sole in metri (circa 150 000 000 000)", bucket: 3, why: "150 miliardi: troppo per un `int`." },
      { text: "La risposta a «Hai finito il compito?»", bucket: 0 },
      { text: "Il simbolo della valuta: €", bucket: 1, why: "Un singolo carattere Unicode." }
    ],
    hint: "Chiediti: è sì/no? è un solo carattere? ha la virgola? quanto può diventare grande?",
    explain: "Sì/no → `boolean`; un carattere → `char`; numeri con la virgola → `double`; interi → `int`, oppure `long` se superano i 2 miliardi circa."
  },
  {
    id: "t3", type: "quiz",
    title: "Tipo con minore occupazione di memoria",
    prompt: "Devi memorizzare l'età di una persona (da 0 a 120) usando <strong>meno memoria possibile</strong>. Quale tipo scegli?",
    options: ["`byte`", "`short`", "`int`", "`long`"],
    answer: 0,
    why: ["", "Funziona, ma usa 16 bit: il doppio del necessario.", "Funziona, ma usa 32 bit: quattro volte il necessario.", "Funziona, ma usa 64 bit: otto volte il necessario."],
    explain: "`byte` va da -128 a 127: 120 ci sta e occupa solo 8 bit. (Nei programmi di tutti i giorni si usa spesso `int` per comodità, ma qui l'obiettivo era il risparmio.)"
  },
  {
    id: "t4", type: "truefalse",
    title: "Intervalli dei tipi",
    prompt: "Vero o falso?",
    items: [
      { text: "Un `byte` può contenere il valore 128.", answer: false, why: "Il massimo è 127 (il minimo -128)." },
      { text: "Un `int` arriva fino a circa 2 miliardi.", answer: true, why: "Precisamente 2 147 483 647." },
      { text: "Una variabile `char` può contenere un valore negativo.", answer: false, why: "`char` va da 0 a 65 535: niente negativi." },
      { text: "`double` è più preciso di `float`.", answer: true, why: "Circa 15–16 cifre significative contro circa 7." },
      { text: "`long` e `double` occupano entrambi 64 bit.", answer: true, why: "Stessa memoria, ma uno è intero e l'altro decimale." },
      { text: "Un `boolean` può valere `true`, `false` oppure 0 e 1.", answer: false, why: "In Java solo `true` e `false`: niente numeri." }
    ],
    explain: "Conoscere gli intervalli serve a scegliere il tipo giusto ed evitare l'<strong>overflow</strong>, cioè il superamento del valore massimo."
  },

  {
    id: "t18", type: "classify",
    title: "Intervalli di valori",
    prompt: "Il valore indicato rientra nell'intervallo del tipo?",
    buckets: ["Rientra", "Fuori intervallo"],
    items: [
      { text: "`300` in un `byte`", bucket: 1, why: "Il massimo di `byte` è 127." },
      { text: "`-128` in un `byte`", bucket: 0, why: "È esattamente il minimo." },
      { text: "`40000` in uno `short`", bucket: 1, why: "Il massimo di `short` è 32 767." },
      { text: "`32767` in uno `short`", bucket: 0, why: "È esattamente il massimo." },
      { text: "`65535` in un `char`", bucket: 0, why: "`char` va da 0 a 65 535." },
      { text: "`-1` in un `char`", bucket: 1, why: "`char` non ha valori negativi." },
      { text: "`3000000000` in un `int`", bucket: 1, why: "Il massimo di `int` è circa 2,1 miliardi." },
      { text: "`3000000000` in un `long`", bucket: 0, why: "`long` arriva a circa 9,2 × 10<sup>18</sup>." }
    ],
    explain: "Per scegliere un tipo intero bisogna conoscerne l'intervallo: `byte` da −128 a 127, `short` da −32 768 a 32 767, `char` da 0 a 65 535, `int` circa ± 2,1 miliardi, `long` circa ± 9,2 × 10<sup>18</sup>."
  },
  {
    id: "t19", type: "truefalse",
    title: "Caratteristiche dei tipi primitivi",
    prompt: "Vero o falso?",
    items: [
      { text: "Un valore `char` si scrive tra apici singoli, ad esempio `'a'`.", answer: true },
      { text: "`'7'` e `7` rappresentano lo stesso valore.", answer: false, why: "`'7'` è un carattere, il cui codice numerico è 55." },
      { text: "Un `float` occupa meno memoria di un `double`.", answer: true, why: "32 bit contro 64." },
      { text: "Un `long` può contenere numeri con la virgola.", answer: false, why: "`long` è un tipo intero." },
      { text: "Un numero intero scritto nel codice, come `42`, è di tipo `int`.", answer: true },
      { text: "Un numero decimale scritto nel codice, come `4.2`, è di tipo `float`.", answer: false, why: "È di tipo `double`; per un `float` serve il suffisso `f`." }
    ],
    explain: "I letterali interi sono `int` e quelli decimali sono `double`, salvo l'uso dei suffissi `L` e `f`."
  },

  { section: "Valori letterali e dichiarazioni" },
  {
    id: "t5", type: "bug",
    title: "Dichiarazioni non valide",
    prompt: "Ogni riga dichiara una variabile. <strong>5 righe</strong> non compilano: trovale tutte.",
    code: `int anni = 17;
long stelle = 300000000000;
float pi = 3.14;
double peso = 65;
char voto = 'A';
boolean promosso = 1;
byte livello = 130;
short passi = 30000;
char doppia = 'AB';`,
    bugs: [2, 3, 6, 7, 9],
    notes: {
      2: "Numero troppo grande per un `int`: serve il suffisso `L` → `300000000000L`.",
      3: "`3.14` è un `double`: per un `float` serve `3.14f`.",
      6: "Un `boolean` accetta solo `true` o `false`.",
      7: "130 supera il massimo di `byte` (127).",
      9: "Un `char` contiene <em>un solo</em> carattere."
    },
    hint: "Controlla i suffissi `L` e `f`, gli intervalli dei tipi e cosa può contenere un `char`.",
    explain: "Attenzione alla riga 4: `double peso = 65;` è corretta, perché l'intero 65 viene convertito automaticamente in `65.0`. Anche `short passi = 30000;` va bene: il massimo di `short` è 32 767."
  },
  {
    id: "t6", type: "fill",
    title: "Tipi e suffissi dei letterali",
    prompt: "Completa tipi e suffissi. Scegli il tipo <strong>più adatto</strong> e ricorda le lettere finali dei letterali.",
    code: `[[long]] popolazione = 8000000000[[L|l]];
[[float]] altezza = 1.75[[f|F]];
[[char]] iniziale = 'M';
[[boolean]] maggiorenne = true;
[[double]] pigreco = 3.14159265358979;`,
    hint: "Un intero troppo grande per un `int` ha bisogno di una lettera finale. Anche un decimale `float`.",
    explain: "`L` indica un letterale `long` (meglio maiuscola: la `l` minuscola si confonde con `1`). `f` indica un letterale `float`: senza, `1.75` sarebbe un `double`. I decimali senza suffisso sono `double`."
  },
  {
    id: "t7", type: "order",
    title: "Conversioni automatiche",
    prompt: "Ordina i tipi numerici dal più \"piccolo\" al più \"grande\" seguendo la catena delle <strong>conversioni automatiche</strong>: ogni tipo può essere assegnato senza cast a quelli che stanno sotto.",
    lines: ["byte", "short", "int", "long", "float", "double"],
    explain: "`byte` → `short` → `int` → `long` → `float` → `double`. Nota: `long` (64 bit) passa automaticamente a `float` (32 bit) perché `float` copre un intervallo più ampio, anche se con meno precisione. E `char` passa automaticamente a `int`."
  },

  {
    id: "t20", type: "classify",
    title: "Tipo dei letterali",
    prompt: "Di che tipo è ciascun valore scritto nel codice?",
    buckets: ["int", "long", "float", "double", "char", "boolean"],
    items: [
      { text: "`42`", bucket: 0 },
      { text: "`42L`", bucket: 1, why: "Il suffisso `L` indica un `long`." },
      { text: "`4.2`", bucket: 3, why: "I decimali senza suffisso sono `double`." },
      { text: "`4.2f`", bucket: 2, why: "Il suffisso `f` indica un `float`." },
      { text: "`4.0`", bucket: 3, why: "Il punto decimale lo rende un `double`, anche se la parte decimale è zero." },
      { text: "`'4'`", bucket: 4, why: "Tra apici singoli: un carattere." },
      { text: "`false`", bucket: 5 }
    ],
    explain: "Il tipo di un letterale dipende dalla sua forma: presenza del punto decimale, suffissi `L` e `f`, apici singoli, parole `true` e `false`."
  },
  {
    id: "t21", type: "fill",
    title: "Il tipo intero più piccolo",
    prompt: "Per ogni variabile scrivi il tipo intero (`byte`, `short`, `int`, `long`) <strong>più piccolo</strong> che può contenere il valore.",
    code: `[[byte]] a = 100;
[[short]] b = 1000;
[[int]] c = 100000;
[[long]] d = 10000000000L;
[[byte]] e = -128;
[[short]] f = 128;`,
    hint: "Ricorda i valori massimi: `byte` 127, `short` 32 767, `int` circa 2,1 miliardi.",
    explain: "128 non rientra in un `byte` (massimo 127), mentre −128 sì, perché è il minimo. 100 000 supera il massimo di `short`; 10 miliardi supera quello di `int`."
  },

  { section: "Operazioni e overflow" },
  {
    id: "t8", type: "output",
    title: "Divisione intera e resto",
    prompt: "Cosa stampa?",
    code: `int a = 7;
int b = 2;
System.out.println(a / b);
System.out.println(a % b);
System.out.println(a / 2.0);`,
    answer: "3\n1\n3.5",
    explain: "Tra due `int` la divisione è <strong>intera</strong>: i decimali vengono scartati (7 / 2 = 3). `%` dà il resto (1). Se uno dei due operandi è `double` (2.0), il risultato è `double`: 3.5."
  },
  {
    id: "t9", type: "output",
    title: "Espressioni miste",
    prompt: "Cosa stampa?",
    code: `int a = 5;
double b = 2;
System.out.println(a / 2);
System.out.println(a / b);
System.out.println(b);`,
    answer: "2\n2.5\n2.0",
    hint: "Una variabile `double` viene stampata sempre con la parte decimale, anche se vale un numero intero.",
    explain: "`a / 2` è tra interi → 2. In `a / b` il valore di `a` viene promosso a `double`, quindi 2.5. `double b = 2;` memorizza 2.0, e così viene stampato."
  },
  {
    id: "t10", type: "output",
    title: "Overflow di un byte",
    prompt: "Cosa stampa?",
    code: `byte b = 127;
b++;
System.out.println(b);`,
    answer: "-128",
    hint: "Si può usare lo strumento «Rappresentazione binaria» in cima alla pagina.",
    explain: "Il `byte` arriva al massimo a 127. Aggiungendo 1 c'è un <strong>overflow</strong>: il valore \"fa il giro\" e riparte dal minimo, -128. Java non segnala alcun errore."
  },
  {
    id: "t11", type: "output",
    title: "Overflow di un byte (2)",
    prompt: "Cosa stampa?",
    code: `byte b = 120;
b += 10;
System.out.println(b);`,
    answer: "-126",
    hint: "Dopo 127 si riparte da -128. Conta: 128, 129, 130…",
    explain: "120 + 10 = 130, ma il massimo è 127. Lo si supera di 3: 127 → -128 (1 passo), -127 (2), -126 (3). In formula: 130 − 256 = −126."
  },
  {
    id: "t12", type: "quiz",
    title: "Overflow di un int",
    prompt: "Cosa stampa?",
    code: `int x = 2147483647;
x = x + 1;
System.out.println(x);`,
    options: ["`2147483648`", "`-2147483648`", "`0`", "Errore di compilazione"],
    answer: 1,
    why: [
      "2147483648 non è rappresentabile con un `int`: è oltre il massimo.",
      "",
      "Non si azzera: riparte dal valore minimo.",
      "Il codice compila: l'overflow avviene durante l'esecuzione, senza errori."
    ],
    explain: "2 147 483 647 è il massimo di `int`. Come per il `byte`, aggiungendo 1 si riparte dal minimo: −2 147 483 648. Se servono numeri più grandi si usa `long`."
  },

  {
    id: "t22", type: "quiz",
    title: "Operatori di assegnamento composti",
    prompt: "Quanto vale `x` al termine di queste istruzioni?",
    code: `int x = 5;
x += 3;
x *= 2;
x--;`,
    options: ["`16`", "`15`", "`14`", "`7`"],
    answer: 1,
    why: [
      "Dopo `x *= 2` vale 16, ma l'istruzione successiva lo modifica.",
      "",
      "`x--` sottrae 1 una sola volta.",
      "`x *= 2` moltiplica per 2, non divide."
    ],
    explain: "`x += 3` equivale a `x = x + 3` (8); `x *= 2` equivale a `x = x * 2` (16); `x--` sottrae 1 (15)."
  },
  {
    id: "t23", type: "output",
    title: "Overflow prima dell'assegnazione",
    prompt: "Cosa stampa?",
    code: `int a = 100000;
int b = 100000;
long p1 = a * b;
long p2 = (long) a * b;
System.out.println(p1);
System.out.println(p2);`,
    answer: "1410065408\n10000000000",
    hint: "In `a * b` entrambi gli operandi sono `int`: di che tipo è il risultato del prodotto?",
    explain: "In `a * b` il prodotto viene calcolato come `int` <strong>prima</strong> di essere assegnato al `long`: 10 000 000 000 supera il massimo di `int` e va in overflow (10 000 000 000 − 2 × 4 294 967 296 = 1 410 065 408). In `(long) a * b` il cast trasforma `a` in `long`, quindi il prodotto viene calcolato a 64 bit."
  },

  { section: "Conversioni e cast" },
  {
    id: "t13", type: "classify",
    title: "Conversioni e cast",
    prompt: "Per ogni coppia di istruzioni, decidi cosa serve per la <strong>seconda</strong> assegnazione.",
    buckets: ["Automatica", "Serve il cast", "Impossibile"],
    items: [
      { text: "`int i = 10;  long l = i;`", bucket: 0, why: "Da 32 a 64 bit: nessuna perdita." },
      { text: "`double d = 3.9;  int i = d;`", bucket: 1, why: "Si perdono i decimali: serve `(int) d`." },
      { text: "`char c = 'A';  int i = c;`", bucket: 0, why: "`char` → `int` è automatica: `i` vale 65." },
      { text: "`int n = 66;  char c = n;`", bucket: 1, why: "Da `int` a `char` serve `(char) n`." },
      { text: "`boolean b = true;  int i = b;`", bucket: 2, why: "`boolean` non si converte in nessun tipo numerico." },
      { text: "`float f = 2.5f;  double d = f;`", bucket: 0, why: "Da 32 a 64 bit decimali: nessuna perdita." },
      { text: "`short s = 10;  byte b = s;`", bucket: 1, why: "Da 16 a 8 bit: serve `(byte) s`." },
      { text: "`int x = 1;  boolean ok = (boolean) x;`", bucket: 2, why: "Neanche il cast può trasformare un numero in `boolean`." },
      { text: "`long l = 100L;  float f = l;`", bucket: 0, why: "`long` → `float` è automatica (vedi l'esercizio sulle conversioni automatiche)." }
    ],
    hint: "Verso un tipo più \"grande\" → automatica. Verso uno più \"piccolo\" → cast. `boolean` non si mescola con i numeri.",
    explain: "Le conversioni che <strong>allargano</strong> sono automatiche; quelle che <strong>restringono</strong> (rischio di perdere informazioni) richiedono il cast esplicito `(tipo)`. `boolean` è un mondo a parte."
  },
  {
    id: "t14", type: "output",
    title: "Cast da double a int",
    prompt: "Cosa stampa?",
    code: `double d = 9.99;
int i = (int) d;
System.out.println(i);
System.out.println((int) -2.7);
System.out.println((int) 3.5 + 0.5);`,
    answer: "9\n-2\n3.5",
    hint: "Il cast non arrotonda. E si applica solo al valore che ha subito a destra.",
    explain: "Il cast a `int` <strong>tronca</strong> i decimali, non arrotonda: 9.99 → 9 e −2.7 → −2. Nell'ultima riga il cast vale solo per `3.5` (che diventa 3), poi si somma 0.5 come `double`: 3.5."
  },
  {
    id: "t15", type: "output",
    title: "Il tipo char come numero",
    prompt: "Cosa stampa?",
    code: `char c = 'A';
int n = c + 2;
char d = (char) n;
System.out.println(n);
System.out.println(d);`,
    answer: "67\nC",
    hint: "Ogni carattere ha un codice numerico: 'A' vale 65.",
    explain: "Un `char` è in realtà un numero a 16 bit (il codice Unicode del carattere). `c + 2` dà l'`int` 67; con il cast `(char)` torna a essere un carattere: C."
  },
  {
    id: "t16", type: "quiz",
    title: "Promozione a int",
    prompt: "Questo codice compila?",
    code: `byte a = 10;
byte b = 20;
byte c = a + b;`,
    options: ["Sì, `c` vale 30", "No: `a + b` è un `int` e serve il cast", "No: 30 è troppo grande per un `byte`", "Sì, ma `c` vale -30"],
    answer: 1,
    why: [
      "Sembra logico, ma in Java un'operazione aritmetica tra `byte` produce un `int`.",
      "",
      "30 ci sta benissimo in un `byte` (max 127): il problema è un altro.",
      "Non c'è nessun overflow: 30 è nell'intervallo."
    ],
    explain: "Nelle espressioni aritmetiche `byte`, `short` e `char` vengono <strong>promossi a `int`</strong>. Quindi `a + b` è un `int`, e per assegnarlo a un `byte` serve il cast: `byte c = (byte) (a + b);`"
  },
  {
    id: "t17", type: "quiz",
    title: "Precisione dei double",
    prompt: "Cosa stampa `System.out.println(0.1 + 0.2);`?",
    options: ["`0.3`", "`0.30000000000000004`", "`0.3000000`", "Errore di compilazione"],
    answer: 1,
    why: [
      "Sarebbe logico… ma un `double` non rappresenta esattamente tutti i decimali.",
      "",
      "Java non aggiunge zeri in questo modo.",
      "Il codice è valido."
    ],
    explain: "I `double` sono memorizzati in binario, e 0.1 o 0.2 non hanno una rappresentazione binaria esatta (come 1/3 in decimale: 0,333…). Piccoli errori di approssimazione sono normali con i decimali."
  },
  {
    id: "t24", type: "output",
    title: "Operazioni sui caratteri",
    prompt: "Cosa stampa?",
    code: `char c = 'a';
c++;
System.out.println(c);
System.out.println(c + 1);
System.out.println((char) (c + 1));`,
    answer: "b\n99\nc",
    hint: "`c + 1` è un'espressione aritmetica: di che tipo è il risultato?",
    explain: "`c++` porta il carattere al successivo: 'b', codice 98. `c + 1` è un `int` e viene stampato come numero (99). Con il cast `(char)` il valore 99 torna a essere un carattere: 'c'."
  },
  {
    id: "t25", type: "bug",
    title: "Cast mancanti e cast impossibili",
    prompt: "<strong>3 righe</strong> non compilano. Trovale.",
    code: `double prezzo = 9.99;
int euro = prezzo;
int centesimi = (int) (prezzo * 100) % 100;
float sconto = 0.5;
long grande = 3000000000L;
int piccolo = (int) grande;
boolean pari = (boolean) (euro % 2);
double codice = 'A';
byte b = (byte) 200;`,
    bugs: [2, 4, 7],
    notes: {
      2: "Da `double` a `int` serve il cast: `(int) prezzo`.",
      4: "`0.5` è un `double`: serve `0.5f`.",
      7: "Nessun cast può trasformare un numero in `boolean`."
    },
    hint: "Si cercano solo gli errori di compilazione: una riga può compilare anche se produce un valore inatteso.",
    explain: "Le righe 6 e 9 compilano grazie al cast, anche se il valore cambia per overflow (`piccolo` vale −1294967296, `b` vale −56). La riga 8 compila perché `char` → `double` è una conversione automatica: `codice` vale 65.0."
  }
];
