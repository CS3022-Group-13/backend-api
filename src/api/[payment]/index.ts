import {Router} from "express";
import auth from "../../utils/auth"

const rPayment = Router();

/**
 * product end points
 */

import add from "./add";
import remove from "./delete";
import view from "./view";

rPayment.post("/add", auth.sMan, add);
rPayment.delete("/remove/:productId", auth.sMan, remove);
rPayment.get("/get-details", auth.sMan, view);

export default rPayment;