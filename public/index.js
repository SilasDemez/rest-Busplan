
async function fetchBusescomingby(haltestellenID){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${haltestellenID}&mode=direct&outputFormat=JSON`

    const response = await fetch(url, {
        method: 'get',
    })
    
    return response.json();

}

async function fetchStation(ort){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${ort}&mode=direct&outputFormat=JSON`

    const response = await fetch(url, {
        method: 'get',
    })
    
    return response.json();

}

function writeToDoc(departureList){
    departureList.forEach(bus => {
        // create parent div where bus info goes in
        let div = document.createElement('div');
        div.setAttribute('id', 'bus');
        document.getElementById("busse").appendChild(div);

        // crete a children div for every single info
        let lineID_div = document.createElement('div');
        let direction_div = document.createElement('div');
        let time_div = document.createElement('div');

        lineID_div.innerHTML = `${bus.servingLine.number}`;
        direction_div.innerHTML = `${bus.servingLine.direction}`;
        time_div.innerHTML = `${bus.dateTime.day}.${bus.dateTime.month}.${bus.dateTime.year} ${bus.dateTime.hour}:${bus.dateTime.minute}`;

        lineID_div.setAttribute('id', 'lineID');
        direction_div.setAttribute('id', 'direction');
        time_div.setAttribute('id', 'time');

        document.getElementById("bus").appendChild(lineID_div)
        document.getElementById("bus").appendChild(direction_div)
        document.getElementById("bus").appendChild(time_div)

    });

}

/*
fetchStation("Brixen").then((res) => {
    console.log(res);
    console.log(res.dm.points)
    //document.getElementById("busse").innerHTML = res

});
*/

fetchBusescomingby(66000998).then((res) => {
    console.log(res);
    console.log(res.departureList)
    writeToDoc(res.departureList);
});

