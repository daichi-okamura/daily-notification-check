import puppeteer, {Browser, Page} from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import {exists} from "https://deno.land/std/fs/mod.ts";

const OLD_JSON = "./old.json";
const fetchOld = async () => await exists(OLD_JSON) ? JSON.parse(Deno.readTextFileSync(OLD_JSON)) : []
const fetchNow = async () => {
    const browser: Browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    await page.goto('http://www.e-seikyuu.jp/');
    await page.goto('https://www.kaigo.e-seikyuu.jp/KShinsei/main');
    const selector: string = 'table.bg-blue01 .bc-blue01 > tbody > tr > td:nth-child(2) > span > a';
    const notifications = await page.$$eval(selector, a => a.map(b => b.text));
    await browser.close();
    return JSON.parse(JSON.stringify(notifications));
}

const diff = async () => {
    const now = await fetchNow();
    const old = await fetchOld();
    const result: string[] = [];
    for (let n of now) if (old.indexOf(n) < 0) result.push(n);
    Deno.writeTextFileSync(OLD_JSON, JSON.stringify(now));
    return result;
}

console.log(JSON.stringify(await diff()))
