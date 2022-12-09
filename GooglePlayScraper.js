const unirest = require("unirest");
    const cheerio = require("cheerio");
    
    const getGooglePlayData = async() => {
        
        let url = "https://play.google.com/store/apps"
        
        let response = await unirest
        .get(url)
        .headers({
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            })
        const $ = cheerio.load(response.body)
        let category = [], organic_results = [];
        $(".kcen6d").each((i,el) => {
                category[i] = $(el).text()
        })
        $("section").each((i,el) => {
            let results = [];
            if(category[i] !== "Top charts" && category[i] !== undefined)
            {
                $(el).find(".ULeU3b").each((i,el) => {
                    results.push({
                        app_name: $(el).find(".Epkrse").text(),
                        rating: parseFloat($(el).find(".LrNMN").text()),
                        thumbnail: $(el).find(".TjRVLb img").attr("src"),
                        link: "https://play.google.com" + $(el).find("a").attr("href"),
                        })
                })
            organic_results.push({
                category: category[i],
                results: results
            })
        }
        })
        
        console.log(organic_results[0]);  
    
    };
    
    getGooglePlayData(); 