import { source } from "../db";

import { PLAYERS } from "../entity/playersHref";
export const insertPlayersUrls = async (href: Array<any>) => {
  const info = await source.getRepository(PLAYERS).create();
  const respone = await source.getRepository(PLAYERS).save(info);
  console.log("success", respone);
  return respone;
};

export const getPlayerUrls = async () => {
  const respone = await source.getRepository(PLAYERS).find();
  return respone;
};
