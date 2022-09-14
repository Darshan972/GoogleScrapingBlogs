const cheerio = require("cheerio")
const unirest = require("unirest")

const getScholarOrgaincData = async() => {
try
{
const url = "https://www.google.com/scholar?q=IIT+MUMBAI&hl=en";

const response = await unirest
.get(url)
.headers({
  "User-Agent":
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"  
})

const $ = cheerio.load(response.body)

let scholar_results = [];

$(".gs_ri").each((i,el) => {
    scholar_results.push({
      title: $(el).find(".gs_rt").text(),
      title_link: $(el).find(".gs_rt a").attr("href"),
      id: $(el).find(".gs_rt a").attr("id"),
      displayed_link: $(el).find(".gs_a").text(),
      snippet: $(el).find(".gs_rs").text().replace("\n", ""),
      cited_by_count: $(el).find(".gs_nph+ a").text(),
      cited_link: "https://scholar.google.com" + $(el).find(".gs_nph+ a").attr("href"),
      versions_count: $(el).find("a~ a+ .gs_nph").text(),
      versions_link: $(el).find("a~ a+ .gs_nph").text() ? "https://scholar.google.com" + $(el).find("a~ a+ .gs_nph").attr("href") : "",
    })
})

for (let i = 0; i < scholar_results.length; i++) {
    Object.keys(scholar_results[i]).forEach(key => scholar_results[i][key] === "" || scholar_results[i][key] === undefined ? delete scholar_results[i][key] : {});  
 }

console.log(scholar_results)

}
catch(e)
{
    console.log(e);
}
}
getScholarOrgaincData();