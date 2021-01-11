import {Router} from "express";
import {rBuilder} from "../utils/resp";
import cAbout from "./about";
import rUser from "./[user]"

export const rApi = Router();

// Specific middlewares for /api routes
rApi.use(rBuilder);

// Endpoints
rApi.get("/", cAbout);

// Routers
rApi.use("/user", rUser)

// Router
export default rApi