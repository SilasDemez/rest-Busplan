const teacher_url = "https://teacher-of-the-week.herokuapp.com";

async function fetchBusescomingby(haltestellenID) {
  let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${haltestellenID}&mode=direct&outputFormat=JSON`;

  //try{
  //console.log("Hallo")
  const response = await fetch(url, {
    method: "get",
  });

  response.json().then((res) => {
    //console.log(res);
    writeToDoc(res.departureList);
  });
}

async function fetchStation(ort) {
  let url = `https://efa.sta.bz.it/apb/XML_DM_REQUEST?&locationServerActive=1&stateless=1&type_dm=any&name_dm=${ort}&mode=direct&outputFormat=JSON`;

  const response = await fetch(url, {
    method: "get",
  });

  return response.json();
}

function parseminute(minute) {
  if (minute.length == 1) {
    return "0" + minute;
  } else return minute;
}

async function fetchWeather() {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=46.715&lon=11.656&exclude=hourly,minutely&appid=71125cb6421b64923a47b4dd51af9a2a&units=metric`;

  const response = await fetch(url, {
    method: "get",
  });

  response.json().then((res) => {
    console.log(res);
    writeWeatherToDoc(res);
  });
}

function checkifTrain(lineID) {
  let regex = "[A-z]{1,} [0-9]{1,}";
  return lineID.match(regex);
}

function writeToDoc(departureList) {
  //console.log(departureList);
  document.getElementById("busse").innerHTML = "";

  for (i = 0; i < 15; i++) {
    let bus = departureList[i];
    // create parent div where bus info goes in
    let div = document.createElement("div");
    div.setAttribute("id", `bus${i}`);
    div.setAttribute("class", "bus");
    document.getElementById("busse").appendChild(div);

    // crete a children div for every single info
    let lineID_p = document.createElement("p");
    let direction_p = document.createElement("p");
    let time_p = document.createElement("p");

    let line_ID = checkifTrain(bus.servingLine.number);

    if (line_ID) {
      //console.log("Matched!");
      console.log(line_ID);
      lineID_p.innerHTML = `${line_ID}`;
    } else {
      lineID_p.innerHTML = `${bus.servingLine.number}`;
    }
    direction_p.innerHTML = `${bus.servingLine.direction}`;
    //time_p.innerHTML = `${bus.dateTime.day}.${bus.dateTime.month}.${bus.dateTime.year} ${bus.dateTime.hour}:${bus.dateTime.minute}`;

    let minute = parseminute(bus.dateTime.minute);

    time_p.innerHTML = `${bus.dateTime.hour}:${minute}`;

    lineID_p.setAttribute("id", "lineID");
    direction_p.setAttribute("id", "direction");
    time_p.setAttribute("id", "time");

    document.getElementById(`bus${i}`).appendChild(lineID_p);
    document.getElementById(`bus${i}`).appendChild(direction_p);
    document.getElementById(`bus${i}`).appendChild(time_p);
  }
}

function writeWeatherToDoc(weather) {
  for (i = 0; i < 7; i++) {
    let messung = weather.daily[i];
    console.log(messung);

    // create parent div where bus info goes in
    let div = document.createElement("div");
    div.setAttribute("id", `day${i}`);
    div.setAttribute("class", "day");
    document.getElementById("weather").appendChild(div);

    // crete a children div for every single info
    let icon = document.createElement("p");
    let min = document.createElement("p");
    let max = document.createElement("p");


    lineID_p.setAttribute("id", "lineID");
    direction_p.setAttribute("id", "direction");
    time_p.setAttribute("id", "time");

    document.getElementById(`bus${i}`).appendChild(lineID_p);
    document.getElementById(`bus${i}`).appendChild(direction_p);
    document.getElementById(`bus${i}`).appendChild(time_p);
  }
}

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function writeTeachersToDoc(teachers) {
  let arr = teachers.count;
  arr.sort(function (a, b) {
    return b.count - a.count;
  });
  //console.log(arr);
  document.getElementById("teacher_of_the_week").innerHTML = "";
  for (i = 0; i < 3; i++) {
    let teacher = arr[i];
    //console.log(teacher);

    let div = document.createElement("div");

    div.setAttribute("id", `${teacher.name}`);
    div.setAttribute("class", "teacher");

    document.getElementById("teacher_of_the_week").appendChild(div);

    let name = document.createElement("p");
    let count = document.createElement("p");

    name.innerHTML = teacher.name;
    name.setAttribute("class", "names");

    count.innerHTML = teacher.count;
    count.setAttribute("class", "counts");

    document.getElementById(`${teacher.name}`).appendChild(name);
    document.getElementById(`${teacher.name}`).appendChild(count);
  }
}

async function fetchLeaderboard() {
  //console.log(`${teacher_url}/leaderboard`);
  const response = await fetch(`${teacher_url}/leaderboard`, {
    method: "get",
  });

  response.json().then((res) => {
    //console.log(res);
    writeTeachersToDoc(res);
  });
}

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

fetchBusescomingby(66001143);
setInterval(fetchBusescomingby, 60000, 66001143);

fetchLeaderboard();
fetchWeather();
