const puppeteer = require("puppeteer");

    const extractData = async (page) => {
    let items = await page.evaluate(() => {
    let i = 0;
    return {
        title: document.querySelector(".fontHeadlineLarge")?.textContent,
        rating: document.querySelector(".F7nice")?.textContent,
        reviews: document.querySelector(".mmu3tf .DkEaL")?.textContent,
        type: document.querySelector(".u6ijk")?.textContent,
        service_options: document.querySelector(".E0DTEd")?.textContent.replaceAll("·", ""),
        address: document.querySelector("button[data-tooltip='Copy address']")?.textContent.trim(),
        website: document.querySelector("a[data-tooltip='Open website']")?.textContent.trim(),
        pluscode: document.querySelector("button[data-tooltip='Copy plus code']")?.textContent.trim(),
        timings: Array.from(document.querySelectorAll(".OqCZI tr")).map((el) => {
            return {
                [el.querySelector("td:first-child")?.textContent.trim()]: el.querySelector("td:nth-child(2) li.G8aQO")?.textContent,
            };
        }),
        popularTimes: {
            graph_data: Array.from(document.querySelectorAll(".C7xf8b > div")).map((el) => {
                let day;
                if (i == 0) {
                    day = "Sunday"
                }
                else if (i == 1) {
                    day = "Monday"
                }
                else if (i == 2) {
                    day = "Tuesday"
                }
                else if (i == 3) {
                    day = "Wednesday"
                }
                else if (i == 4) {
                    day = "Thursday"
                }
                else if (i == 5) {
                    day = "Friday"
                }
                else if (i == 6) {
                    day = "Saturday"
                }
                i++;
                return {
                    [day]: Array.from(el.querySelectorAll(`.dpoVLd`)).map((el) => {
                        const time = el.getAttribute("aria-label").split("at")[1].trim();
                        const busy_percentage = el.getAttribute("aria-label").split("busy")[0].trim();
                        return {
                            time,
                            busy_percentage,
                        };
                    }),
                };
            }),
        },
        photos: Array.from(document.querySelectorAll(".dryRY .ofKBgf")).map((el) => {
            return {
                title: el.getAttribute("aria-label"),
                thumbnail: el.querySelector("img").getAttribute("src"),
            }
        }),
        question_and_answers: {
            question: document.querySelector(".Py6Qke")?.textContent,
            answer: document.querySelector(".l79Qmc").textContent
        },
        user_ratings: Array.from(document.querySelectorAll(".ExlQHd tr")).map((el) => {
            return {
                [el.getAttribute("aria-label")?.split(",")[0].trim()]: el.getAttribute("aria-label")?.split(",")[1].trim(),
            };
        }),
        user_reviews: Array.from(document.querySelectorAll(".tBizfc")).map((el) => {
            return {
                description: el.textContent.replaceAll('"', "").trim(),
                user_link: el.querySelector("a").getAttribute("href")
            }
        }),
        mentions: Array.from(document.querySelectorAll(".KNfEk+ div .L6Bbsd")).map((el) => {
            return {
                query: el.querySelector(".uEubGf").textContent,
                mentioned: el.querySelector(".fontBodySmall").textContent + "times"
            }
        }),
        most_relevant: Array.from(document.querySelectorAll(".jJc9Ad")).map((el) => {
            return {
                user: {
                    name: el.querySelector(".d4r55")?.textContent,
                    thumbnail: el.querySelector(".NBa7we")?.getAttribute("src"),
                    local_guide: el.querySelector(".RfnDt span:nth-child(1)")?.textContent.length ? true : false,
                    reviews: el.querySelector(".RfnDt span:nth-child(2)")?.textContent.replace(".", "").trim(),
                    link: el.querySelector(".WEBjve")?.getAttribute("href")
                },
                rating: el.querySelector(".kvMYJc")?.getAttribute("aria-label"),
                date: el.querySelector(".rsqaWe")?.textContent,
                review: el.querySelector(".MyEned .wiI7pd").textContent,
                images: Array.from(el.querySelectorAll(".KtCyie button")).length ? Array.from(el.querySelectorAll(".KtCyie button")).map((el) => {
                    return {
                        thumbnail: getComputedStyle(el).backgroundImage.split('")')[0].replace('url("', ""),
                    };
                })
                    : "",
            }
        })
    }
    });
    return items;
    }

    const getMapsPlacesData = async () => {
    try {
    const url = "https://www.google.com/maps/place/Blacklist+Coffee+Roasters/@-31.9473,115.8073705,14z/data=!4m13!1m7!3m6!1s0x0:0xf79bec80595c6aa8!2sBlacklist+Coffee+Roasters!8m2!3d-31.9472988!4d115.8248801!10e1!3m4!1s0x0:0xf79bec80595c6aa8!8m2!3d-31.9472988!4d115.8248801";

    browser = await puppeteer.launch({
        headless: false,
        args: ["--disabled-setuid-sandbox", "--no-sandbox"],
    });
    const [page] = await browser.pages();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);

    const data = await extractData(page);
    console.log(data)

    await browser.close();
    }
    catch (e) {
    console.log(e);
    }
    }

    getMapsPlacesData();  