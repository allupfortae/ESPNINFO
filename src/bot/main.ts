import { Browser, Page, Puppeteer, PuppeteerNode } from "puppeteer";
import { Main } from "../../interfaces";
import { getAllLinks } from "./linksUrl";
import { startScraper } from "./startScraper";

const pupeppteer = require("puppeteer");
const brave = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";

export const main = async (): Promise<Main> => {
  let removingNull;
  const scraperLinks = await getAllLinks(brave);
  removingNull = scraperLinks.filter((e) => {
    return e;
  });
  const browswer = await pupeppteer.launch({
    headless: true,
    executablePath: brave,
  });
  const page = await browswer.newPage();
  const scrapedData: any = [];

  for (let links of removingNull) {
    const scraper: Main = await startScraper(links, page);
    scrapedData.push(scraper);
  }
  await browswer.close();
  return scrapedData;
};
