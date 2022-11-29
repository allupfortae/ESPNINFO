import * as express from "express";
const router = express.Router();
import {
  addingPlayersUrlsToDB,
  getPlayersUrlsFromDB,
} from "../controllers/controller";

router.route("/espn").post(addingPlayersUrlsToDB).get(getPlayersUrlsFromDB);

export default router;
