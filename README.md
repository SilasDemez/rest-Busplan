<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://raw.githubusercontent.com/SilasDemez/rest-Busplan/main/public/duck.png" alt="Project logo"></a>
</p>

<h3 align="center">Nivalis</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/SilasDemez/rest-Busplan.svg)](https://github.com/SilasDemez/rest-Busplan/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/SilasDemez/rest-Busplan.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Einige Rest API Implementationen
    <br> 
</p>

## 📝 Inhaltsangabe

- [Beschreibung](#Beschreibung)
- [API Beschreibung](#APIBeschreibung)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)




## 🧐 Beschreibung <a name = "Beschreibung"></a>

Nivalis ist das Ergebnis eines Schulprojekts bei dem das Ziel war sich mit Rest APIs vertraut zu machen. Die Ideee war, dass wir eine Tafel für das Foyer zu bauen, die immer aktuelle Infos anzeigt. Im Hintergrund sollte also auf APIs zugegriffen werden 
Wir haben dabei mit mehreren APIs gearbeitet: 
 - [Südtiroler Transport Webservices](#stawebs)
 - [Südtiroler Wetter Webservices]()
 - [OpenWeather Map]()
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
    




The project can easily be cloned and worked on. You need a few essential npm libraries.🔽

### Prerequisites

#### Node JS
#### NPM
#### NPM libraries
```
express
dotenv
body-parser
mysql
mariadb
```

### Installing

Install Node JS - search in browser, download and install
Install npm - search in browser, download and install
Navigate to the project directory

```
npm install express
npm install dotenv
npm install body-parser
npm install mysql
npm install mariadb
```

Create a .env file where you enter the details of your own strava api --> CLIENT_ID and CLIENT_SECRET
Edit the const redirectURL in index.html and enter your own url (also localhost)
In app.js edit the host, user and password of your mariadb database (database files are coming soon)

Run the project
```
sudo node app.js
```

Open the browser

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References


# Rest-Busplan



## Fetches

