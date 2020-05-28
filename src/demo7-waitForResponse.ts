
import * as puppeteer from "puppeteer-core";
import { ChrominiumBrowser } from "./browser";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: ChrominiumBrowser.chrome
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type(`input[name="q"]`, `sitecore`)
  await page.waitForResponse(response => {
    return response.url().includes(`complete/search`)
});
  //await browser.close();
})();