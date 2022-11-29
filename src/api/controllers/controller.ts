import { gettingPLayersHref } from "../../bot/playersUrls";
import {
  insertPlayersUrls,
  getPlayerUrls,
} from "../../database/models/players";
import { Response, Request } from "express";

export const addingPlayersUrlsToDB = async (req: Request, res: Response) => {
  try {
    const playersUrls = await gettingPLayersHref();
    const playerUrlsData = await insertPlayersUrls(playersUrls);
    res.status(201).json({ playerUrlsData });
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
};
export const getPlayersUrlsFromDB = async (req: Request, res: Response) => {
  try {
    const getPlayersUrls = await getPlayerUrls();
    res.status(200).json({ getPlayersUrls });
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
};
