const cheerio = require("cheerio");
    const unirest = require("unirest");

    const getJobsData = async () => {
    try {
    const url = "https://www.google.com/search?q=web+developer+in+mumbai&ibp=htl;jobs&hl=en";

    const response = await unirest
    .get(url)
    .headers({
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    })
        let $ = cheerio.load(response.body);

        let jobs_results = [];
        $(".iFjolb").each((i,el) => {
            jobs_results.push({
                title: $(el).find(".PUpOsf").text(),
                company_name: $(el).find(".vNEEBe").text(),
                location: $(el).find(".vNEEBe+ .Qk80Jf").text(),
                via: $(el).find(".Qk80Jf+ .Qk80Jf").text(),
            })
            if($(el).find(".KKh3md").length)
            {
                jobs_results[i].extensions = [];
                $(el).find(".KKh3md .LL4CDc").each((j,el) => {
                    jobs_results[i].extensions[j] = $(el).text()
                })
            }
        })
        console.log(jobs_results)  

    } catch (e) {
    console.log(e);
    }
    };
    getJobsData();