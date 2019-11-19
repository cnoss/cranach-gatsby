# Cranach Gatsby Test

- npm start
- http://localhost:8000/de/LC_HVI-56_79



## Skripte

- Projekt
  - Projekt im Development-Modus starten (Hot-Reload)
    - ```npm run develop``` / ```npm run start```
    - Aufruf unter ```http://localhost:8080```
  - Projekt bauen
    - ```npm run build```
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
