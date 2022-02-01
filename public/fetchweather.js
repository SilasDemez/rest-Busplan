async function fetchWeatherForecast(url) {
  const weatherforecast = await fetch(url, { method: "GET" });
  if (weatherforecast.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    wfjson = await weatherforecast.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
  return wfjson;
}

const wf = fetchWeatherForecast(
  //benutz openweather api
  "https://tourism.api.opendatahub.bz.it/v1/Weather?language=en&locfilter=3&extended=true"
);

console.log(wf);
