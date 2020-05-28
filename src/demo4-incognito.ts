
import * as puppeteer from "puppeteer-core";
import { ChrominiumBrowser } from "./browser";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: ChrominiumBrowser.chrome,
        slowMo: 50
    });
    const incognitoPage = await browser.createIncognitoBrowserContext();
    var page = await incognitoPage.newPage();

    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    //await browser.close();
})();