const unirest = require("unirest");
const cheerio = require("cheerio");

const getOrganicData = () => {
  return unirest
    .get("https://www.google.com/search?q=javascript&gl=us&hl=en")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);

      let titles = [];
      let links = [];
      let snippets = [];
      let displayedLinks = [];

      $(".yuRUbf > a > h3").each((i, el) => {
        titles[i] = $(el).text();
      });
      $(".yuRUbf > a").each((i, el) => {
        links[i] = $(el).attr("href");
      });
      $(".g .VwiC3b ").each((i, el) => {
        snippets[i] = $(el).text();
      });
      $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
        displayedLinks[i] = $(el).text();
      });

      const organicResults = [];

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
      console.log(organicResults)
    });
};

getOrganicData();
