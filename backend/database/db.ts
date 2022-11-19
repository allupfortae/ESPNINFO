import { DataSource } from "typeorm";
import { espn } from "../database/entity/espn";

const source = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4001,
  username: "root",
  password: "password",
  database: "espnscraperinfo",
  entities: [espn],
  logging: false,
  synchronize: true,
  connectTimeout: 100000,
  socketPath: "/tmp/mysql.sock",
});

export const insertData = async (
  team: string[],
  title: string[],
  stats: number,
  total: number,
  name: string[],
  href: string[],
  positions: string[]
) => {
  const connection = source;
  const espninfo = new espn();
  espninfo.team = team;
  espninfo.title = title;
  espninfo.stats = stats;
  espninfo.total = total;
  espninfo.name = name;
  espninfo.href = href;
  espninfo.positions = positions;

  const espnRepo = connection.getRepository(espn);
  const respone = await espnRepo.save(espninfo);
  console.log("sucess", respone);

  const ESPNDATA = await espnRepo.find();
  return ESPNDATA;
};

export const getData = async () => {
  const connection = source;
  const espnRepo = connection.getRepository(espn);
  const ESPNDATA = await espnRepo.find();
  return ESPNDATA;
};

source
  .initialize()
  .then(() => {
    console.log("Database Sucessfully Connected");
  })
  .catch((error) => {
    console.log(error);
  });
