import { Puppeteer, PuppeteerNode } from "puppeteer";

const pupeppteer = require("puppeteer");
const brave = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
let removingNull;

export const startScraper = async (url: Array<string>, page: any) => {
  await page.goto(`${url}`, {
    waitUntil: "load",
    timeout: 0,
  });
  const teamNames: string[] = await page.$$eval(
    ".ClubhouseHeader__Name",
    (team) => team.map((t) => t.textContent)
  );
  const teamTitles: Array<string> = await page.$$eval(".Table__Title", (team) =>
    team.map((t) => t.textContent)
  );
  const teamStats: number = await page.$$eval(
    ".Table__Head .Table__TR .Table__TH a",
    (team) => team.map((t) => t.textContent)
  );
  const totalStats: number = await page.$$eval(
    ".Table__TBODY .Stats__TotalRow span",
    (team) => team.map((t) => t.textContent)
  );
  const names: Array<string> = await page.$$eval(".Table__TD a", (team) =>
    team.map((t) => t.textContent)
  );
  const namesHref: Array<string> = await page.$$eval(".Table__TD a", (team) =>
    team.map((a) => a.href)
  );
  const positions: Array<string> = await page.$$eval(
    ".Table__TD .font10",
    (team) => team.map((t) => t.textContent)
  );

  return {
    team: teamNames,
    title: teamTitles,
    stats: teamStats,
    total: totalStats,
    names: names,
    href: namesHref,
    positions: positions,
  };
};

// const getNflNbalinks = async (url) => {
//   const browswer = await pupeppteer.launch({
//     headless: false,
//     executablePath: brave,
//   });
//   const page = await browswer.newPage();
//   await page.goto(`${url}`),
//     {
//       waitUntil: "load",
//       timeout: 0,
//     };
//   const navLinks = await page.$$eval("#gobal-nav ul li a .link-text", (a) =>
//     a.map((h) => {
//       const text = h.textContent;
//       if (text.includes("NFl") && text.includes("NBA")) {
//         return h.href;
//       }
//     })
//   );
//   console.log(navLinks);
//   return navLinks;
// };

const getAllLinks = async () => {
  const browswer = await pupeppteer.launch({
    headless: true,
    executablePath: brave,
  });
  const page = await browswer.newPage();
  const places = ["nfl", "nba"];
  removingNull = places.filter((e) => {
    return e;
  });
  for (let place of removingNull) {
    await page.goto(`https://www.espn.com/${place}/teams`, {
      waitUntil: "load",
    });
  }
  const linksTeam = await page.$$eval(".TeamLinks__Links span a", (team) =>
    team.map((a) => {
      const text = a.textContent;
      if (text.includes("Statistics")) return a.href;
    })
  );
  await browswer.close();
  return linksTeam;
};
interface Main {
  team: string[];
  title: string[];
  stats: number;
  total: number;
  names: string[];
  href: string[];
  positions: string[];
}

export const main = async () => {
  const scraperLinks = await getAllLinks();
  removingNull = scraperLinks.filter((e) => {
    return e;
  });
  const browswer = await pupeppteer.launch({
    headless: true,
    executablePath: brave,
  });
  const page = await browswer.newPage();
  const scrapedaData: any = [];

  for (let links of removingNull) {
    const scraper = await startScraper(links, page);
    scrapedaData.push(scraper);
  }
  await browswer.close();
  return scrapedaData;
};
