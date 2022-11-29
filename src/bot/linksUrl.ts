import { Browser, Page, Puppeteer, PuppeteerNode } from "puppeteer";
const pupeppteer = require("puppeteer");

let removingNull;
export const getAllLinks = async (brave) => {
  const browswer = await pupeppteer.launch({
    headless: true,
    executablePath: `${brave}`,
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
