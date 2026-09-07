# Product Requirements Document (PRD): Matthias Grötsch

**Projekt:** Matthias Grötsch, Gebäudemanagement & Dienstleistung – Immersive Studio Edition v4.0  
**Zielgruppe:** Immobilieneigentümer, Hausverwaltungen, Gewerbekunden und anspruchsvolle Privatgarten-Besitzer in Regensburg & Umland.  
**Leitmotiv:** „Meisterhafte Gartenarchitektur & verlässliche Liegenschaftsbetreuung – aus einer Hand.“

---

## 1. Kreativ-Konzept & Creative Direction

### Gesetz 1: Anti-Einheitsbrei & Farb-Klima
- **Kein generischer Dark-Mode mit Neon-Cyan:** Stattdessen eine organisch-edle Farbpalette aus sattes Waldgrün (`#0d2319`), Schieferbraun/Bronze (`#c8965e`), Zement-/Kalkstein-Weiß (`#f8faf8`) und graphitgrauen Tiefen (`#111614`).
- **Typografie:**
  - Headlines: Architektonisch, markant (`Syne` / `Outfit` Display).
  - Fließtext: Ergonomisch, hochgradig lesbar (`Plus Jakarta Sans`).

### Gesetz 2: Immersives 3D Scrollytelling Mandat
- **Konzept:** „The Layered Groundwork & Landscape Exploded View“
- **3D-Mechanik:**
  - Eine interaktive 3D-Isometrie-Bühne (Three.js WebGL) im sichtbaren Viewport, synchronisiert mit GSAP ScrollTrigger.
  - Beim Scrollen fächert sich die Szene in 3 plastische Schichten vertikal auf:
    1. **Fundament & Drainage:** Schotterkörper, Wurzelschutz & Geotextil gegen Staunässe.
    2. **Präzisionsbelag & Pflaster:** Hochwertige Terrassenplatten & Verbundstein mit Fugenstabilität.
    3. **Vegetations- & Pflegekrone:** Sattes Grün, gesunde Baumpflege (mit Seilklettertechnik-Markierung) und Winterdienst-Schutzfilm.
  - Begleitend bewegen sich synchrone Textkarten im Split-Layout, die dem Besucher die bauliche Qualität und Langlebigkeit beweisen.

### Gesetz 3: Eiserne Zero-Collision Mobile-Safety
- **Touch-Schutz:** Auf Touchscreens (< 768px) ist der 3D-Canvas mit `pointer-events: none` belegt – der Daumen scrollt ohne jeden Widerstand durch die Seite.
- **Leistungsbegrenzung:** `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` für unerschütterliche 60 FPS.
- **Conversion-Schutz:** Die mobile Sticky Bottom-Bar besitzt `z-index: 99999` und wird von keinem 3D-Objekt oder Modal je verdeckt.

### Gesetz 4: Sektions-Reihenfolge nach der stärksten Waffe
1. **Split Status Navigation:** Logo links, Live-Einsatz-Status („🟢 Regensburg: Einsatzbereit“) + Direktruf rechts.
2. **Hero Stage:**
   - 5.0 Google Sterne Badge.
   - Bildbühne & starkes Nutzenversprechen: „Ihr Grundstück in Meisterhand. Von der ersten Pflasterung bis zum winterfesten Werterhalt.“
   - Primäre CTAs: Telefon-Sofortanruf & WhatsApp-Schnellchat.
3. **Immersive 3D Scrollytelling Stage:**
   - „Qualität, die tiefer reicht: Der meisterhafte Garten- & Grundstücksaufbau.“
   - 3-stufige interaktive Explosionsansicht mit Scroll-Scrub.
4. **Die 4 Kompetenz-Säulen:**
   - Asymmetrisches Editorial-Layout: Gartenbau, Landschaftspflege (SKT), Winterdienst (Lärmschutz-Gummi), Objektbetreuung.
5. **Interaktiver Regensburger Projekt- & Flächenrechner:**
   - Echtzeit-Preisschätzung je nach Fläche (10 bis 500 m²) und gewünschtem Gewerk.
6. **Social Proof & Qualitätsversprechen:**
   - Echte Kundenrezensionen im Wortlaut & 5.0 Sterne Google Gütesiegel.
7. **Multi-Step Angebots-Trichter (3 Schritte):**
   - Schritt 1: Bedarfsanalyse.
   - Schritt 2: Spezifikation & Zeitfenster.
   - Schritt 3: Kontaktdaten & DSGVO-Zustimmung.
8. **Online-Terminbuchung UI-Dummy & Two-Click Google Maps:**
   - Standort Spandauer Str. 2a mit DSGVO-Blocker (`data-src`).
9. **FAQ-Akkordeon (Accessibility-Ready):**
   - Häufige Fragen zu Pauschalen, Notdienst und Winterdienst-Haftung.
10. **Footer & Rechtsmodals:**
    - § 5 DDG Impressum & DSGVO Art. 13 Datenschutz als barrierefreie Dialoge.
