import {Router} from "express";
import {rBuilder} from "../utils/resp";

export const rApi = Router();

// Specific middlewares for /api routes
rApi.use(rBuilder);

// Endpoints
import cAbout from "./about";
rApi.get("/", cAbout);

// Routers
import rUser from "./[user]"
import rCustomer from "./[customer]";
import rOrder from "./[order]";
import rProduct from "./[product]";
import rMaterial from "./[material]";

rApi.use("/user", rUser)
rApi.use("/customer", rCustomer)
rApi.use("/order", rOrder)
rApi.use("/product", rProduct)
rApi.use("/material", rMaterial)

// Router
export default rApi