const puppeteer = require('puppeteer');

const extractItems = async(page)  => {
    let events_results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("li.PaEvOc")).map((el) => {
        return{
            title: el.querySelector(".YOGjf")?.textContent,
            timings: el.querySelector(".cEZxRc")?.textContent,
            date: el.querySelector(".gsrt")?.textContent,
            address: Array.from(el.querySelectorAll(".zvDXNd")).map((el) => {
                return el.textContent
            }),
            link: el.querySelector(".zTH3xc")?.getAttribute("href"),
            thumbnail: el.querySelector('.wA1Bge')?.getAttribute("src"),
            location_link: el.querySelector(".ozQmAd") ? "https://www.google.com" + el.querySelector(".ozQmAd")?.getAttribute("data-url") : "",
            tickets: Array.from(el.querySelectorAll('.mi3HuEAU05x__visible-container div')).map((el) => {
                return {
                    source: el?.getAttribute("data-domain"),
                    link: el.querySelector(".SKIyM")?.getAttribute("href"),
                }
            }),
            venue_name: el.querySelector(".RVclrc")?.textContent,
            venue_rating: el.querySelector(".UIHjI")?.textContent,
            venue_reviews: el.querySelector(".z5jxId")?.textContent,
            venue_link: el.querySelector(".pzNwRe a") ? "" + el.querySelector(".pzNwRe a").getAttribute("href") : ""
        }
    })
    })
    for(let i =0;  i<events_results.length; i++)
    {
        Object.keys(events_results[i]).forEach(key => events_results[i][key] === undefined || events_results[i][key] === "" ||  events_results[i][key].length === 0 ? delete events_results[i][key] : {})
    }
    return events_results;
}


    const scrollPage = async(page, scrollContainer, itemTargetCount) => {
    let items = [];
    let previousHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
    while (itemTargetCount > items.length) {
        items = await extractItems(page);
        await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
        await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight > ${previousHeight}`);
        await page.waitForTimeout(2000);
    }
    return items;
    }



const getEventsData = async () => {
    browser = await puppeteer.launch({
    headless: false,
    args: ["--disabled-setuid-sandbox", "--no-sandbox"],
    });
    const [page] = await browser.pages();

    await page.goto("https://www.google.com/search?q=events+in+delhi&ibp=htl;events&hl=en&gl=in" , {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    })

    await page.waitForTimeout(5000)  

let data =  await scrollPage(page,".UbEfxe",20)

console.log(data)
await browser.close();
};

getEventsData();    