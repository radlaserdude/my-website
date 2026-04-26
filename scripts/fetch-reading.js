const fs = require("fs");
const https = require("https");

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";

      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function run() {
  try {
    const html = await fetchPage("https://www.jftna.org/jft/");

    const titleMatch = html.match(/<h1.*?>(.*?)<\/h1>/i);
    const textMatch = html.match(/<p>(.*?)<\/p>/i);

    const title = titleMatch ? titleMatch[1].replace(/<.*?>/g, "") : "Just For Today";
    const text = textMatch ? textMatch[1].replace(/<.*?>/g, "") : "Stay positive.";

    const data = {
      title,
      text,
      link: "https://www.jftna.org/jft/"
    };

    fs.writeFileSync("reading.json", JSON.stringify(data, null, 2));
    console.log("Reading updated");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
