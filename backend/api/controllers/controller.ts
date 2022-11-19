import { main } from "../../bot/main";
import { insertData, getData } from "../../database/db";
import { Response, Request } from "express";

export const runsInBackGround = async (req: Request, res: Response) => {
  try {
    interface Main {
      team: string[];
      title: string[];
      stats: number;
      total: number;
      names: string[];
      href: string[];
      positions: string[];
    }
    const data: Main = await main();

    const espnData = await insertData(
      data.team,
      data.title,
      data.stats,
      data.total,
      data.names,
      data.href,
      data.positions
    );
    res.status(201).json({ espnData });
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
};
export const getAllData = async (req: Request, res: Response) => {
  try {
    const espninfo = await getData();
    res.status(200).json(espninfo);
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
};
