# Kunden- & Übergabeanleitung: Matthias Grötsch

Diese Anleitung beschreibt alle Schritte, um die Website für den Produktivbetrieb anzupassen und auf Vercel oder einem beliebigen Webhoster bereitzustellen.

---

## 1. Lokaler Start & Vorschau

Im Projektordner stehen zwei Starter-Skripte bereit:
- **Windows:** Doppelklick auf `start.bat`
- **Mac / Linux:** `./start.sh` im Terminal ausführen

Die Seite öffnet sich standardmäßig unter `http://localhost:3000`.

---

## 2. Kontaktformular einrichten (Formspree)

Aktuell nutzt das Multi-Step-Formular einen Platzhalter für Formspree. Um Anfragen direkt an Ihre E-Mail-Adresse (`info@matthias-groetsch.de`) zu erhalten:

1. Kostenlosen Account auf [formspree.io](https://formspree.io) erstellen.
2. Neues Formular mit dem Namen „Matthias Grötsch Website“ anlegen.
3. Die generierte Form-ID (z. B. `xpzgklow`) kopieren.
4. In `index.html` in Zeile 422:
   ```html
   <!-- Vorher: -->
   <form id="multiStepForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   <!-- Nachher: -->
   <form id="multiStepForm" action="https://formspree.io/f/xpzgklow" method="POST" novalidate>
   ```

---

## 3. Austausch von Bildern & Visuals

Alle SVGs und visuellen Elemente sind direkt im Code eingebettet (kein externes Nachladen für maximale Geschwindigkeit).
Falls reale Fotos von Referenzobjekten (z. B. gepflasterte Einfahrten oder Baumpflege-Einsätze) eingebunden werden sollen:
1. Fotos im WebP- oder JPG-Format mit 1200×800 px im Ordner `assets/images/` ablegen.
2. `<img>` Tags einfügen und stets `width="1200" height="800"` sowie beschreibende deutsches `alt`-Attribut setzen.

---

## 4. Hosting & Deployment auf Vercel

1. Das Projekt ist mit standardkonformem statischen HTML/CSS/JS aufgebaut.
2. Einfach das GitHub-Repository mit Vercel verbinden (`Import Project` ➔ `Deploy`).
3. Vercel vergibt automatisch ein weltweites Edge-CDN und kostenloses SSL-Zertifikat.
4. Eigene Domain (`www.matthias-groetsch.de`) unter *Settings* ➔ *Domains* hinterlegen und DNS-Einträge auf Vercel leiten.
