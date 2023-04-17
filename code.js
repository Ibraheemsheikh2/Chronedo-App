const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 8080;

let browser;

async function getBrowserInstance() {
  if (!browser) {
    browser = await puppeteer.launch({ headless: true });
  }
  return browser;
}

async function scrapeWatches(url) {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  const data = await page.evaluate(() => {
    const watchItems = document.querySelectorAll(".article-item-container");
    const watches = [];

    watchItems.forEach((item) => {
      const linkElement = item.querySelector("a");
      const titleElement = item.querySelector(".text-bold.text-ellipsis");
      const subtitleElement = item.querySelector(".text-ellipsis.m-b-2");
      const priceElement = item.querySelector(
        ".d-flex.justify-content-between.align-items-end.m-b-1 .text-bold"
      );
      const imageElement = item.querySelector(
        ".article-item-image-container img"
      );
      const imageUrl = imageElement ? imageElement.src : null;
      watches.push({
        link: linkElement ? linkElement.href : null,
        title: titleElement ? titleElement.innerText.trim() : null,
        subtitle: subtitleElement ? subtitleElement.innerText.trim() : null,
        price: priceElement ? priceElement.innerText.trim() : null,
        image: imageUrl,
      });
    });

    return watches;
  });

  await page.close();
  return data;
}


app.get("/rolex", async (req, res) => {
  const url = "https://www.chrono24.com/rolex/ref-126334.htm";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/iwc", async (req, res) => {
  const url =
    "https://www.chrono24.com/search/index.htm?currencyId=USD&dosearch=true&manufacturerIds=124&maxAgeInDays=0&pageSize=60&redirectToSearchIndex=true&referenceNumber=iw371605%24124&resultview=block&sortorder=0";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/omega", async (req, res) => {
  const url = "https://www.chrono24.com/omega/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.get("/breitling", async (req, res) => {
const url = "https://www.chrono24.com/breitling/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/audemarspiguet", async (req, res) => {
  const url =
    "https://www.chrono24.com/audemarspiguet/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/hublot", async (req, res) => {
  const url = "https://www.chrono24.com/hublot/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/panerai", async (req, res) => {
  const url = "https://www.chrono24.com/panerai/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/patekphilippe", async (req, res) => {
  const url =
    "https://www.chrono24.com/patekphilippe/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/tudor", async (req, res) => {
  const url = "https://www.chrono24.com/tudor/index.htm?goal_suggest=1";

  try {
    const data = await scrapeWatches(url);
    console.log(data.length);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});