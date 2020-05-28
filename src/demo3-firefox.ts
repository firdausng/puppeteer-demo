
import * as puppeteer from "puppeteer";
import { ChrominiumBrowser } from "./browser";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    product: 'firefox'
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  //await browser.close();
})();