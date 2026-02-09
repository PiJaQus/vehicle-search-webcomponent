# Vehicle Search WebComponent (Vue 3)

## Ziel der Aufgabe

Ziel dieser Aufgabe war es, eine **einfach integrierbare Fahrzeugsuche (PLP)** als **WebComponent** zu implementieren.

Der Fokus lag auf:
- sauberer Architektur
- klarer Trennung von Logik und UI
- einfacher Einbindung in bestehende Systeme
- bewusst reduziertem Scope

Die Komponente soll **ohne Vue, Vite oder Build-Setup auf der Zielseite** funktionieren und lediglich über **ein einzelnes JavaScript-File** eingebunden werden.

---

## Ergebnis

Die Suche kann über **eine Script-Zeile + einen Custom HTML Tag** eingebunden werden:

```html
<script src="digital35-meinfahrzeugshop-suche.iife.js"></script>
<digital35-meinfahrzeugshop-suche></digital35-meinfahrzeugshop-suche>
```
keine weiteren Abhängigkeiten
kein Framework auf der Host-Seite notwendig
mehrfach auf einer Seite 

---

## Umsetzter funktionsumfang

### Funktional
- Vehicle Listing Page (PLP)
- 3 einfache Filter:
- Hersteller
- Kraftstoff
- Maximalpreis
- Live-Filtering
- Filter-Reset
- Anzeige aktiver Filter (Chips)
- Empty State bei 0 Treffern

### Technisch
- Vue 3
- WebComponent (customElements.define)
- IIFE Build (klassische <script>-Einbindung)
- Styles im Bundle enthalten
- Mock-Daten als lokales JavaScript-Array

### UI / Layout

- klassisches PLP-Layout:
- Filter links
- Fahrzeugliste rechts
- Platzhalter für Fahrzeugbilder

---
## Projektstruktur
```powershell
src/
 ├─ main.js                      # WebComponent
 ├─ App.vue                      # Hauptlayout & State
 ├─ data/
 │   └─ vehicles.js              # Mock-Daten
 └─ components/
     ├─ VehicleFilters.vue       # Filter-Panel
     └─ VehicleGrid.vue          # Listing & Cards

dist/
 └─ digital35-meinfahrzeugshop-suche.iife.js   # finaler Embed-File

demo/
 └─ index.html                   # Standalone Demo (ohne Vite)

```
---
## Lokale Entwicklung
```bash
npm install
npm run dev
```
---
## Build (Produktions-File erzeugen)
```bash
npm install
npm run build
```
Erzeugt den finalen, einbindbaren File:
```bash
dist/digital35-meinfahrzeugshop-suche.iife.js
```
Dieser File enthält:
- Vue Runtime
- gesamte UI- und Filter-Logik
- Styles
- WebComponent-Definition
  
---
## Einbindung in ein bestehendes Projekt

- JavaScript-File auf einen Server oder CDN legen
- Script einbinden
- Custom Element verwenden
```html
<script src="/path/to/digital35-meinfahrzeugshop-suche.iife.js"></script>
<digital35-meinfahrzeugshop-suche></digital35-meinfahrzeugshop-suche>
```
---

## Demo lokal ansehen
Die Demo verwendet ausschließlich den gebauten JS-File, keinen Dev-Server.
```bash
npx serve .
```
Danach im Browser öffnen:
```bash
http://localhost:3000/demo
```
