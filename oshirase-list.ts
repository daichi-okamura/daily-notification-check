/*
 * 電子請求受付システムにログインしなくても閲覧可能なお知らせのタイトル一覧を取得する
 */
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto("http://www.e-seikyuu.jp/");
await page.goto("https://www.kaigo.e-seikyuu.jp/KShinsei/main");

const selector = 'table.bg-blue01 .bc-blue01 > tbody > tr > td:nth-child(2) > span > a';

const notifications = await page.$$eval(selector, items => {
    return items.map(item => item.textContent);
});

console.log(notifications);

await browser.close();
