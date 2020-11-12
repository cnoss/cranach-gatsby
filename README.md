# Cranach Gatsby Test

- npm start
- http://localhost:8000/de/LC_HVI-56_79



## Skripte

- Projekt
  - Projekt im Development-Modus starten (Hot-Reload)
    - ```npm run develop``` / ```npm run start```
    - Aufruf unter ```http://localhost:8080```
  - Projekt im Development-Modus starten (Hot-Reload) mit Erreichbarkeit im lokalen Netzwerk
    - ```npm run dev-network```
    - Aufruf URL wird ausgegeben
  - Projekt bauen
    - ```npm run build```
  - Deploy für Live Server liefert eine Zipdatei mit dem aktuellen Datum als Dateiname
    - ```npm run deploy-live```
  - Eine leere Komponente als Ausgangsbasis erstellen
    - ```npm run create component atoms/new-component```
  - Production-Build über WebServer ausliefern
    - ```npm run serve```
    - Aufruf unter ```http://localhost:9000```
  - Projekt bauen und auf GH-Pages deployen
    - ```npm run deploy```
    - Projekt wird unter Berücksichtigung des in der `gatsby-config.js` gesetzen `pathPrefix`-Werts gebaut und der Inhalt des public-Ordners in den `gh-pages`-Branch übernommen, sowie dieser Stand auf `origin` gepusht
  - Projektdateien (js, jsx) formattieren
    - ```npm run format```
- Testing
  - Jest als Testrunner ausführen
    - ```npm run test```
  - Jest als Testrunner ausführen und auf Aktualisierungen hören / reagieren
    - ```npm run test:watch```
- Storybook
  - Storybook im Development-Modus starten
    - ```npm run storybook```
    - Aufruf unter ```http://localhost:6006```
  - Storybook bauen
    - ```npm run build-storybook```
- Create
  - Eine leere Komponente als Ausgangsbasis erstellen
    - ```npm run create component atoms/new-component```



## CN Reminder
No numbers in css! Alle Zahlen stehen in styles/000-abstracts/variables.scss

### CSS Properties
Use LAB for sorting:
- L: Layout
- A: Appearance
- B: Behavior
