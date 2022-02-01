async function fetchSnowReport(url) {
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  console.log(data);
  return data;
}
fetchSnowReport(
  "https://tourism.api.opendatahub.bz.it/v1/Weather/SnowReport?skiareaid=SKI04EBE61F5AA0473F871AF0297887D6C2&lang=de"
);
