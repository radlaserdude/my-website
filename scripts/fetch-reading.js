const https = require("https");

const url = "https://www.jftna.org/jft/";

https.get(url, (res) => {
  let data = "";

  res.on("data", chunk => data += chunk);

  res.on("end", () => {
    try {
      // VERY basic scrape (works as long as site structure stays similar)
      const titleMatch = data.match(/<h1.*?>(.*?)<\/h1>/i);
      const textMatch = data.match(/<p>(.*?)<\/p>/i);

      const title = titleMatch ? titleMatch[1].replace(/<.*?>/g, "") : "Just For Today";
      const text = textMatch ? textMatch[1].replace(/<.*?>/g, "") : "Read today's message";

      const result = {
        title,
        text,
        link: url
      };

      require("fs").writeFileSync("reading.json", JSON.stringify(result, null, 2));

      console.log("Reading updated!");
    } catch (err) {
      console.error("Error parsing:", err);
    }
  });

}).on("error", (err) => {
  console.error("Fetch error:", err);
});
