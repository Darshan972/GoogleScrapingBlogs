const cheerio = require("cheerio");
const unirest = require("unirest");

const getScholarCiteData = async () => {
    try {
    const url =
        "https://scholar.google.com/scholar?q=info:TPhPjzP8H_MJ:scholar.google.com&output=cite";

    return unirest
        .get(url)
        .headers({})
        .then((response) => {
        let $ = cheerio.load(response.body);

        let cite_results = [];

        $("#gs_citt tr").each((i, el) => {
            cite_results.push({
            title: $(el).find(".gs_cith").text(),
            snippet: $(el).find(".gs_citr").text(),
            });
        });

        let links = [];

        $("#gs_citi .gs_citi").each((i, el) => {
            links.push({
            name: $(el).text(),
            link: $(el).attr("href"),
            });
        });

        console.log(cite_results);
        console.log(links);

        });
    } catch (e) {
    console.log(e);
    }
};
getScholarCiteData();  