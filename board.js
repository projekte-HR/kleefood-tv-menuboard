/* ============================================================================
   KLEEFOOD – GEMEINSAME LOGIK FÜR ALLE DREI SCREENS

   Neu aufgebaut für das Magazin-Design.

   Die drei Screens arbeiten NICHT mehr zusammen: jeder blättert für sich,
   mit eigener Seitendauer. Kein Abgleich über die Uhrzeit, keine gemeinsame
   Lichtwelle. Dadurch ist jedes Gerät unabhängig – fällt eins aus oder wird
   neu gestartet, stört das die anderen nicht.

   Inhalte und Preise stehen in menu.js, das Aussehen in board.css.
   ========================================================================= */

/* SEITE_S wird in der jeweiligen HTML-Datei gesetzt, sonst gilt dieser Wert */
if (typeof SEITE_S === 'undefined') { var SEITE_S = 13; }

/* ------------------------------------------------------------- Bausteine */
function schilder(it){
  return (it.top ? '<span class="schild top">★ TOP</span>' : '') +
         (it.veg ? '<span class="schild veg">VEGGIE</span>' : '');
}

function zeile(it, i){
  return '<div class="zeile' + (it.top ? ' top' : '') + '" style="--i:' + i + '">' +
           '<div class="nr">' + (it.no || '') + '</div>' +
           '<div class="text">' +
             '<div class="name">' + it.nm + schilder(it) + '</div>' +
             (it.ig ? '<div class="zutaten">' + it.ig + '</div>' : '') +
           '</div>' +
           '<div class="preis">' + it.pr + '</div>' +
           (it.pr2 !== undefined ? '<div class="preis zwei">' + it.pr2 + '</div>' : '') +
         '</div>';
}

/* Kategorie-Kopf: Titel, Nummernbereich, aufziehender Strich, Größen */
function kopfzeile(sec){
  return '<div class="kopfzeile">' +
           '<div class="titel">' + sec.titel + '</div>' +
           (sec.nummern ? '<div class="nummern">' + sec.nummern + '</div>' : '') +
           '<div class="strich"><i></i></div>' +
           (sec.groessen
             ? '<div class="groessen"><span>' + sec.groessen.join('</span><span>') + '</span></div>'
             : '') +
         '</div>';
}

/* Eine Kategorie als Magazin-Block: Kopf, darunter zwei Spalten.
   "von" und "bis" schneiden einen Ausschnitt der Liste heraus.             */
function block(sec, von, bis){
  var items = sec.items.slice(von || 0, bis === undefined ? sec.items.length : bis);
  var mitte = Math.ceil(items.length / 2);
  var links = '', rechts = '';
  for (var i = 0; i < items.length; i++){
    if (i < mitte) links  += zeile(items[i], i);
    else           rechts += zeile(items[i], i);
  }
  return '<div class="block">' +
           kopfzeile(sec) +
           (sec.hinweis ? '<div class="hinweis">' + sec.hinweis + '</div>' : '') +
           '<div class="spalten">' +
             '<div class="spalte">' + links + '</div>' +
             (rechts ? '<div class="spalte">' + rechts + '</div>' : '') +
           '</div>' +
           (sec.fuss ? '<div class="fuss">' + sec.fuss + '</div>' : '') +
         '</div>';
}

/* Kurze Liste, die nicht geteilt werden soll – eine Spalte, volle Breite */
function blockEinspaltig(sec, von, bis){
  var items = sec.items.slice(von || 0, bis === undefined ? sec.items.length : bis);
  var zeilen = '';
  for (var i = 0; i < items.length; i++) zeilen += zeile(items[i], i);
  return '<div class="block">' +
           kopfzeile(sec) +
           (sec.hinweis ? '<div class="hinweis">' + sec.hinweis + '</div>' : '') +
           '<div class="spalten"><div class="spalte">' + zeilen + '</div></div>' +
           (sec.fuss ? '<div class="fuss">' + sec.fuss + '</div>' : '') +
         '</div>';
}

/* Dips als zweispaltiges Raster kleiner Felder */
function dipBlock(sec){
  var felder = '';
  for (var i = 0; i < sec.items.length; i++){
    var it = sec.items[i];
    felder += '<div class="dip" style="--i:' + i + '">' +
                '<span>' + it.no + ' ' + it.nm + '</span><b>' + it.pr + '</b>' +
              '</div>';
  }
  return '<div class="block">' + kopfzeile(sec) +
         '<div class="dipraster">' + felder + '</div></div>';
}

function aktionBlock(){
  return '<div class="aktion">' +
           '<span class="k">' + AKTION.titel + '</span>' +
           '<span class="w">' + AKTION.was + '</span>' +
           '<span class="p">' + AKTION.preis + '</span>' +
           '<span class="i">' + AKTION.info + '</span>' +
         '</div>';
}

/* Die Foto-Spalte des Magazins */
function foto(bild, titel, unter, preis){
  return '<div class="fotospalte">' +
           '<div class="foto" style="background-image:url(' + bild + BILD_VERSION + ')"></div>' +
           '<div class="glanz"></div>' +
           '<div class="blende"></div>' +
           '<div class="text">' +
             '<div class="t">' + titel + '</div>' +
             (unter ? '<div class="u">' + unter + '</div>' : '') +
             (preis ? '<div class="p">' + preis + '</div>' : '') +
           '</div>' +
         '</div>';
}

/* Eine Magazinseite: links das Foto, rechts die Blöcke */
function seite(fotoHtml, inhalt){
  return '<div class="buehne">' + fotoHtml +
         '<div class="listespalte">' + inhalt + '</div></div>';
}

/* Screen 3: ein Spar Menü groß, die übrigen klein darunter */
function menueSeite(n){
  var m = SPAR.items[n], klein = '';
  for (var i = 0; i < SPAR.items.length; i++){
    var k = SPAR.items[i];
    klein += '<div class="kleinmenue' + (i === n ? ' an' : '') + '">' +
               '<div class="n">' + k.nm + '</div>' +
               '<div class="pr">' + k.pr + '</div>' +
             '</div>';
  }
  return '<div class="buehne">' +
           foto(m.img, m.nm, m.ig, m.pr) +
           '<div class="listespalte"><div class="kleinliste">' + klein + '</div></div>' +
         '</div>';
}

function laufband(text){
  return '<div class="band"><span>' + text + '</span><span>' + text + '</span></div>';
}

/* --------------------------------------------------------- Seitenwechsel */
var seitenKnoten = [], punkteKnoten = [], seitenAnzahl = 0, aktuell = 0, festeSeite = null;

function zeigeSeite(n){
  aktuell = n;
  for (var i = 0; i < seitenKnoten.length; i++){
    var an = (i === n);
    seitenKnoten[i].className = 'seite' + (an ? ' aktiv' : '');
    if (punkteKnoten[i]) punkteKnoten[i].className = an ? 'an' : '';
  }
}

function weiter(){
  if (festeSeite !== null) return;
  zeigeSeite((aktuell + 1) % seitenAnzahl);
}

/* ----------------------------------------- Bühne skalieren und drehen */
function merker(schluessel, wert){
  try {
    if (wert === undefined) return localStorage.getItem('kleefood-' + schluessel);
    localStorage.setItem('kleefood-' + schluessel, wert);
  } catch (e) { return null; }
}

var drehRichtung = +(merker('drehung') || 270);

/* RANDFAKTOR – das Bild füllt den Fernseher voll aus (1.00).
   Schneidet ein Fernseher am Rand etwas weg (Overscan), lässt sich das am
   Gerät nachstellen: Pfeil hoch größer, Pfeil runter kleiner, Taste 0 zurück
   auf volle Fläche. Der Wert bleibt im Gerät gespeichert.                  */
var randFaktor = +(merker('rand') || 1);

function einpassen(){
  var stage = document.getElementById('stage');
  var hoch  = stage.className.indexOf('hoch') >= 0;
  var drehen = (hoch && innerWidth >= innerHeight) ? drehRichtung : 0;
  var b = hoch ? 1080 : 1920, h = hoch ? 1920 : 1080;
  if (drehen) { var t = b; b = h; h = t; }
  var s = Math.min(innerWidth / b, innerHeight / h) * randFaktor;
  stage.style.transform = 'rotate(' + drehen + 'deg) scale(' + s + ')';
}

function randAnzeigen(){
  var el = document.getElementById('randwert');
  if (!el){
    el = document.createElement('div');
    el.id = 'randwert';
    el.style.cssText = 'position:fixed;left:50%;top:50%;margin:-42px 0 0 -130px;width:260px;' +
      'text-align:center;font:900 34px Montserrat,Arial,sans-serif;color:#fff;' +
      'background:rgba(0,0,0,.85);border:2px solid #E73329;border-radius:14px;' +
      'padding:18px 0;z-index:99;';
    document.body.appendChild(el);
  }
  el.textContent = 'Größe ' + Math.round(randFaktor * 100) + ' %';
  el.style.display = 'block';
  clearTimeout(randAnzeigen.t);
  randAnzeigen.t = setTimeout(function(){ el.style.display = 'none'; }, 1800);
}

function randAendern(delta){
  randFaktor = Math.min(1, Math.max(0.7, Math.round((randFaktor + delta) * 100) / 100));
  merker('rand', randFaktor);
  einpassen();
  randAnzeigen();
}

/* ------------------------------------------------------------------ Start */
/* seiten: Liste von HTML-Stücken, eines je Seite.                          */
function starten(seiten){
  var behaelter = document.getElementById('seiten');
  var punkte    = document.getElementById('punkte');
  seitenAnzahl  = seiten.length;

  var html = '', p = '';
  for (var i = 0; i < seiten.length; i++){
    html += '<div class="seite">' + seiten[i] + '</div>';
    p    += '<i></i>';
  }
  behaelter.innerHTML = html;
  if (punkte) punkte.innerHTML = p;
  seitenKnoten = behaelter.children;
  punkteKnoten = punkte ? punkte.children : [];

  /* Zum Prüfen einer einzelnen Seite: ?seite=0 bis 3 hält sie fest */
  var m = location.search.match(/[?&]seite=(\d+)/);
  if (m) festeSeite = Math.min(+m[1], seitenAnzahl - 1);

  zeigeSeite(festeSeite !== null ? festeSeite : 0);
  einpassen();
  if (festeSeite === null) setInterval(weiter, SEITE_S * 1000);

  addEventListener('resize', einpassen);
  addEventListener('keydown', function(e){
    var k = e.key ? e.key.toLowerCase() : '';
    if (k === 'r'){                       /* Drehrichtung von Screen 3 */
      drehRichtung = (drehRichtung === 270) ? 90 : 270;
      merker('drehung', drehRichtung);
      einpassen();
    }
    else if (k === '+' || k === '=' || k === 'arrowup')   randAendern(+0.01);
    else if (k === '-' || k === '_' || k === 'arrowdown') randAendern(-0.01);
    else if (k === '0'){ randFaktor = 1; merker('rand', 1); einpassen(); randAnzeigen(); }
  });
}
