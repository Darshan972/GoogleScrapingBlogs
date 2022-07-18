const unirest = require("unirest");
const cheerio = require("cheerio");

const getNewsData = () => {
  return unirest
    .get("https://www.google.com/search?q=football&gl=us&tbm=nws")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);

      let news_results = []; 

      $(".BGxR7d").each((i,el) => {
        news_results.push({
         link: $(el).find("a").attr('href'),
         title: $(el).find("div.mCBkyc").text(),
         snippet: $(el).find(".GI74Re").text(),
         date: $(el).find(".ZE0LJd span").text(),
         thumbnail: $(el).find(".NUnG9d img").attr("src")
        })
      })
      
    console.log(news_results)
    });
};

getNewsData();
