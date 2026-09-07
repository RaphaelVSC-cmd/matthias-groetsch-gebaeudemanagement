# Design System & Technical Blueprint: Matthias Grötsch

**Projekt:** Matthias Grötsch – Immersive Studio Edition v4.0  
**Stack:** HTML5 Semantic, Tailwind CSS (CDN), Three.js (WebGL), GSAP + ScrollTrigger, Lenis Smooth Scroll, Vanilla JavaScript.

---

## 1. Farbklima & Design-Tokens

```css
:root {
  /* Brand Core - Naturstein & Waldgrün */
  --bg-dark: #0c1511;
  --bg-card: rgba(18, 30, 24, 0.75);
  --bg-card-hover: rgba(25, 42, 33, 0.85);
  --border: rgba(255, 255, 255, 0.1);
  --border-focus: rgba(197, 143, 84, 0.6);

  /* Primary Tones */
  --forest-deep: #0f241a;
  --forest-moss: #1b4332;
  --forest-light: #2d6a4f;

  /* Accent Tones */
  --accent-bronze: #c58f54;
  --accent-bronze-light: #dfa96e;
  --accent-gold: #eab308;
  --accent-emerald: #10b981;

  /* Text & Foreground */
  --fg: #f4f6f4;
  --fg-muted: rgba(244, 246, 244, 0.7);
  --fg-subtle: rgba(244, 246, 244, 0.45);

  /* Shadows & Glass */
  --glass-blur: blur(16px);
  --shadow-card: 0 12px 32px -4px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 40px -10px rgba(197, 143, 84, 0.3);

  /* Fonts */
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 2. 3D Scrollytelling Blueprint (The Groundwork Exploded View)

Die 3D-Bühne (`#immersiveExperience`) wird als Sticky-Container mit 250vh Gesamtlänge implementiert:
- **0.0 - 0.2 Scrollfortschritt:**
  - Ausgangszustand: Kompakte Grundstücks-Scholle, isometrische Kameraposition.
  - Text-Overlay Step 1: „1. Fundament & Drainage – Kein Absacken, keine Staunässe.“
- **0.2 - 0.6 Scrollfortschritt:**
  - Exploded View: Pflasterschicht hebt sich vertikal um `y + 2.5`, Vegetation/Gartenkrone hebt sich um `y + 5.0`.
  - Kamera rotiert leicht um `y + 0.35` und kippt an.
  - Text-Overlay Step 2: „2. Präzisions-Pflaster & Terrassenbau – Millimetergenau verlegt.“
- **0.6 - 1.0 Scrollfortschritt:**
  - Detail-Highlight: Seilklettertechnik-Baumsymbol leuchtet auf, Schutzbeschichtung aktiviert sich.
  - Text-Overlay Step 3: „3. Ganzjahres-Vitalität & Winterdienst – Werterhalt bei jedem Wetter.“

---

## 3. Mobile Zero-Collision Matrix

| Displaybreite | 3D-Canvas Verhalten | Bottom-Bar | Scroll-Verhalten |
|---|---|---|---|
| **> 1024px (Desktop)** | Volles Three.js Rendering, interaktiver Orbit/Tilt bei Hover | Ausgeblendet | Lenis Smooth Scroll |
| **768px – 1024px (Tablet)** | Drei.js Rendering mit fixem Scroll-Scrub, zentrierte Textkarten | Kompakt unten fixiert | Lenis Smooth Touch |
| **< 768px (Mobile 375px)** | `pointer-events: none` auf Canvas! Touch geht 100% an Page-Scroll | `z-index: 99999` mit Direktruf & WhatsApp | Natives geschmeidiges Touch-Scrollen |

---

## 4. Business Features & Component Architecture

1. **Split-Status Navigation:**
   - Float-Container am oberen Bildschirmrand.
   - Live-Dot mit pulsierendem grünem Indikator.
   - Direkte Telefonnummer `+49 941 93081200` mit `tel:` Link.
2. **Kalkulator:**
   - Range-Slider von 10m² bis 500m² mit Live-Anzeige.
   - Gewerkeauswahl: Garten-Neugestaltung (45–95 €/m²), Pflasterarbeiten (60–120 €/m²), Landschafts- & Baumpflege (25–55 €/m²), Winterdienst & Objektbetreuung (Pauschal 180–450 €/Monat).
   - Sofortiges Update ohne Neuladen der Seite.
3. **Multi-Step Funnel:**
   - 3 Phasen mit animiertem Fortschrittsbalken und Barrierefreiheits-ARIA (`role="progressbar"`).
   - Pflichtfeldvalidierung vor Weiterschalten.
4. **Legal Modals (§ 5 DDG & DSGVO Art. 13):**
   - Schließen über ESC, Backdrop-Klick oder ✕-Button.
   - Lenis Scroll-Stop bei geöffnetem Modal.
