const teacher_url = "https://teacher-of-the-week.herokuapp.com";
var daysOfWeek = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

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
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=46.715&lon=11.656&exclude=hourly,minutely&appid=71125cb6421b64923a47b4dd51af9a2a&units=metric&lang=de`;

  const response = await fetch(url, {
    method: "get",
  });

  response.json().then((res) => {
    //console.log(res);
    writeWeatherToDoc(res);
  });
}

function checkifTrain(lineID) {
  let regex = "[A-z]{1,} [0-9]{1,}";
  return lineID.match(regex);
}

function writeToDoc(departureList) {
  //console.log(departureList);
  document.getElementById("busse").innerHTML =
    '<h2 style="text-align: center;margin-bottom:0.3vh;">Bus-Liste</h2>' + "";

  for (i = 0; i < 12; i++) {
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
      //console.log(line_ID);
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
  let current = weather.current;
  console.log(current);
  //save current weather variables
  let temp = current.temp;

  //save daily weather variables
  let daily = weather.daily;
  let daily_temp = daily[0].temp;
  let daily_feels_like = daily[0].feels_like;
  let daily_humidity = daily[0].humidity;
  let daily_wind_speed = daily[0].wind_speed;
  let daily_wind_deg = daily[0].wind_deg;
  let daily_weather_desc = daily[0].weather[0].description;
  let daily_weather_icon = daily[0].weather[0].icon;

  //add current weather variables to todays weather
  document
    .getElementById("weather_today_icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${daily_weather_icon}@2x.png`
    );
  document.getElementById(
    "weather_today_temp"
  ).innerHTML = `${daily[0].temp.day.toFixed(1)}°C`;
  document.getElementById(
    "weather_today_desc"
  ).innerHTML = `${daily_weather_desc}`;

  for (i = 1; i < 6; i++) {
    let messung = weather.daily[i];
    //console.log(messung);

    // create parent div where bus info goes in
    let div = document.createElement("li");
    div.setAttribute("id", `day${i}`);
    div.setAttribute("class", "day");
    document.getElementById("weather_forecast_items").appendChild(div);

    // crete a children div for every single info
    let icon = document.createElement("img");
    let day = document.createElement("h4");
    let weather_description = document.createElement("p");

    let avg_temp = document.createElement("p");

    let min = document.createElement("p");
    let max = document.createElement("p");

    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${messung.weather[0].icon}@2x.png`
    );
    weather_description.innerHTML = messung.weather[0].description;

    avg_temp.innerHTML = `${messung.temp.day.toFixed(1)}°C`;
    //console.log(avg_temp);

    let date = new Date(messung.dt * 1000);

    day.innerHTML = daysOfWeek[date.getDay()];
    min.innerHTML = Math.round(messung.temp.min);
    max.innerHTML = Math.round(messung.temp.max);

    icon.setAttribute("id", "icon");
    weather_description.setAttribute("id", "weather_description");
    min.setAttribute("id", "min");
    max.setAttribute("id", "max");
    avg_temp.setAttribute("id", "avg_temp");

    document.getElementById(`day${i}`).appendChild(icon);
    document.getElementById(`day${i}`).appendChild(day);
    document.getElementById(`day${i}`).appendChild(avg_temp);

    //eliminate cluttering --- ask silo
    //document.getElementById(`day${i}`).appendChild(weather_description);
    // document.getElementById(`day${i}`).appendChild(min);
    // document.getElementById(`day${i}`).appendChild(max);
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

  let a = document.createElement("img");
  
  //a.innerHTML = `<a rel='nofollow' href='https://www.qr-code-generator.com' border='0' style='cursor:default'></a><img src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fteacher-of-the-week.herokuapp.com%2Fvoting.html&chs=180x180&choe=UTF-8&chld=L|2' alt=''>`
  a.setAttribute('src', 'data:image/png;base64,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');
  document.getElementById("teacher_of_the_week").appendChild(a)

  for (i = 0; i < 3; i++) {
    let teacher = arr[i];
    //console.log(teacher);

    let div = document.createElement("div");

    div.setAttribute("id", `teacher${i}`);
    div.setAttribute("class", "teacher");

    document.getElementById("teacher_of_the_week").appendChild(div);

    let name = document.createElement("p");
    let count = document.createElement("p");

    name.innerHTML = teacher.name;
    name.setAttribute("class", "names");

    count.innerHTML = teacher.count;
    count.setAttribute("class", "counts");

    document.getElementById(`teacher${i}`).appendChild(name);
    document.getElementById(`teacher${i}`).appendChild(count);
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

//fetch api from https://www.fallmerayer.it/wp-json/wp/v2/posts
async function fetchPosts() {
  await fetch("https://www.fallmerayer.it/wp-json/wp/v2/posts")
    .then((response) => response.json())
    .then((data) => {
      //get the description of each post
      let posts = data;
      for (let i = 0; i < posts.length; i++) {
        let post = document.createElement("div");
        post.setAttribute("class", "post");
        post.setAttribute("id", `post${i}`);
        document.getElementById("news").appendChild(post);
        post.innerHTML = posts[i].title.rendered;

        //get the id of each post
        let id = posts[i].id;

        let img_url =
          "https://www.fallmerayer.it/wp-json/wp/v2/media?parent=" + id;

        //take the img_url and post the image to the page
        fetch(img_url)
          .then((response) => response.json())
          .then((data) => {
            try {
              let img = data[0].guid.rendered;

              let img_tag = document.createElement("img");
              img_tag.setAttribute("src", img);
              img_tag.setAttribute("class", "post_image");
              document.getElementById(`post${i}`).appendChild(img_tag);
            } catch (error) {
              console.log("no image");
            }
          });

        //https://www.fallmerayer.it/wp-json/wp/v2/media?parent=7548
      }
    });
}
/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

//haltestelle dantestrasse
fetchBusescomingby(66001143);
setInterval(fetchBusescomingby, 60000, 66001143);

fetchLeaderboard();
fetchWeather();
fetchPosts().then(() => {
  //sleep for 5 seconds
  setTimeout(() => {
    $(".loader-container").fadeOut(1000);
  }, 5000);
});

setInterval(rotatePosts, 10000);

//fetch news and weather daily
setInterval(fetchWeather, 86400000);
setInterval(fetchPosts, 86400000);
