/* ============================================================================
   KLEEFOOD – GEMEINSAME LOGIK FÜR ALLE DREI SCREENS

   Aufgaben:
     1. Listen, Bildfenster, Spar Menü und Dips aufbauen (aus menu.js)
     2. Bühne auf das tatsächliche TV-Signal skalieren, Screen 3 drehen
     3. GLEICHTAKT: alle Dauer-Animationen hängen an der Uhrzeit, dadurch
        laufen die drei TVs im selben Rhythmus, ohne miteinander zu reden
   ========================================================================= */

/* --------------------------------------------------------------- Gleichtakt */
/* Grundtakt in Sekunden. Alle Dauer-Animationen sind Teiler oder Vielfache
   davon, damit sie gemeinsam wieder am Anfang stehen.                        */
var TAKT = 24;

/* Setzt bei jeder Dauer-Animation ein negatives animation-delay, das der
   aktuellen Uhrzeit entspricht. Zwei Geräte, die um 14:07:03 laufen, stehen
   damit an derselben Stelle der Animation – egal wann sie gestartet sind. */
function gleichtakt(){
  var jetzt = Date.now() / 1000;
  var dauern = { drift: 48, atmen: 24, laufen: 48 };   // muss zu board.css passen
  var auswahl = [
    ['#wolken',        'drift'],
    ['.bild .foto',    'atmen'],
    ['#laufband .band','laufen']
  ];
  for (var a = 0; a < auswahl.length; a++){
    var knoten = document.querySelectorAll(auswahl[a][0]);
    var dauer  = dauern[auswahl[a][1]];
    for (var b = 0; b < knoten.length; b++){
      knoten[b].style.animationDelay = '-' + (jetzt % dauer).toFixed(2) + 's';
    }
  }
}

/* ------------------------------------------------------------ Bausteine */
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

/* Eine Kategorie mit rotem Schrägbalken, Nummernbereich und Liste */
function block(sec){
  var rechts = sec.groessen
    ? '<div class="groessen"><span>' + sec.groessen.join('</span><span>') + '</span></div>'
    : '<div class="strich"></div>';
  var zeilen = '';
  for (var i = 0; i < sec.items.length; i++) zeilen += zeile(sec.items[i], i);
  return '<div class="block">' +
           '<div class="kopfzeile">' +
             '<div class="balken"><span>' + sec.titel + '</span></div>' +
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
             '<div class="balken"><span>' + sec.titel + '</span></div>' +
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

/* Bildfenster mit Beschriftung */
function bildBlock(bild, titel, unter, preis, hoehe){
  return '<div class="bild" style="height:' + hoehe + 'px">' +
           '<div class="foto" style="background-image:url(' + bild + BILD_VERSION + ')"></div>' +
           '<div class="schatten"></div>' +
           '<div class="text"><div class="t">' + titel + '<b>' + unter + '</b></div>' +
           '<div class="p">' + preis + '</div></div>' +
         '</div>';
}

/* Die vier Spar Menüs für Screen 3 */
function menueKarten(){
  var html = '';
  for (var i = 0; i < SPAR.items.length; i++){
    var m = SPAR.items[i];
    html += '<div class="menue' + (i === 0 ? ' hell' : '') + '" style="--i:' + i + '">' +
              '<div class="foto" style="background-image:url(' + m.img + BILD_VERSION + ')">' +
                '<div class="blende"></div><div class="nr">' + m.no + '</div>' +
              '</div>' +
              (m.neu ? '<span class="schild neu neu">NEU</span>' : '') +
              '<div class="inhalt">' +
                '<div class="name">' + m.nm + '</div>' +
                '<div class="zutaten">' + m.ig + '</div>' +
                '<div class="preis">' + m.pr + '</div>' +
              '</div>' +
            '</div>';
  }
  return html;
}

function laufband(text){
  return '<div class="band"><span>' + text + '</span><span>' + text + '</span></div>';
}

/* ------------------------------------------- Bühne skalieren und drehen */
/* Querformat-Signal bei einem hochkant montierten TV -> Bühne drehen.
   Taste "R" kehrt die Drehrichtung um, die Wahl wird gemerkt.            */
function merker(wert){
  try {
    if (wert === undefined) return localStorage.getItem('kleefood-drehung');
    localStorage.setItem('kleefood-drehung', wert);
  } catch (e) { return null; }
}

var drehRichtung = +(merker() || 270);

function einpassen(){
  var stage = document.getElementById('stage');
  var hoch  = stage.className.indexOf('hoch') >= 0;
  var drehen = (hoch && innerWidth >= innerHeight) ? drehRichtung : 0;
  var b = hoch ? 1080 : 1920, h = hoch ? 1920 : 1080;
  if (drehen) { var t = b; b = h; h = t; }
  var s = Math.min(innerWidth / b, innerHeight / h);
  stage.style.transform = 'rotate(' + drehen + 'deg) scale(' + s + ')';
}

/* ------------------------------------------------------------- Start */
function starten(){
  var stage = document.getElementById('stage');
  einpassen();
  gleichtakt();
  stage.className += ' an';          // Einblendung einmal laufen lassen

  addEventListener('resize', einpassen);
  addEventListener('keydown', function(e){
    if (e.key && e.key.toLowerCase() === 'r'){
      drehRichtung = (drehRichtung === 270) ? 90 : 270;
      merker(drehRichtung);
      einpassen();
    }
  });

  /* Die Uhr läuft weiter, die Animationen laufen endlos – nach einer Stunde
     einmal nachjustieren, damit kleine Abweichungen nicht auflaufen. */
  setInterval(gleichtakt, 3600000);
}
