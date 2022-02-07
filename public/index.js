const teacher_url = 'http://10.10.30.212:5000'


async function fetchBusescomingby(haltestellenID){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${haltestellenID}&mode=direct&outputFormat=JSON`

    //try{
        //console.log("Hallo")
        const response = await fetch(url, {
            method: 'get',
        })
        
        response.json().then((res) => {
            console.log("Test")
            console.log(res)
            writeToDoc(res.departureList);
        })
        
        // return response.json();
    /*}catch(error){
        alert('Fehler bei der Kommunikation mitr der API. Bitte noch einmal probieren');
    }*/


}

async function fetchStation(ort){
    let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${ort}&mode=direct&outputFormat=JSON`

    const response = await fetch(url, {
        method: 'get',
    })
    
    return response.json();

}

async function fetchWeatherRadar(){
    let url = `	http://daten.buergernetz.bz.it/services/weather/radarhd?lang=de&format=json`

    try{
        const response = await fetch(url, {
            method: 'get',
        })
        
        return response.json();
    }catch(error){
        alert('Fehler bei der Kommunikation mitr der API. Bitte noch einmal probieren');
    }


}


async function setImgofRadar(res){
    let durchlaufe=0
    for(i=0;;i++){
        durchlaufe++
        await new Promise(r => setTimeout(r, 1000));
        document.getElementById("animation").src = res.rows[i].foregroundUrl;
        console.log(durchlaufe)
        if (durchlaufe == 169) {
            console.log("Beende")
            return 0
            break

        }
        if(i == res.rows.length-1){
            await new Promise(r => setTimeout(r, 1000));
            i = 0
        }
    }
}

async function endlessRadar(){
    while (true){
        console.log("Loading radar");
        await fetchWeatherRadar().then((res) => {
            console.log(res);
            console.log(res.rows[0].foregroundUrl);
            setImgofRadar(res);
        });

        await new Promise(r => setTimeout(r, 183000));
    }
}

async function setImgofPrediction(){
    let i=0,url
    while(true){
        await new Promise(r => setTimeout(r, 1000));
        if(i==33) i=0
        url = `https://wetter.provinz.bz.it/images/wforecast${i}.jpg`
        //console.log(url)
        document.getElementById("forecast").src = url;
        i++
    }

}

function parseminute(minute){
    if(minute.length == 1){
        return "0" + minute
    }else return minute
}

function checkifTrain(lineID){
    let regex = '[A-z]{1,} [0-9]{1,}';
    return lineID.match(regex);
}

function writeToDoc(departureList){
    console.log(departureList)
    document.getElementById("busse").innerHTML = ''
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
        //time_p.innerHTML = `${bus.dateTime.day}.${bus.dateTime.month}.${bus.dateTime.year} ${bus.dateTime.hour}:${bus.dateTime.minute}`;

        let minute = parseminute(bus.dateTime.minute)

        time_p.innerHTML = `${bus.dateTime.hour}:${minute}`;

        lineID_p.setAttribute('id', 'lineID');
        direction_p.setAttribute('id', 'direction');
        time_p.setAttribute('id', 'time');

        document.getElementById(`bus${i}`).appendChild(lineID_p)
        document.getElementById(`bus${i}`).appendChild(direction_p)
        document.getElementById(`bus${i}`).appendChild(time_p)

    });

}



/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


function writeTeachersToDoc(teachers){
    console.log(teachers)
    document.getElementById("teacher_of_the_week").innerHTML = ''
    for(i=0; i<3; i++){
        let teacher = teachers.count[i]
        console.log(teacher)

        let div = document.createElement('div');

        div.setAttribute('id', `${teacher.name}`);
        div.setAttribute('class', 'teacher')

        document.getElementById("teacher_of_the_week").appendChild(div);

        let name = document.createElement('p');
        let count = document.createElement('p');

        name.innerHTML = teacher.name
        name.setAttribute('class', 'names')

        count.innerHTML = teacher.count
        count.setAttribute('class', 'counts')


        document.getElementById(`${teacher.name}`).appendChild(name)
        document.getElementById(`${teacher.name}`).appendChild(count)
    }
}

async function fetchLeaderboard(){
    const response = await fetch(`${teacher_url}/leaderboard`, {
        method: 'get',
        mode: 'no-cors'
    });
    response.json().then((res) => {
        writeTeachersToDoc(res)
    })
}

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

fetchBusescomingby(66001143)
setInterval(fetchBusescomingby, 60000, 66001143)

endlessRadar()
setImgofPrediction()
fetchLeaderboard()

/*
fetchStation("Brixen").then((res) => {
    console.log(res);
    console.log(res.dm.points)
    //document.getElementById("busse").innerHTML = res

});
*/
/*
fetchBusescomingby(66001143).then((res) => {
    console.log(res);
    console.log(res.departureList)
    writeToDoc(res.departureList);
});

*/
/*
fetchWeatherRadar().then((res) => {
    console.log(res);
    console.log(res.rows[0].foregroundUrl);
    setImgofRadar(res);
});

*/