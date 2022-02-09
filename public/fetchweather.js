async function fetchWeatherForecast(url) {
  const weatherforecast = await fetch(url, { method: "GET" });
  if (weatherforecast.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    wfjson = await weatherforecast.json();
    console.log(wfjson)
  } else {
    alert("HTTP-Error: " + response.status);
  }
  return wfjson;
}

let api_key = '71125cb6421b64923a47b4dd51af9a2a';

const wf = fetchWeatherForecast(
  //benutz openweather api

  "https://api.openweathermap.org/data/2.5/forecast?lat=46.715&lon=11.656&appid=" + api_key + "&units=metric"
);

document.getElementById("weatherforecast");
