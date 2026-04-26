const fs = require("fs");

async function run() {
  try {
    const res = await fetch("https://www.jftna.org/jft/");
    const html = await res.text();

    // Grab the main reading text (simple scrape)
    const titleMatch = html.match(/<h1.*?>(.*?)<\/h1>/i);
    const textMatch = html.match(/<p>(.*?)<\/p>/i);

    const title = titleMatch ? titleMatch[1].replace(/<.*?>/g, "") : "Just For Today";
    const text = textMatch ? textMatch[1].replace(/<.*?>/g, "") : "Stay positive and keep moving forward.";

    const data = {
      title,
      text,
      link: "https://www.jftna.org/jft/"
    };

    fs.writeFileSync("reading.json", JSON.stringify(data, null, 2));
    console.log("Reading updated");
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
