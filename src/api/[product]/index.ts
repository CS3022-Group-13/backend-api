import {Router} from "express";
import auth from "../../utils/auth"

const rProduct = Router();

/**
 * product end points
 */

import registerProduct from "./register";
import deleteProduct from "./delete";
import viewProduct from "./view";
import updateProduct from "./update";

rProduct.post("/register", auth.iMan, registerProduct);
rProduct.delete("/delete/:productId", auth.iMan, deleteProduct);
rProduct.get("/view", auth.iMan, viewProduct);
rProduct.put("/update/:productId", auth.iMan, updateProduct);


/**
 * stock end points
 */

import registerStock from "./stock/register";
import deleteStock from "./stock/delete";
import viewStock from "./stock/view";
import updateStock from "./stock/update";

rProduct.post("/stock/register", auth.iMan, registerStock);
rProduct.delete("/stock/delete/:stockId", auth.iMan, deleteStock);
rProduct.get("/stock/view", auth.iMan, viewStock);
rProduct.put("/stock/update/:stockId", auth.iMan, updateStock);


export default rProduct;