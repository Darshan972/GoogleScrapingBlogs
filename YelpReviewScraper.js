const cheerio = require("cheerio")
const puppeteer = require("puppeteer")

const getData = (html) => {
    const $ = cheerio.load(html)

    const avg_rating = $(".five-stars__09f24__mBKym").attr("aria-label");
    const reviews = $(".padding-t0-5__09f24__lDQoQ .css-foyide").text();
    let user_reviews = [];
    $(".review__09f24__oHr9V").each((i,el) => {
        user_reviews.push({
            name: $(el).find(".css-ux5mu6 .css-1m051bw").text(),
            location: $(el).find(".responsive-hidden-small__09f24__qQFtj .css-qgunke").text(),
            review: $(el).find(".comment__09f24__gu0rG").text(),
            date: $(el).find(".css-chan6m").text(),
            rating: $(el).find(".five-stars__09f24__mBKym").attr("aria-label"),
            friends: $(el).find("[aria-label='Friends'] span > span").text(),
            reviews: $(el).find("[aria-label='Reviews'] span > span").text(),
            photos: $(el).find("[aria-label='Photos'] span > span").text(),
            thumbnail: $(el).find(".css-1pz4y59").attr("src")
        })
        let images = [];
        if($(el).find(".photo-container-small__09f24__obhgq").length)
        {
        $(el).find(".photo-container-small__09f24__obhgq").each((i,el) => {
            images[i] = $(el).find("img").attr("src")
        })
        user_reviews[i].images = images
        }
    })
    console.log(avg_rating)
    console.log(reviews)
    console.log(user_reviews[0])
}

const yelpReviewScraper = async() => {


       browser = await puppeteer.launch({
        headless: false,
        args: ["--disabled-setuid-sandbox", "--no-sandbox"],
        });
        const [page] = await browser.pages();        
    
        await page.goto("https://www.yelp.com/biz/hard-rock-cafe-san-francisco-5" , {
            waitUntil: 'domcontentloaded',
        })
        await page.waitForTimeout(5000)  
        let html = await page.content();

        await browser.close();
        getData(html);
    
  
    };

    yelpReviewScraper()
