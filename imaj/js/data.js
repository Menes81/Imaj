// ============================================================
//  Alle Inhalte der Website an EINER Stelle.
//  Hier Preise, Team, Zeiten und Links anpassen – fertig.
//  Einträge mit  // TODO  müssen noch bestätigt werden.
// ============================================================
window.SALON = {
  name: "City Imaj",
  claim: "Friseur & Barber in Erlensee",
  address: { street: "Rückinger Str. 4", city: "63526 Erlensee" },
  phone: "+49 1525 4636526",
  phoneHref: "+4915254636526",
  whatsapp: "4915254636526", // TODO: prüfen, ob die Nummer WhatsApp nutzt
  bookingUrl: "", // TODO: Link zum Buchungstool (Fresha, Treatwell, Planity …); leer = WhatsApp-Formular
  instagram: "", // TODO: z. B. "https://instagram.com/cityimaj"
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=City+imaj+friseur+R%C3%BCckinger+Str.+4+Erlensee",
  rating: { score: "4,8", count: 374 }, // TODO: aktuelle Werte aus Google übernehmen

  // TODO: Öffnungszeiten bestätigen (Quellen nennen 9–19 bzw. 10–20 Uhr)
  hours: [
    { day: "Montag", open: "09:00", close: "19:00" },
    { day: "Dienstag", open: "09:00", close: "19:00" },
    { day: "Mittwoch", open: "09:00", close: "19:00" },
    { day: "Donnerstag", open: "09:00", close: "19:00" },
    { day: "Freitag", open: "09:00", close: "19:00" },
    { day: "Samstag", open: "09:00", close: "19:00" },
    { day: "Sonntag", open: null, close: null },
  ],

  // price: null  →  zeigt „auf Anfrage“
  services: [
    { group: "Haarschnitt", items: [
      { name: "Herrenhaarschnitt", desc: "Waschen, Schneiden, Styling", duration: 30, price: null },
      { name: "Skin Fade", desc: "Präziser Übergang bis auf die Haut", duration: 40, price: null },
      { name: "Maschinenschnitt", desc: "Eine Länge, sauber konturiert", duration: 20, price: null },
      { name: "Kinderhaarschnitt", desc: "Bis 12 Jahre", duration: 20, price: null },
    ]},
    { group: "Bart", items: [
      { name: "Bart trimmen & Kontur", desc: "Form, Linie, Pflegeöl", duration: 20, price: null },
      { name: "Nassrasur mit Heißtuch", desc: "Klassisch mit Klinge", duration: 30, price: null },
    ]},
    { group: "Kombi & Pflege", items: [
      { name: "Haare & Bart", desc: "Das komplette Paket", duration: 50, price: null },
      { name: "Gesichtspflege", desc: "Reinigung, Maske, Augenbrauen", duration: 20, price: null },
      { name: "Haarfarbe / Grauabdeckung", desc: "Natürlich und dezent", duration: 45, price: null },
    ]},
  ],

  // photo: Pfad zum Bild, z. B. "img/team-1.jpg" (leer = Platzhalter)
  team: [
    { name: "Name folgt", role: "Inhaber & Barber", photo: "" },
    { name: "Name folgt", role: "Barber", photo: "" },
    { name: "Name folgt", role: "Barber", photo: "" },
  ],

  // Galerie-Bilder, z. B. "img/galerie-1.jpg"
  gallery: ["", "", "", "", "", ""],

  // TODO: echte Google-Bewertungen einfügen (Text + Vorname)
  reviews: [
    { text: "Hier eine echte Google-Bewertung einfügen.", author: "Kunde", stars: 5 },
    { text: "Hier eine echte Google-Bewertung einfügen.", author: "Kunde", stars: 5 },
    { text: "Hier eine echte Google-Bewertung einfügen.", author: "Kunde", stars: 5 },
  ],
};
