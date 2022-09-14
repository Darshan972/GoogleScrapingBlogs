const cheerio = require("cheerio");
const unirest = require("unirest")


const getShoppingData = async() => {
try
{
const url = "https://www.google.com/shopping/product/1741888852360229737?sourceid=chrome&ie=UTF-8";

const response = await unirest
.get(url)
.headers({
    "User-Agent":
 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36" 
})

const $ = cheerio.load(response.body)

let product_results = {};

product_results.title = $(".sh-t__title").text();

let prices = [];
let conditions = [];

$(".TZeISb").each((i,el) => {
    prices[i] = $(el).find(".g9WBQb").text();
    conditions[i] = $(el).find(".pp-bubble-cont").text().length ? $(el).find(".pp-bubble-cont .XI4N6c").text() : $(el).find(".Yy9sbf").text();
})

product_results.prices = prices;
product_results.conditions = conditions

product_results.typical_prices = {};
product_results.typical_prices.low = $(".KaGvqb .qYlANb").text().replace("A" , "");
product_results.typical_prices.high = $(".xyYTQb .qYlANb").text().replace("A" , "");
product_results.typical_prices.shown_price = $(".FYiaub").text().replace("A" , "");
product_results.reviews = $(".qIEPib").text().length ? $(".qIEPib").text().split(" ")[0] : "";
product_results.rating = $(".uYNZm").text();

if($(".vqSBk").length)
{
    let features =[];
    $(".vqSBk .KgL16d").each((i,el) => {
        features[i] = $(el).text()
    })
    product_results.features = features
}


if($(".Qo4JI").length)
{
let extensions = [];
$(".Qo4JI .OA4wid").each((i,el) => {
    extensions[i] = $(el).text();
})

product_results.extensions = extensions
}

product_results.descriptions = $(".sh-ds__full-txt").text();

    if($(".HE4Qgd").length)
    {
    let media = [];
    $(".HE4Qgd img").each((i,el) => {
        media.push({
            type: "image",
            link: $(el).attr("src")
        })
    })

    product_results.media = media
    }



Object.keys(product_results).forEach(key => {
    if (product_results[key] === '' || product_results[key] === undefined) {
      delete product_results[key];
    }
  });

  console.log(product_results)
  
  let reviews_results = {};
let ratings = [];

$(".l1agtd .internal-link").each((i,el) => {
    ratings.push({
        name: $(el).find(".rOdmxf").text().split(" ")[0],
        amount: $(el).find(".vL3wxf").text().split(" ")[0]
    })
})

for (let i = 0; i < ratings.length; i++) {
    Object.keys(ratings[i]).forEach(key => ratings[i][key] === "" ? delete ratings[i][key] : {});  
}

let reviews = [];

$(".XBANlb").each((i,el) => {
    reviews.push({
        position: i+1,
        title: $(el).find(".P3O8Ne").text(),
        date: $(el).find(".ff3bE").text(),
        rating: $(el).find(".UzThIf").length ? $(el).find(".UzThIf").attr("aria-label").split(" ")[0] : "",
        source: $(el).find(".sPPcBf").text(),
        description: $(el).find(".g1lvWe div").text()
    })
})

for (let i = 0; i < reviews.length; i++) {
    Object.keys(reviews[i]).forEach(key => reviews[i][key] === "" ? delete reviews[i][key] : {});  
}

reviews_results.ratings = ratings;
reviews_results.reviews = reviews

Object.keys(reviews_results).forEach(key => {
    if (reviews_results[key] === []) {
      delete reviews_results[key];
    }
  });  

  console.log(reviews)

}
catch(e)
{
    console.log(e);
}
}
getShoppingData();