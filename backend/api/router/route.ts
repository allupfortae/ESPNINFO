import * as express from "express";
const router = express.Router();
import { runsInBackGround, getAllData } from "../controllers/controller";

router.route("/espn").post(runsInBackGround).get(getAllData);

export default router;
