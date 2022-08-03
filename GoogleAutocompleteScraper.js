const unirest = require("unirest");

const searchSuggestions = async () => {
  try {
    const response = await unirest
      .get("https://www.google.com/complete/search?&hl=en&q=coffee&gl=us&client=chrome")
      .headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      })

    let data = JSON.parse(response.body);
    let suggestions = [];
    for (let i = 0; i < data[1].length; i++) {
      suggestions.push({
        value: data[1][i],
        relevance: data[4]["google:suggestrelevance"][i],
        type: data[4]["google:suggesttype"][i],
      });
    }
    const verbatimRelevance = data[4]["google:verbatimrelevance"]

    console.log(suggestions)
    console.log(verbatimRelevance)
    
  } catch (e) {
    console.log("Error : " + e);
  }
};

searchSuggestions();
