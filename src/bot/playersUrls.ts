const pupeppteer = require("puppeteer");
import { getAllLinks } from "./linksUrl";
const brave = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
import { Browser, Page, Puppeteer, PuppeteerNode } from "puppeteer";

const playersHref = async (url: Array<string>, page: any) => {
  await page.goto(`${url}`, {
    waitUntil: "load",
    timeout: 0,
  });
  const nbaPlayersHref = await page.$$eval(".Table__TD a", (players: any) =>
    players.map((a) => a.href)
  );
  return nbaPlayersHref;
};

export const gettingPLayersHref = async () => {
  let removingNull;
  const Links = await getAllLinks(brave);
  removingNull = Links.filter((e) => {
    return e;
  });
  const browswer: Browser = await pupeppteer.launch({
    headless: true,
    executablePath: brave,
  });
  const page = await browswer.newPage();

  let href: Array<any> = [];
  for (let link of removingNull) {
    const players = await playersHref(link, page);
    console.log(link);
    href.push(players);
  }
  await browswer.close();
  return href;
};
