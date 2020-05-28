
import * as puppeteer from "puppeteer-core";
import { ChrominiumBrowser } from "./browser";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: ChrominiumBrowser.chrome
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.url().includes("google.com"))
            request.respond({
                status: 200,
                contentType: 'application/json; charset=utf-8',
                body: 'i change the request'
            });
        else
            request.continue();
    });


    await page.goto('https://google.com');
    await page.screenshot({ path: 'example.png' });

    //await browser.close();
})();