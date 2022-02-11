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
    '<h2 style="text-align: center;margin-bottom:0.3rem;">Bus-Liste</h2>' + "";

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
    min.innerHTML = Math.round(messung.temp.min);
    max.innerHTML = Math.round(messung.temp.max);

    icon.setAttribute("id", "icon");
    weather_description.setAttribute("id", "weather_description");
    min.setAttribute("id", "min");
    max.setAttribute("id", "max");
    avg_temp.setAttribute("id", "avg_temp");

    document.getElementById(`day${i}`).appendChild(icon);

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

//fetch news and weather daily
setInterval(fetchWeather, 86400000);
setInterval(fetchPosts, 86400000);
