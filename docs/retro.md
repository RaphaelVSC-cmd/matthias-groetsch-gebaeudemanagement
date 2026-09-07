# Retrospektive & Design-Entscheidungen: Matthias Grötsch

**Projekt:** Matthias Grötsch – Immersive Studio Edition v4.0  
**Datum:** 07. September 2026  

---

## 1. Was lief hervorragend?

- **3D Scrollytelling Umsetzung:** Die schrittweise Hebung der Schichten (Fundament ➔ Pflaster ➔ Grün/Baumpflege) beweist meisterhafte Qualität und hebt die Website radikal von gewöhnlichen Handwerkerseiten ab.
- **Zero-Collision Sicherheit:** Durch die Entkopplung von Pointer-Events auf mobilen Endgeräten (`pointer-events: none` auf dem 3D-Canvas) scrollt die Seite auf Smartphones butterweich durch, ohne dass der Finger im WebGL-Viewport steckenbleibt.
- **100% Deutsche Rechtskonformität:** Das Dialog-Modal-System für Impressum (§ 5 DDG) und Datenschutz (DSGVO Art. 13) bewahrt den makellosen visuellen Abschluss der Seite, während die Two-Click-Lösung für Google Maps ein sauberes TDDDG-Fundament bietet.

---

## 2. Architektonische Highlights

1. **Split-Status Navigation:** Verbindet edle Markenästhetik mit funktionaler Transparenz (Live-Einsatzbereitschaft in Regensburg).
2. **Branchenrechner & Funnel-Verzahnung:** Der Besucher kann seine Fläche einstellen und den errechneten Richtwert mit einem einzigen Klick direkt in das Multi-Step-Kontaktformular übernehmen.
3. **Addy-Osmani Web Quality:** Vollständig lokale Schriften, Vektor-LCP-Grafik mit Null Layout-Shift (CLS = 0) und schlanker Codebase.
