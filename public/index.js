
async function fetchBusescomingby(haltestellenID){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${haltestellenID}&mode=direct&outputFormat=JSON`

    try{
        const response = await fetch(url, {
            method: 'get',
        })
        
        return response.json();
    }catch(error){
        alert('Fehler bei der Kommunikation mitr der API. Bitte noch einmal probieren');
    }


}

async function fetchStation(ort){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${ort}&mode=direct&outputFormat=JSON`

    const response = await fetch(url, {
        method: 'get',
    })
    
    return response.json();

}


function checkifTrain(lineID){
    let regex = '[A-z]{1,} [0-9]{1,}';
    //let regex = '.';
    console.log(lineID);

    return lineID.match(regex);
}

function writeToDoc(departureList){
    departureList.forEach((bus, i) => {
        // create parent div where bus info goes in
        let div = document.createElement('div');
        div.setAttribute('id', `bus${i}`);
        div.setAttribute('class', 'bus')
        document.getElementById("busse").appendChild(div);

        // crete a children div for every single info
        let lineID_p = document.createElement('p');
        let direction_p = document.createElement('p');
        let time_p = document.createElement('p');

        let line_ID = checkifTrain(bus.servingLine.number)


        if(line_ID){
            console.log("Matched!");
            console.log(line_ID)
            lineID_p.innerHTML = `${line_ID}`;
        }else{
            lineID_p.innerHTML = `${bus.servingLine.number}`;
        }
        direction_p.innerHTML = `${bus.servingLine.direction}`;
        time_p.innerHTML = `${bus.dateTime.day}.${bus.dateTime.month}.${bus.dateTime.year} ${bus.dateTime.hour}:${bus.dateTime.minute}`;

        lineID_p.setAttribute('id', 'lineID');
        direction_p.setAttribute('id', 'direction');
        time_p.setAttribute('id', 'time');

        document.getElementById(`bus${i}`).appendChild(lineID_p)
        document.getElementById(`bus${i}`).appendChild(direction_p)
        document.getElementById(`bus${i}`).appendChild(time_p)

    });

}

/*
fetchStation("Brixen").then((res) => {
    console.log(res);
    console.log(res.dm.points)
    //document.getElementById("busse").innerHTML = res

});
*/

fetchBusescomingby(66001143).then((res) => {
    console.log(res);
    console.log(res.departureList)
    writeToDoc(res.departureList);
});

