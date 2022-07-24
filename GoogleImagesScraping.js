const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getData = async() => {
try
{
const url = "https://www.google.com/search?q=Football&gl=us&tbm=isch&sourceid=chrome&ie=UTF-8";

browser = await puppeteer.launch({headless: false , args: ['--disabled-setuid-sandbox', '--no-sandbox']});
const [page] = await browser.pages();
await page.setExtraHTTPHeaders({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"
})
await page.goto(url,{ waitUntil: "domcontentloaded" });
const response = await page.content()

const $ = cheerio.load(response)
await browser.close();

const images_results = [];

$(".MSM1fd").each((i,el) => {
  images_results.push({
    image: $(el).find("img").attr("src") ? $(el).find("img").attr("src") : $(el).find("img").attr("data-src"),
    title: $(el).find("h3").text(),
    source: $(el).find("a.VFACy .fxgdke").text(),
    link: $(el).find("a.VFACy").attr("href")
  })
})

console.log(images_results)
}
catch(e)
{
    console.log(e)
}
}
getData()