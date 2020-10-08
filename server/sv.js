const express = require("express");
const app = express();
const port = 5000;
const puppeteer = require("puppeteer");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/url", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://sports.yahoo.com/nba/");

  const [el] = await page.$x(
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[3]/div/div/div/ul/li[3]/div/div/div[2]/h3/a/text()"
  );
  const txt = await el.getProperty("textContent");
  const title = await txt.jsonValue();

  const [el1] = await page.$x(
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[3]/div/div/div/ul/li[8]/div/div/div[2]/h3/a/text()"
  );
  const txt1 = await el1.getProperty("textContent");
  const title1 = await txt1.jsonValue();

  const [el2] = await page.$x(
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[3]/div/div/div/ul/li[12]/div/div/div[2]/h3/a/text()"
  );
  const txt2 = await el2.getProperty("textContent");
  const title2 = await txt2.jsonValue();

  browser.close();
  res.send({ title, title1, title2 });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
