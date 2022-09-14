const cheerio = require("cheerio");
    const unirest = require("unirest");

    const getAuthorProfileData = async () => {
    try {
    const url = "https://scholar.google.com/citations?hl=en&user=cOsxSDEAAAAJ";

    return unirest
    .get(url)
    .headers({
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    })
    .then((response) => {
        let $ = cheerio.load(response.body);

        let author_results = {};
        let articles = {};

        author_results.name = $("#gsc_prf_in").text();
        author_results.position = $("#gsc_prf_inw+ .gsc_prf_il").text();
        author_results.email = $("#gsc_prf_ivh").text();
        author_results.departments = $("#gsc_prf_int").text();

        $("#gsc_a_b .gsc_a_t").each((i, el) => {
            articles.push({
                title: $(el).find(".gsc_a_at").text(),
                link: "https://scholar.google.com" + $(el).find(".gsc_a_at").attr("href"),
                authors: $(el).find(".gsc_a_at+ .gs_gray").text(),
                publication: $(el).find(".gs_gray+ .gs_gray").text()
            })
        })

        for (let i = 0; i < articles.length; i++) {
            Object.keys(articles[i]).forEach((key) =>
                articles[i][key] === "" || articles[i][key] === undefined
                    ? delete articles[i][key]
                    : {}
            );
        }

        let cited_by = {};

        cited_by.table = [];
        cited_by.table[0] = {};
        cited_by.table[0].citations = {};
        cited_by.table[0].citations.all = $("tr:nth-child(1) .gsc_rsb_sc1+ .gsc_rsb_std").text();
        cited_by.table[0].citations.since_2017 = $("tr:nth-child(1) .gsc_rsb_std+ .gsc_rsb_std").text();
        cited_by.table[1] = {};
        cited_by.table[1].h_index = {};
        cited_by.table[1].h_index.all = $("tr:nth-child(2) .gsc_rsb_sc1+ .gsc_rsb_std").text();
        cited_by.table[1].h_index.since_2017 = $("tr:nth-child(2) .gsc_rsb_std+ .gsc_rsb_std").text();
        cited_by.table[2] = {};
        cited_by.table[2].i_index = {};
        cited_by.table[2].i_index.all = $("tr~ tr+ tr .gsc_rsb_sc1+ .gsc_rsb_std").text();
        cited_by.table[2].i_index.since_2017 = $("tr~ tr+ tr .gsc_rsb_std+ .gsc_rsb_std").text();

        console.log(author_results);
        console.log(articles);
        console.log(cited_by.table);
    })

    } catch (e) {
    console.log(e);
    }
    };
    getAuthorProfileData();