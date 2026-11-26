/* ============================================================================
   KLEEFOOD – GEMEINSAME LOGIK FÜR ALLE DREI SCREENS

     1. Bausteine aus menu.js zu Tafeln zusammensetzen
     2. Seiten im Gleichtakt umblättern – die Seitennummer kommt aus der
        Uhrzeit, nicht aus einem Timer ab Ladezeit. Dadurch zeigen alle drei
        Geräte dieselbe Seite und blättern in derselben Sekunde um.
     3. LICHTWELLE: läuft von Screen 1 über Screen 2 nach Screen 3, als wären
        die drei Bildschirme eine Fläche. Der Versatz kommt aus SCREEN.
     4. Bühne auf das TV-Signal skalieren, Screen 3 drehen
   ========================================================================= */

var SEITE_S         = 12;    // Sekunden je Seite
var WELLE_VERSATZ_S = 0.6;   // Vorsprung von Screen zu Screen
var WELLE_TAKT_S    = 12;    // muss zur animation-duration von #welle passen

/* SCREEN wird in der jeweiligen HTML-Datei gesetzt: 1, 2 oder 3 */
if (typeof SCREEN === 'undefined') { var SCREEN = 1; }

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

/* Eine Kategorie. "von" und "bis" schneiden einen Ausschnitt heraus,
   damit eine lange Liste über mehrere Seiten laufen kann.                  */
function block(sec, von, bis){
  var items = sec.items.slice(von || 0, bis === undefined ? sec.items.length : bis);
  var rechts = sec.groessen
    ? '<div class="groessen"><span>' + sec.groessen.join('</span><span>') + '</span></div>'
    : '<div class="strich"></div>';
  var zeilen = '';
  for (var i = 0; i < items.length; i++) zeilen += zeile(items[i], i);
  return '<div class="block">' +
           '<div class="kopfzeile">' +
             '<div class="neonschild"><span>' + sec.titel + '</span></div>' +
             (sec.nummern ? '<div class="nummern">' + sec.nummern + '</div>' : '') +
             rechts +
           '</div>' +
           (sec.hinweis ? '<div class="hinweis">' + sec.hinweis + '</div>' : '') +
           zeilen +
           (sec.fuss ? '<div class="fuss">' + sec.fuss + '</div>' : '') +
         '</div>';
}

function dipBlock(sec){
  var felder = '';
  for (var i = 0; i < sec.items.length; i++){
    var it = sec.items[i];
    felder += '<div class="dip"><span>' + it.no + ' ' + it.nm + '</span><b>' + it.pr + '</b></div>';
  }
  return '<div class="block">' +
           '<div class="kopfzeile">' +
             '<div class="neonschild"><span>' + sec.titel + '</span></div>' +
             '<div class="nummern">' + sec.nummern + '</div><div class="strich"></div>' +
           '</div>' +
           '<div class="dipraster">' + felder + '</div>' +
         '</div>';
}

function aktionBlock(){
  return '<div class="aktion">' +
           '<span class="k">' + AKTION.titel + '</span>' +
           '<span class="w">' + AKTION.was + '</span>' +
           '<span class="p">' + AKTION.preis + '</span>' +
           '<span class="i">' + AKTION.info + '</span>' +
         '</div>';
}

function sparBlock(){
  var zeilen = '';
  for (var i = 0; i < SPAR.items.length; i++){
    var m = SPAR.items[i];
    zeilen += '<div class="sparzeile" style="--i:' + i + '">' +
                '<div class="text">' +
                  '<div class="name">' + m.nm + (m.neu ? '<span class="schild neu">NEU</span>' : '') + '</div>' +
                  '<div class="zutaten">' + m.ig + '</div>' +
                '</div>' +
                '<div class="preis">' + m.pr + '</div>' +
              '</div>';
  }
  return '<div class="sparkopf"><span class="t">SPAR <em>MENÜ</em></span>' +
         '<span class="ab">' + SPAR.ab + '</span></div>' +
         '<div class="sparinfo">' + SPAR.info + '</div>' + zeilen;
}

function bildBlock(bild, titel, unter, preis, hoehe){
  return '<div class="bild" style="height:' + hoehe + 'px">' +
           '<div class="foto" style="background-image:url(' + bild + BILD_VERSION + ')"></div>' +
           '<div class="schatten"></div>' +
           '<div class="text"><div class="t">' + titel + '<b>' + unter + '</b></div>' +
           '<div class="p">' + preis + '</div></div>' +
         '</div>';
}

/* Ein Spar Menü bildschirmfüllend – für Screen 3 */
function grossesMenue(i){
  var m = SPAR.items[i];
  return '<div class="grossmenue">' +
           '<div class="foto" style="background-image:url(' + m.img + BILD_VERSION + ')">' +
             '<div class="nr">' + m.no + '</div>' +
             (m.neu ? '<span class="schild neu neu">NEU</span>' : '') +
           '</div>' +
           '<div class="unten">' +
             '<div class="name">' + m.nm + '</div>' +
             '<div class="zutaten">' + m.ig + '</div>' +
             '<div class="preis">' + m.pr + '</div>' +
           '</div>' +
         '</div>';
}

function tafel(inhalt){ return '<div class="tafel">' + inhalt + '</div>'; }

function laufband(text){
  return '<div class="band"><span>' + text + '</span><span>' + text + '</span></div>';
}

/* ------------------------------------------------ Seiten und Gleichtakt */
var seitenKnoten = [], punkteKnoten = [], seitenAnzahl = 0, festeSeite = null;

/* Seitennummer allein aus der Uhrzeit – deshalb überall dieselbe. */
function seiteJetzt(){
  if (festeSeite !== null) return festeSeite;
  return Math.floor(Date.now() / 1000 / SEITE_S) % seitenAnzahl;
}

function zeigeSeite(){
  var n = seiteJetzt();
  for (var i = 0; i < seitenKnoten.length; i++){
    var an = (i === n);
    seitenKnoten[i].className = 'seite' + (an ? ' aktiv' : '');
    if (punkteKnoten[i]) punkteKnoten[i].className = an ? 'an' : '';
  }
}

/* Nicht alle 12 s ab Ladezeit, sondern immer auf die nächste volle
   Seitengrenze der Uhr – sonst driften die Geräte auseinander. */
function naechsterWechsel(){
  var ms = SEITE_S * 1000 - (Date.now() % (SEITE_S * 1000));
  setTimeout(function(){ zeigeSeite(); naechsterWechsel(); }, ms + 30);
}

/* Eine Animation auf die Uhrzeit setzen.

   Wichtig: ein nachträglich gesetztes animation-delay verschiebt die Phase,
   es korrigiert sie nicht – gerechnet wird ab dem Start der Animation, nicht
   ab jetzt. Deshalb wird die Animation zuerst neu gestartet (Reflow) und
   erst dann das Delay gesetzt. So stimmt die Phase auch beim Nachjustieren.
   Steht die Animation bereits richtig, ist nichts zu sehen.                */
function ausrichten(el, dauer, versatz){
  var phase = ((Date.now() / 1000 - (versatz || 0)) % dauer + dauer) % dauer;
  el.style.animation = 'none';
  void el.offsetWidth;                 // erzwingt den Neustart
  el.style.animation = '';
  el.style.animationDelay = '-' + phase.toFixed(2) + 's';
}

/* Die Lichtwelle startet auf Screen 2 um 0,6 s und auf Screen 3 um 1,2 s
   später als auf Screen 1 – dadurch wandert sie sichtbar nach rechts. */
function welleAusrichten(){
  var welle = document.getElementById('welle');
  if (!welle) return;
  ausrichten(welle, WELLE_TAKT_S, (SCREEN - 1) * WELLE_VERSATZ_S);
}

/* Die übrigen Dauer-Animationen ebenfalls an die Uhr hängen */
function gleichtakt(){
  welleAusrichten();
  var paare = [['.bild .foto', 24], ['.grossmenue .foto', 24], ['#laufband .band', 48]];
  for (var a = 0; a < paare.length; a++){
    var knoten = document.querySelectorAll(paare[a][0]);
    for (var b = 0; b < knoten.length; b++) ausrichten(knoten[b], paare[a][1], 0);
  }
}

/* --------------------------------------------- Bühne skalieren und drehen */
function merker(schluessel, wert){
  try {
    if (wert === undefined) return localStorage.getItem('kleefood-' + schluessel);
    localStorage.setItem('kleefood-' + schluessel, wert);
  } catch (e) { return null; }
}

var drehRichtung = +(merker('drehung') || 270);

/* RANDFAKTOR – gegen Overscan.
   Fernseher schneiden am Rand ein paar Prozent weg, der Browser merkt davon
   nichts: er meldet die volle Auflösung, das TV zeigt aber weniger. Deshalb
   wird die Bühne etwas kleiner gezeichnet und mittig gesetzt. 0,85 lässt reichlich Luft; passt bei
   den meisten Geräten; jedes TV ist anders, darum lässt es sich am Gerät
   nachstellen: Taste "+" größer, Taste "-" kleiner, "0" zurück auf 0,85.
   Der Wert bleibt im Gerät gespeichert.                                    */
var randFaktor = +(merker('rand') || 0.85);

function einpassen(){
  var stage = document.getElementById('stage');
  var hoch  = stage.className.indexOf('hoch') >= 0;
  var drehen = (hoch && innerWidth >= innerHeight) ? drehRichtung : 0;
  var b = hoch ? 1080 : 1920, h = hoch ? 1920 : 1080;
  if (drehen) { var t = b; b = h; h = t; }
  var s = Math.min(innerWidth / b, innerHeight / h) * randFaktor;
  stage.style.transform = 'rotate(' + drehen + 'deg) scale(' + s + ')';
}

/* Zeigt den eingestellten Wert kurz an, damit man beim Nachstellen sieht,
   wo man steht. */
function randAnzeigen(){
  var el = document.getElementById('randwert');
  if (!el){
    el = document.createElement('div');
    el.id = 'randwert';
    el.style.cssText = 'position:fixed;left:50%;top:50%;margin:-40px 0 0 -120px;' +
      'width:240px;text-align:center;font:700 34px Montserrat,Arial,sans-serif;' +
      'color:#fff;background:rgba(0,0,0,.82);border:2px solid #E73329;' +
      'border-radius:14px;padding:16px 0;z-index:99;';
    document.body.appendChild(el);
  }
  el.textContent = 'Rand ' + Math.round(randFaktor * 100) + ' %';
  el.style.display = 'block';
  clearTimeout(randAnzeigen.t);
  randAnzeigen.t = setTimeout(function(){ el.style.display = 'none'; }, 1800);
}

function randAendern(delta){
  randFaktor = Math.min(1, Math.max(0.6, Math.round((randFaktor + delta) * 100) / 100));
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

  zeigeSeite();
  einpassen();
  gleichtakt();
  if (festeSeite === null) naechsterWechsel();

  addEventListener('resize', einpassen);
  addEventListener('keydown', function(e){
    var k = e.key ? e.key.toLowerCase() : '';
    if (k === 'r'){
      drehRichtung = (drehRichtung === 270) ? 90 : 270;
      merker('drehung', drehRichtung);
      einpassen();
    }
    /* Overscan nachstellen – auch über die Pfeiltasten der TV-Fernbedienung */
    else if (k === '+' || k === '=' || k === 'arrowup')   randAendern(+0.01);
    else if (k === '-' || k === '_' || k === 'arrowdown') randAendern(-0.01);
    else if (k === '0'){ randFaktor = 0.85; merker('rand', 0.85); einpassen(); randAnzeigen(); }
  });

  /* Alle 30 s nachziehen. Nötig, weil Browser Animationen drosseln, wenn die
     Seite im Hintergrund liegt – danach liefe sie sonst der Uhr hinterher.
     Steht alles richtig, ist das Nachziehen unsichtbar. */
  setInterval(gleichtakt, 30000);
  document.addEventListener('visibilitychange', function(){
    if (!document.hidden) gleichtakt();
  });
}
