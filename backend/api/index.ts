import * as express from "express";
import * as bodyParser from "body-parser";
import { json, urlencoded } from "body-parser";
const app: Application = express();
const PORT: number = 4000;
import { Response, Request } from "express";
import router from "../api/router/route";
import { Application } from "express";
bodyParser.json();
bodyParser.urlencoded({ extended: false });
app.use(json());
app.use(urlencoded({ extended: false }));

const espn: express.Router = router;

app.get("/", (req: Request, res: Response) => {
  res.send("<h1 style='font-size: 35px; text-align: center;'>Hello</h1>");
});

app.use("/api/v1", espn);

app.listen(PORT, () => {
  console.log(`App is listning on port http://localhost:${PORT}`);
});
