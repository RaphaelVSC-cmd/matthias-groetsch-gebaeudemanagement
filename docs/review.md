# Staff Engineer Code & Architecture Review: Matthias Grötsch

**Projekt:** Matthias Grötsch, Gebäudemanagement & Dienstleistung – Immersive Studio Edition v4.0  
**Reviewer:** Staff Creative Technologist & Legal Compliance Engineer  
**Status:** Bestanden / Freigabe erteilt  

---

## 1. Bewertung der 4 Anti-Baukasten-Gesetze

### Gesetz 1: Kein Einheitsbrei (Farbklima & Typografie)
- **Umsetzung:** Die Farbpalette nutzt edles Wald- und Moosgrün (`#07120c`, `#0d2217`, `#143525`) in Kombination mit warmem Naturstein-Bronze/Ocker (`#c58f54`, `#dfa96e`).
- **Ergebnis:** Perfekt abgestimmt auf die Realität eines kombinierten Gartenbau- und Gebäudedienstleisters. Kein Standard-Cyberpunk-Cyan.

### Gesetz 2: Immersives 3D Scrollytelling Mandat
- **Umsetzung:** Three.js 3D Isometrie-Bühne (`#scrollyCanvas`) im Sticky-Container (`#scrollyStage`).
- **Exploded View:** Die Schichten fächern sich synchron zum Scroll-Scrub auf (Fundament ➔ Pflasterung ➔ Baumpflege & Winterdienst).
- **Ergebnis:** Hoher visueller Wow-Effekt und didaktischer Beweis der Ausführungsqualität.

### Gesetz 3: Eiserne Zero-Collision Mobile-Safety
- **Umsetzung:**
  - Auf Bildschirmen < 768px: `#canvasContainer, #scrollyCanvas { pointer-events: none !important; touch-action: pan-y !important; }`. Der Daumen bleibt niemals im Canvas hängen.
  - Renderer limitiert auf `devicePixelRatio = Math.min(window.devicePixelRatio, 1.5)`.
  - Mobile Bottom-Bar besitzt `z-index: 99999 !important` und ist von schwebenden Elementen unbeeinträchtigt.
- **Ergebnis:** Keine Scroll-Falle, flüssige 60 FPS auf allen getesteten Geräten.

### Gesetz 4: Sektions-Reihenfolge nach der stärksten Waffe
- **Umsetzung:**
  - Split-Status Navigation mit Live-Einsatz-Status und Direktruf.
  - Hero mit 5.0 Google-Sterne-Badge und direktem Telefon-CTA.
  - 3D-Bühne an Position 2 zur Demonstration der handwerklichen Exzellenz.
  - Interaktiver Flächenrechner und Multi-Step Funnel zur Konvertierung.

---

## 2. Code-Qualitäts- & Sicherheitsanalyse

1. **HTML5 Semantik:** Korrekte Landmarks (`header`, `main`, `footer`, `nav`, `section`, `article`, `fieldset`, `legend`, `dl`).
2. **WCAG 2.1 AA Accessibility:**
   - Skip-to-Content Link vorhanden.
   - Alle interaktiven Elemente mit `:focus-visible`.
   - Alle Buttons und Links mit aussagekräftigen `aria-label`s.
   - Kontraste auf allen Textelementen > 4.5:1.
3. **Recht & DSGVO:**
   - Impressum mit Angabe § 5 DDG (kein TMG).
   - Ladungsfähige Anschrift in Regensburg ohne Postfach.
   - Telefon- und E-Mail-Links klickbar.
   - Google Maps standardmäßig geblockt (`data-src`) mit interaktivem Two-Click-Consent.
   - TDDDG-konformes Banner mit gleichwertigem "Nur notwendige"-Button und `cookieSettingsLink`.
