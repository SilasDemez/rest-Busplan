//get the news from www.fallmerayer.it
async function fetchNews() {
  const response = await fetch(
    "https://www.fallmerayer.it/wp-json/wp/v2/posts?_embed&per_page=3"
  );
  const news = await response.json();
  //console.log(news);
  return news;
}

console.log(fetchNews());
