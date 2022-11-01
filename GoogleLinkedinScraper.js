const cheerio = require("cheerio");
    const unirest = require("unirest");
    
    const getData = async() => {
    try
    {
    const url = "https://www.google.com/search?q=site:linkedin.com/in+'amazon.com'&gl=us";
    
    const selectRandom = () => {
        const userAgents =  ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        ]
        var randomNumber = Math.floor(Math.random() * userAgents.length);
        return userAgents[randomNumber];
        }
        let user_agent = selectRandom();
        let header = {
        "User-Agent": `${user_agent}`
        }
    
    const response = await unirest
    .get(url)
    .header(header)
    
    
    const $ = cheerio.load(response.body)
    
    let title = [],location = [], about = [],link=[];
    $(".g").each((i,el) => {
        title[i] = $(el).find(".DKV0Md").text();
        if(title[i].includes(" - LinkedIn") || title[i].includes(" | LinkedIn"))
        {
        title[i] = title[i].replace(" - LinkedIn" , "")
        title[i] = title[i].replace(" | LinkedIn", "")
        }
        location[i] = $(el).find(".WZ8Tjf").text();
        about[i] = $(el).find(".lEBKkf").text();
        link[i] = $(el).find("a").attr("href")
    })
    let employees_data = [];
    for (let i = 0; i < title.length; i++) {
        employees_data.push({
        title: title[i],
        location: location[i],
        about: about[i],
        link: link[i]
        })
    }
    console.log(employees_data)
    }
    catch(e)
    {
        console.log(e)
    }
    }
    getData(); 