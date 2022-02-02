# rest-Busplan


## Fetches

### Haltestellen für Ort anzeigen lassen
url : https://efa.sta.bz.it/apb/XML_DM_REQUEST

parameters:

    locationServerActive: 1
    stateless: 1
    type_dm: any
    name_dm: <Ortname>
    mode: direct
    outputFormat: JSON

#### Response 
    Array mit Haltestellen unter: response.dm.points[]
    name: <Haltestellenname>
    stateless: <HaltestellenID>
    ref.coords: <Koordinaten>

### Abfahrende Busse/Züge anzeigen lassen
url : https://efa.sta.bz.it/apb/XML_DM_REQUEST

parameters:

    locationServerActive: 1
    stateless: 1
    type_dm: any
    name_dm: <HaltestelleName> oder <Stateless(HaltestellenID)>
    mode: direct
    outputFormat: JSON

#### Response
    Array mit Daten unter: departureList[]
    departureList.servingline.direction: <Zielort>
    departureList.servingLine.destID: <ZielhaltestellenID>
    departureList.servingLine.number: <Buslinie>
    departureList.dateTime.monat: <Monat>
    departureList.dateTime.day: <Tag>
    departureList.dateTime.hour: <Stunde>
    departureList.dateTime.minute: <Minute>
    
