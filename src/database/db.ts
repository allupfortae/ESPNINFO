import { DataSource } from "typeorm";
import { ESPN } from "./entity/espn";
import { PLAYERS } from "./entity/playersHref";

export const source = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4001,
  username: "root",
  password: "password",
  database: "espnscraperinfo",
  entities: [ESPN, PLAYERS],
  logging: false,
  synchronize: true,
  connectTimeout: 100000,
  socketPath: "/tmp/mysql.sock",
});

source
  .initialize()
  .then(() => {
    console.log("Database Sucessfully Connected");
  })
  .catch((error) => {
    console.log(error);
  });
