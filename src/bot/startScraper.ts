export const startScraper = async (url: Array<string>, page: any) => {
  await page.goto(`${url}`, {
    waitUntil: "load",
    timeout: 0,
  });
  const teamNames: Array<string> = await page.$$eval(
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
