/* ============================================================================
   KLEEFOOD – ALLE GERICHTE UND PREISE AN EINER STELLE
   Quelle: Aufsteller "kleefood-aufsteller.pdf"

   Preis ändern? Nur hier. Alle drei Screens lesen aus dieser Datei.
   Felder:  no = Nummer · nm = Name · ig = Zutaten · pr = Preis
            pr2 = zweiter Preis (Pizza 40 cm / große Portion)
            top = Bestseller-Markierung · veg = Veggie-Markierung
   ========================================================================= */

var MENU = {

  /* -------------------------------------------------- HAMBURGER 01–14 · 20 */
  hamburger: {
    titel: "HAMBURGER", nummern: "01 – 14 · 20",
    hinweis: "100 % Rind · alle Burger mit Ketchup, Mayonnaise, Tomaten, sauren Gurken, Senf, Zwiebeln & Mixed-Salat",
    items: [
      {no:"01", nm:"Classic Hamburger",             ig:"Rindfleisch-Patty",                                   pr:"6,50"},
      {no:"02", nm:"Cheeseburger",                  ig:"Rindfleisch-Patty, Cheddar-Käse",                     pr:"7,00"},
      {no:"03", nm:"Chili Cheeseburger",            ig:"Cheddar-Käse, Jalapeños, Chili-Sauce",                pr:"7,50"},
      {no:"04", nm:"Kleefood BBQ Burger",           ig:"Cheddar-Käse, Bacon, Barbecue-Sauce",                 pr:"8,50", top:true},
      {no:"05", nm:"Kleefood Creamy Avocado",       ig:"Guacamole, Beef-Patty",                               pr:"8,50"},
      {no:"06", nm:"Grilled Mushroom & Blue Cheese",ig:"Pesto, gegrillte Champignons, Schmorzwiebeln",        pr:"8,50"},
      {no:"07", nm:"Halloumi & Aubergine",          ig:"Halloumi, gegrillte Aubergine, Honey Mustard",        pr:"8,50", veg:true},
      {no:"08", nm:"Mozzarella Burger",             ig:"Pesto, Aioli, Mozzarella, Röstzwiebeln",              pr:"9,00"},
      {no:"09", nm:"Chicken Classic",               ig:"Gegrilltes Chicken",                                  pr:"6,50"},
      {no:"10", nm:"Crunchy Chicken",               ig:"Crunchy Chicken mit Cheese nach Wahl",                pr:"7,50"},
      {no:"11", nm:"Beyond Burger Original",        ig:"Pflanzliches Patty, Ketchup",                         pr:"9,00", veg:true},
      {no:"12", nm:"BBQ Burger Avocado",            ig:"Cheddar, Barbecue-Sauce, Avocado",                    pr:"10,00"},
      {no:"13", nm:"Kleefood Special",              ig:"2 Mozzarella-Sticks, 2 Zwiebelringe, Röstzwiebeln",   pr:"11,00", top:true},
      {no:"14", nm:"Crispy Burger",                 ig:"Crispy-Filet, Coleslaw, Mayonnaise",                  pr:"8,00"},
      {no:"20", nm:"Double Crispy Burger",          ig:"2× Crispy-Filet, Coleslaw, Mayonnaise",               pr:"10,50", top:true}
    ]
  },

  /* ----------------------------------------------------- SMASH BURGER 15–19 */
  smash: {
    titel: "SMASH BURGER", nummern: "15 – 19", fuss: "Extra Beef-Patty  +3,00 €",
    items: [
      {no:"15", nm:"Hamburger Smash",           ig:"",               pr:"4,50"},
      {no:"16", nm:"Cheeseburger Smash",        ig:"",               pr:"5,00"},
      {no:"17", nm:"Chili Cheese Burger Smash", ig:"mit Jalapeños",  pr:"5,50"},
      {no:"18", nm:"BBQ Burger Smash",          ig:"mit BBQ-Sauce",  pr:"5,50"},
      {no:"19", nm:"Chicken Burger",            ig:"mit Aioli",      pr:"5,50"}
    ]
  },

  /* --------------------------------------------------------- BEILAGEN 25–31 */
  beilagen: {
    titel: "BEILAGEN", nummern: "25 – 31",
    items: [
      {no:"25", nm:"BBQ Fries",           ig:"BBQ-Sauce, Bacon, Röstzwiebeln",  pr:"6,00"},
      {no:"26", nm:"Chili Cheese Fries",  ig:"Jalapeños, Käse",                 pr:"6,50", top:true},
      {no:"27", nm:"Garlic Fries",        ig:"Parmesan, Petersilie, Knoblauch", pr:"6,00"},
      {no:"28", nm:"Süßkartoffel-Pommes", ig:"",                                pr:"5,50", veg:true},
      {no:"29", nm:"Pommes Fries",        ig:"",                                pr:"4,50", veg:true},
      {no:"30", nm:"Curly Fries",         ig:"",                                pr:"5,50", veg:true},
      {no:"31", nm:"Coleslaw",            ig:"Krautsalat",                      pr:"3,00", veg:true}
    ]
  },

  /* ------------------------------------------------------------ PIZZA 65–82 */
  pizzaA: {
    titel: "PIZZA", nummern: "65 – 73", groessen: ["30 cm", "40 cm"],
    items: [
      {no:"65", nm:"Margherita",    ig:"Tomatensoße & Käse",                                      pr:"8,50",  pr2:"14,00"},
      {no:"66", nm:"Tonno",         ig:"Thunfisch, Zwiebeln",                                     pr:"10,00", pr2:"17,00"},
      {no:"67", nm:"Kleefood",      ig:"Putenschinken, Paprika, frische Champignons, Jalapeños",  pr:"10,00", pr2:"16,50", top:true},
      {no:"68", nm:"Salami",        ig:"Geflügel-Salami",                                         pr:"10,00", pr2:"16,50"},
      {no:"69", nm:"Putenschinken", ig:"Putenschinken",                                           pr:"10,00", pr2:"16,50"},
      {no:"70", nm:"Hawaii",        ig:"Putenschinken, Ananas",                                   pr:"10,00", pr2:"16,50"},
      {no:"71", nm:"Funghi",        ig:"Frische Champignons, Peperoni",                           pr:"10,00", pr2:"16,50"},
      {no:"72", nm:"Fiori",         ig:"Geflügel-Salami, frische Champignons, Peperoni",          pr:"11,00", pr2:"19,00"},
      {no:"73", nm:"Sucuk",         ig:"Knoblauchwurst",                                          pr:"10,50", pr2:"17,00"}
    ]
  },

  pizzaB: {
    titel: "PIZZA", nummern: "74 – 82", groessen: ["30 cm", "40 cm"],
    items: [
      {no:"74", nm:"BBQ",           ig:"Hähnchenbrust, Zwiebeln, Mais, BBQ-Soße",                        pr:"11,00", pr2:"19,00"},
      {no:"75", nm:"Picante",       ig:"Geflügel-Salami, Zwiebeln, Jalapeños, Oliven",                   pr:"11,00", pr2:"19,00"},
      {no:"76", nm:"Garnelen",      ig:"mit Knoblauch",                                                  pr:"11,00", pr2:"19,00"},
      {no:"77", nm:"Spinat",        ig:"Weichkäse, frischer Knoblauch",                                  pr:"10,50", pr2:"18,50"},
      {no:"78", nm:"Hollandaise",   ig:"Hähnchenbrust, Peperoni, Sauce Hollandaise",                     pr:"11,00", pr2:"19,00"},
      {no:"79", nm:"New York",      ig:"Putenschinken, Broccoli, Sauce Hollandaise",                     pr:"10,00", pr2:"16,50"},
      {no:"80", nm:"Veggie",        ig:"Broccoli, Champignons, Peperoni, Tomaten, Zwiebeln, Oliven",     pr:"10,50", pr2:"18,50", veg:true},
      {no:"81", nm:"Mix",           ig:"Putenschinken, Geflügel-Salami, Champignons, Peperoni",          pr:"11,00", pr2:"19,00"},
      {no:"82", nm:"Pizzabrötchen", ig:"6 Stück mit Käse und 1 Zutat",                                   pr:"10,50", pr2:"–"}
    ]
  },

  /* ------------------------------------------------------- FINGERFOOD 45–51 */
  fingerfood: {
    titel: "FINGERFOOD", nummern: "45 – 51", groessen: ["klein", "groß"],
    items: [
      {no:"45", nm:"Zwiebelringe",      ig:"10 St. mit einem Dip nach Wahl",                            pr:"–",    pr2:"5,00"},
      {no:"46", nm:"Mozzarella-Sticks", ig:"5 St. / 10 St. mit einem Dip",                              pr:"4,50", pr2:"8,00"},
      {no:"47", nm:"Hot Chicken Wings", ig:"6 St. / 10 St. mit einem Dip",                              pr:"7,00", pr2:"9,50", top:true},
      {no:"48", nm:"Chicken Nuggets",   ig:"6 St. / 10 St. mit Pommes & einem Dip",                     pr:"8,50", pr2:"10,50"},
      {no:"49", nm:"Chicken Fingers",   ig:"6 St. / 10 St. mit einem Dip",                              pr:"8,50", pr2:"12,50"},
      {no:"50", nm:"Tex-Mex-Teller",    ig:"2× Mozzarella, 2× Zwiebelring, 2× Nuggets, Pommes, 2 Dips", pr:"",     pr2:"10,50"},
      {no:"51", nm:"Kleefood Bucket",   ig:"4× Mozzarella, 4× Zwiebelring, 4× Nuggets, Pommes, 4 Dips", pr:"",     pr2:"16,00", top:true}
    ]
  },

  /* ------------------------------------------------------ VEGETARISCH 35–39 */
  vegetarisch: {
    titel: "VEGETARISCH", nummern: "35 – 39",
    items: [
      {no:"35", nm:"Falafel Rolle",      ig:"4 St. mit Salat & Soße",                pr:"6,50",  veg:true},
      {no:"36", nm:"XL Falafel Rolle",   ig:"6 St. mit Salat & Soße",                pr:"7,50",  veg:true},
      {no:"37", nm:"Falafel Teller",     ig:"8 St., Reis oder Pommes, Salat & Soße", pr:"11,00", veg:true},
      {no:"38", nm:"Halloumi & Falafel", ig:"3 Halloumi, 3 Falafel, Salat & Soße",   pr:"9,50",  veg:true},
      {no:"39", nm:"Crispy Teller",      ig:"4 St. mit Reis oder Pommes",            pr:"11,00"}
    ]
  },

  /* ------------------------------------------------------------- DIPS 55–63 */
  dips: {
    titel: "DIPS & SAUCEN", nummern: "55 – 63",
    items: [
      {no:"55", nm:"Ketchup",      pr:"0,50"}, {no:"56", nm:"Mayonnaise",   pr:"0,50"},
      {no:"57", nm:"Aioli",        pr:"1,00"}, {no:"58", nm:"Sauer-Creme",  pr:"1,00"},
      {no:"59", nm:"Juppi-Sauce",  pr:"1,00"}, {no:"60", nm:"Hanim Master", pr:"1,00"},
      {no:"61", nm:"Barbecue",     pr:"1,00"}, {no:"62", nm:"Trüffel-Mayo", pr:"1,00"},
      {no:"63", nm:"Käsesauce",    pr:"2,50"}
    ]
  }
};

/* --------------------------------------------------------- SCHÜLER-AKTION */
var AKTION = {
  titel: "SCHÜLER-AKTION",
  was:   "POMMES",
  preis: "2,00 €",
  info:  "täglich bis 17 Uhr · gegen Schülerausweis"
};

/* ---------------------------------------------------------------- SPAR MENÜ */
var SPAR = {
  titel: "SPAR MENÜ",
  ab:    "ab 11,90 €",
  info:  "täglich 11 – 23 Uhr · auch zum Mitnehmen",
  items: [
    {no:"1", nm:"BURGER",       ig:"Burger nach Wahl · Pommes · 0,33 l Softdrink",   pr:"13,90 €", img:"fotos/menu1.jpg"},
    {no:"2", nm:"DOUBLE SMASH", ig:"2× Smash Burger nach Wahl · Pommes · 0,33 l",    pr:"13,90 €", img:"fotos/menu2.jpg"},
    {no:"3", nm:"FALAFEL",      ig:"Falafel Rolle · Pommes · 0,33 l Softdrink",      pr:"12,90 €", img:"fotos/menu3.jpg"},
    {no:"4", nm:"CRISPY MENÜ",  ig:"3 Stück Crispy · Pommes · Getränk  ·  mit Smash Burger 13,90 €",
                                                                                     pr:"11,90 €", img:"fotos/menu4.jpg", neu:true}
  ]
};

/* Versionsnummer an allen Bildpfaden. Nach einem Bildtausch hochzählen,
   sonst zeigt der Fire TV Stick das alte Bild aus seinem Cache. */
var BILD_VERSION = "?v=6";

/* Laufband je Screen */
var TICKER = {
  links:    "100 % RIND · HAUSGEMACHTE SAUCEN  •  SCHÜLER-AKTION: POMMES 2,00 € BIS 17 UHR  •  SPAR MENÜ AB 11,90 €  •  PIZZA & FINGERFOOD AUF DEM ANDEREN SCREEN",
  rechts:   "ALLE PIZZEN IN 30 CM & 40 CM  •  BURGER, BEILAGEN & SPAR MENÜ AUF DEM ANDEREN SCREEN  •  SCHÜLER-AKTION: POMMES 2,00 € BIS 17 UHR"
};

var TELEFON = "TEL. 0511 569 575 67";
