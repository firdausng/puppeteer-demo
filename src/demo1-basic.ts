
import * as puppeteer from "puppeteer-core";
import { ChrominiumBrowser } from "./browser";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: ChrominiumBrowser.chrome
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  //await browser.close();
})();