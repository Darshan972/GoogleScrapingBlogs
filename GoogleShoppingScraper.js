const unirest = require("unirest");
const cheerio = require("cheerio");

const getShoppingData = () => {
  
  try
  {
  return unirest
    .get("https://www.google.com/search?q=nike shoes&tbm=shop&gl=us")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);


    let ads = [];
    
    $(".sh-np__click-target").each((i,el) => {
     ads.push({
        title: $(el).find(".sh-np__product-title").text(),
        link: "https://google.com" + $(el).attr("href"),
        source: $(el).find(".sh-np__seller-container").text(),
        price: $(el).find(".hn9kf").text(),
        delivery: $(el).find(".U6puSd").text(),
     })
     if($(el).find(".rz2LD").length)
     {
      let extensions = []
        extensions = $(el).find(".rz2LD").text()
        ads[i].extensions = extensions
     }
     })

    for (let i = 0; i < ads.length; i++) {
        Object.keys(ads[i]).forEach(key => ads[i][key] === "" ? delete ads[i][key] : {});  
    }

    let shopping_results = [];

    $(".sh-dgr__gr-auto").each((i,el) => {
        shopping_results.push({
            title: $(el).find(".Xjkr3b").text(),
            link: $(el).find(".zLPF4b .eaGTj a.shntl").attr("href").substring($(el).find("a.shntl").attr("href").indexOf("=")+1),
            source: $(el).find(".IuHnof").text(),
            price: $(el).find(".XrAfOe .a8Pemb").text(),
            rating: $(el).find(".Rsc7Yb").text(),
            reviews: $(el).find(".NzUzee div").attr("aria-label") ? $(el).find(".NzUzee div").attr("aria-label").substring(0,$(el).find(".NzUzee div").attr("aria-label").indexOf(" ")) : "",
            delivery: $(el).find(".vEjMR").text()
        })
        if($(el).find(".Ib8pOd").length)
        {
            let extensions = [];
            extensions = $(el).find(".Ib8pOd").text();
            shopping_results[i].extensions = extensions
        }
    })

    for (let i = 0; i < shopping_results.length; i++) {
        Object.keys(shopping_results[i]).forEach(key => shopping_results[i][key] === "" ? delete shopping_results[i][key] : {});  
     }
     
     console.log(ads)
     console.log(shopping_results)
    })
  }
 catch(e)
 {
    console.log(e)
 }
}


getShoppingData();

