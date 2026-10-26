# City Imaj – Friseur & Barber in Erlensee

One-Pager-Website für City Imaj, Rückinger Str. 4, 63526 Erlensee.
Reines HTML/CSS/JS, kein Build-Schritt.

## Inhalte ändern

Alle Texte, Preise, Öffnungszeiten, Team, Galerie und Links stehen in **`js/data.js`**.
Offene Punkte sind dort mit `TODO` markiert.

- Preise: `price: null` durch eine Zahl ersetzen, z. B. `price: 25`
- Fotos: in den Ordner `img/` legen und den Pfad eintragen, z. B. `photo: "img/team-1.jpg"`
- Hero-Bild: in `css/style.css` bei `.hero__bg` die Zeile mit `background-image` einsetzen
- Buchungstool: Link bei `bookingUrl` eintragen

## Noch offen

- [ ] Preise
- [ ] Fotos (Salon, Team, Galerie)
- [ ] Teamnamen
- [ ] Öffnungszeiten bestätigen
- [ ] WhatsApp-Nummer, Buchungstool, Instagram
- [ ] Echte Google-Bewertungen
- [ ] `impressum.html` und `datenschutz.html`

## Online stellen (GitHub Pages)

Settings → Pages → Source: „Deploy from a branch“ → Branch `main`, Ordner `/ (root)` → Save.
