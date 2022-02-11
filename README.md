<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://raw.githubusercontent.com/SilasDemez/rest-Busplan/main/public/duck.png" alt="Project logo"></a>
</p>

<h3 align="center">Nivalis</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/SilasDemez/rest-Busplan.svg)](https://github.com/SilasDemez/rest-Busplan/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/SilasDemez/rest-Busplan.svg)](https://github.com/SilasDemez/rest-Busplan/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Einige Rest API Implementationen
    <br> 
</p>

## 📝 Inhaltsangabe

* [Beschreibung](#Beschreibung)
* [API Beschreibung](#APIBeschreibung)
* [Südtiroler Transport Webservices](#stawebs)
* [OpenWeather Map](#openweathermap)
* [Eigene API --> Teacher of the Week](#toftw)
* [Webscraper mit Fallmerayer News](#webscraper)
* [Installation](#instalation)
* [Authoren](#authors)




## 🧐 Beschreibung <a name = "Beschreibung"></a>

Nivalis ist das Ergebnis eines Schulprojekts bei dem das Ziel war sich mit Rest APIs vertraut zu machen. Die Ideee war, dass wir eine Tafel für das Foyer zu bauen, die immer aktuelle Infos anzeigt. Im Hintergrund sollte also auf APIs zugegriffen werden 
Wir haben dabei mit mehreren APIs gearbeitet: 
 - [Südtiroler Transport Webservices](#stawebs)
 - [Südtiroler Wetter Webservices]()
 - [OpenWeather Map](#openweathermap)
 - [Eigene API --> Teacher of the Week]()

## 👾 API_Beschreibung <a name = "API_Beschreibung"></a>

### Südtiroler Transport Webservices <a name = "stawebs"></a>

Die Südtiroler Transportagentur bietet eine angenehme API an, um auf die aktuellen Busse/Züge zuzugreifen. Dabei gibt es eine zentrale URL auf die man zugreift: 

url : https://efa.sta.bz.it/apb/XML_DM_REQUEST

Für uns relevant sind zwei Varianten der Request. Einmal lassen wir uns die Haltestellen für einen Ort ausgeben um die HaltestellenID zu bekommen von der wir mit der zweiten Abfrage die vorbeikommenden Busse und Züge abrufen. Hier sind nochmal die Parameter und die für uns relevanten Rückgabewerte

#### Haltestellen für Ort anzeigen lassen

#### parameters:

    locationServerActive: 1
    stateless: 1
    type_dm: any
    name_dm: <Ortname>
    mode: direct
    outputFormat: JSON

##### Response 
    Array mit Haltestellen unter: response.dm.points[]
    name:           <Haltestellenname>
    stateless:      <HaltestellenID>
    ref.coords:     <Koordinaten>

#### Abfahrende Busse/Züge anzeigen lassen

##### parameters:

    locationServerActive:   1
    stateless:              1
    type_dm:                any
    name_dm:                <HaltestelleName> oder <Stateless(HaltestellenID)>
    mode:                   direct
    outputFormat:           JSON

##### Response
    Array mit Daten unter: departureList[]
    .servingline.direction: <Zielort>
    .servingLine.destID:    <ZielhaltestellenID>
    .servingLine.number:    <Buslinie>
    .dateTime.monat:        <Monat>
    .dateTime.day:          <Tag>
    .dateTime.hour:         <Stunde>
    .dateTime.minute:       <Minute>
    
### OpenWeatherMap <a name = "openweathermap"></a>

Die OpenWeatherMap API ist eine einfache und kostenlose WetterAPI. Man kann mit ihr allerhand Wetterdaten abrufen.

Wir benutzen die OpenWeatherMap API um das tägliche Wetter anzuzeigen. Das passiert über diesen link:

url: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

Es wird für einen bestimmten Ort (Koordinaten das Wetter angezeigt)

#### parameters:

    lat:        <Koordinaten des Zielorts>
    lon:        <Koordinaten des Zielorts>
    exclude:    <Berichte ausschließen (minutely, hourly, daily)>
    appid:      <API Key den man bei der Registrierung für die API bekommt>
    lang:       <Sprache der zurückgegebenen Daten>

#### response:

    Array mit täglichen Daten unter daily[]
    .temp               <Temperatur des Tages>
    .feels_like         <Gefühlte Temperatur>
    .humidity           <Feuchtigkeit>
    .wind_speed         <Windgeschwindigkeit>
    .wind_deg           <Windgrad>
    .description        <Wetterbeschreibung z.B.: wolkig>
    .weather[0].icon    <Id des Wettericons>


### Eigene API - Teacher Of The Week <a name = "toftw"></a>

Beid er Teacher Of The Week API handelt es sich um ein Programm mit welchem man den besten Leherer der Woche wählen kann. Es gibt einLeaderborad und eine Votingseite wo man seine/n Lieblingslehrer/in übers Smartphone oder PCs wählen kann. Für mehr Infos besuche:

[Teacher-Of-The-Week](https://github.com/kaffarell/teacher-of-the-week)


## 👌 Webscraper <a name = "webscraper"></a>


## Installation

Um die App zu bearbeiten muss man zuerst NodeJS und NPM installiert haben. Das kann man ganz einfach vom Browser herunterladen (Windows) oder mit ein paar Befehlen instllieren (Linux)

Anschließend muss man ein Terminal aufmachen und sich zum Ordner begeben. Um das Projekt zuum Laufen zu bringen mus s man zuerst express installieren
    
    npm install express

Anschließend kann man die App starten:

node app.js

Dies startet den lokalen Webserver auf dem Port 3000

Im Browser dann die url: localhost:3000 angeben und die App wird abgerufen


## ✍️ Autoren <a name = "authors"></a>

- [@SilasDemez](https://github.com/SilasDemez) - Allroud Developer
- [@Gavaii](https://github.com/Gavaii) - Allroud Developer