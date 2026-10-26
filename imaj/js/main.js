(function () {
  const S = window.SALON;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
  const priceLabel = (p) => (p == null ? "auf Anfrage" : p.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }));
  const mapsQuery = encodeURIComponent(`City imaj friseur ${S.address.street} ${S.address.city}`);

  // ---- Kontakt-Links ----
  const tel = `tel:${S.phoneHref}`;
  ["#topbar-phone", "#booking-phone"].forEach((id) => { $(id).href = tel; });
  $("#booking-phone").textContent = `Anrufen: ${S.phone}`;
  if (S.bookingUrl) {
    const ext = $("#booking-external");
    ext.href = S.bookingUrl;
    ext.hidden = false;
  }
  if (S.instagram) {
    const ig = $("#insta-link");
    ig.href = S.instagram;
    ig.hidden = false;
  }
  $("#contact-addr").innerHTML =
    `${esc(S.address.street)}<br>${esc(S.address.city)}<br><a href="${tel}">${esc(S.phone)}</a>`;
  $("#footer-addr").textContent = `${S.address.street}, ${S.address.city} · ${S.phone}`;
  $("#year").textContent = new Date().getFullYear();

  // ---- Bewertungen ----
  const ratingText = `${S.rating.score} von 5 · ${S.rating.count} Google-Bewertungen`;
  const heroRating = $("#hero-rating");
  heroRating.href = S.googleReviewsUrl;
  heroRating.innerHTML = `<span class="stars" aria-hidden="true">★★★★★</span> ${esc(ratingText)}`;
  $("#feature-rating").textContent = `${S.rating.score} Sterne aus ${S.rating.count} Google-Bewertungen, von Kunden aus Erlensee, Hanau und Umgebung.`;
  $("#reviews-summary").innerHTML = `
    <span class="reviews__score">${esc(S.rating.score)}</span>
    <div><div class="stars" aria-hidden="true">★★★★★</div><div>${S.rating.count} Bewertungen auf Google</div></div>
    <a href="${S.googleReviewsUrl}" target="_blank" rel="noopener">Alle Bewertungen lesen →</a>`;
  $("#reviews").innerHTML = S.reviews.map((r) => `
    <figure class="review reveal">
      <div class="stars" aria-label="${r.stars} von 5 Sternen">${stars(r.stars)}</div>
      <blockquote>„${esc(r.text)}“</blockquote>
      <figcaption>${esc(r.author)}</figcaption>
    </figure>`).join("");

  // ---- Leistungen (Tabs) ----
  const tabs = $("#service-tabs");
  const panels = $("#service-panels");
  tabs.innerHTML = S.services.map((g, i) =>
    `<button class="tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(g.group)}</button>`).join("");
  panels.innerHTML = S.services.map((g, i) => `
    <div role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${i === 0 ? "" : "hidden"}>
      <ul class="price-list">${g.items.map((s) => `
        <li class="price-item">
          <div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div>
          <div class="price-item__meta"><span class="price-item__price">${priceLabel(s.price)}</span><span class="price-item__dur">ca. ${s.duration} Min.</span></div>
        </li>`).join("")}
      </ul>
    </div>`).join("");
  const tabEls = [...tabs.querySelectorAll(".tab")];
  const selectTab = (idx) => {
    tabEls.forEach((t, i) => {
      t.setAttribute("aria-selected", i === idx);
      t.tabIndex = i === idx ? 0 : -1;
      $(`#panel-${i}`).hidden = i !== idx;
    });
    tabEls[idx].focus();
  };
  tabEls.forEach((t, i) => {
    t.addEventListener("click", () => selectTab(i));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") selectTab((i + 1) % tabEls.length);
      if (e.key === "ArrowLeft") selectTab((i - 1 + tabEls.length) % tabEls.length);
    });
  });

  // ---- Team & Galerie ----
  $("#team-grid").innerHTML = S.team.map((m) => `
    <article class="member reveal">
      <div class="member__img ${m.photo ? "" : "ph"}">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">` : "Foto folgt"}</div>
      <h3>${esc(m.name)}</h3><p>${esc(m.role)}</p>
    </article>`).join("");
  $("#gallery").innerHTML = S.gallery.map((src, i) => src
    ? `<a class="reveal" href="${esc(src)}" target="_blank"><img src="${esc(src)}" alt="Haarschnitt bei City Imaj, Bild ${i + 1}" loading="lazy"></a>`
    : `<div class="ph reveal">Bild folgt</div>`).join("");

  // ---- Öffnungszeiten + Status ----
  const todayIdx = (new Date().getDay() + 6) % 7; // Montag = 0
  $("#hours").innerHTML = S.hours.map((h, i) =>
    `<tr class="${i === todayIdx ? "is-today" : ""}"><td>${h.day}</td><td>${h.open ? `${h.open} – ${h.close} Uhr` : "Geschlossen"}</td></tr>`).join("");
  const status = $("#topbar-status");
  const today = S.hours[todayIdx];
  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  if (today.open && hhmm >= today.open && hhmm < today.close) {
    status.textContent = `Jetzt geöffnet · bis ${today.close} Uhr`;
    status.classList.add("is-open");
  } else {
    const next = [1, 2, 3, 4, 5, 6, 7].map((d) => S.hours[(todayIdx + d) % 7]).find((h) => h.open);
    const opensLaterToday = today.open && hhmm < today.open;
    status.textContent = opensLaterToday ? `Geschlossen · öffnet heute ${today.open} Uhr` : `Geschlossen · öffnet ${next.day} ${next.open} Uhr`;
  }

  // ---- Buchungsformular → WhatsApp ----
  const fService = $("#f-service");
  const fDate = $("#f-date");
  const fTime = $("#f-time");
  const fName = $("#f-name");
  const fError = $("#f-error");
  fService.innerHTML = `<option value="">Bitte wählen</option>` + S.services.map((g) =>
    `<optgroup label="${esc(g.group)}">${g.items.map((s) => `<option>${esc(s.name)}</option>`).join("")}</optgroup>`).join("");
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  fDate.min = iso(new Date());

  const fillTimes = () => {
    const d = fDate.value ? new Date(fDate.value + "T00:00") : null;
    const h = d ? S.hours[(d.getDay() + 6) % 7] : null;
    if (!d) { fTime.innerHTML = `<option value="">Erst Datum wählen</option>`; return; }
    if (!h.open) { fTime.innerHTML = `<option value="">An diesem Tag geschlossen</option>`; return; }
    const slots = [];
    let [hr, mi] = h.open.split(":").map(Number);
    const [ch, cm] = h.close.split(":").map(Number);
    while (hr * 60 + mi <= ch * 60 + cm - 30) {
      slots.push(`${String(hr).padStart(2, "0")}:${String(mi).padStart(2, "0")}`);
      mi += 30; if (mi >= 60) { mi -= 60; hr++; }
    }
    fTime.innerHTML = `<option value="">Bitte wählen</option>` + slots.map((s) => `<option>${s}</option>`).join("");
  };
  fDate.addEventListener("change", fillTimes);
  fillTimes();

  $("#booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [[fService, "eine Leistung"], [fDate, "ein Datum"], [fTime, "eine Uhrzeit"], [fName, "deinen Namen"]];
    fields.forEach(([el]) => el.removeAttribute("aria-invalid"));
    const missing = fields.find(([el]) => !el.value.trim());
    if (missing) {
      missing[0].setAttribute("aria-invalid", "true");
      fError.textContent = `Bitte wähle ${missing[1]}.`;
      if (missing[0] === fName) fError.textContent = "Bitte gib deinen Namen ein.";
      missing[0].focus();
      return;
    }
    fError.textContent = "";
    const date = new Date(fDate.value + "T00:00").toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
    const msg = `Hallo City Imaj, ich hätte gern einen Termin:\n• Leistung: ${fService.value}\n• Datum: ${date}\n• Uhrzeit: ${fTime.value} Uhr\n• Name: ${fName.value.trim()}`;
    window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  // ---- Karte erst nach Zustimmung laden (DSGVO) ----
  $("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  $("#map-load").addEventListener("click", () => {
    $("#map").innerHTML = `<iframe title="Karte: City Imaj, ${esc(S.address.street)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed"></iframe>`;
  });

  // ---- Mobiles Menü ----
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // ---- Scroll-Reveal ----
  document.querySelectorAll(".feature, .price-item, .h2").forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
