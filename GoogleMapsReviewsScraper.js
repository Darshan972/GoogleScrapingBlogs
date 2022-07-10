const unirest = require("unirest");
const cheerio = require("cheerio");

const getReviewsData = () => {
  return unirest
    .get("https://www.google.com/async/reviewDialog?hl=en_us&async=feature_id:0x47e66e2964e34e2d:0x8ddca9ee380ef7e0,next_page_token:,sort_by:qualityScore,start_index:,associated_topic:,_fmt:pc")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      console.log(response.body)
      let $ = cheerio.load(response.body);

      let user = [] , location_info,data_id,token;

      $(".lcorif").each((i, el) => {
        data_id = $(".loris").attr("data-fid");
        token = $(".gws-localreviews__general-reviews-block").attr(
          "data-next-page-token"
        );
        location_info = {
          title: $(".P5Bobd").text(),
          address: $(".T6pBCe").text(),
          avgRating: $("span.Aq14fc").text(),
          totalReviews: $("span.z5jxId").text(),
        };
      });

      $(".gws-localreviews__google-review").each((i, el) => {
        user.push({
        name:$(el).find(".TSUbDb").text(),
  
        link:$(el).find(".TSUbDb a").attr("href"),
  
        thumbnail: $(el).find(".lDY1rd").attr("src"),
  
        numOfreviews:$(el).find(".Msppse").text(),
  
        rating:$(el).find(".EBe2gf").attr("aria-label"),
  
        review:$(el).find(".Jtu6Td").text(),
  
        images:$(el)
          .find(".EDblX .JrO5Xe")
          .toArray()
          .map($)
          .map(d => d.attr("style").substring(21 , d.attr("style").lastIndexOf(")")))
        })
    });
    console.log("LOCATION INFO: ")
    console.log(location_info)
    console.log("DATA ID:")
    console.log(data_id)
    console.log("TOKEN:");
    console.log(token)
    console.log("USER:")
    console.log(user)
    });
};

getReviewsData();
