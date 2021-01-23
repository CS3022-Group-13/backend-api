import {Router} from "express";

const rProduct = Router();

/**
 * product end points
 */

import registerProduct from "./register";
import deleteProduct from "./delete";
import viewProduct from "./view";
import updateProduct from "./update";

rProduct.post("/register", registerProduct);
rProduct.delete("/delete/:productId", deleteProduct);
rProduct.get("/view", viewProduct);
rProduct.put("/update/:productId", updateProduct);


/**
 * stock end points
 */

import registerStock from "./stock/register";
import deleteStock from "./stock/delete";
import viewStock from "./stock/view";
import updateStock from "./stock/update";

rProduct.post("/stock/register", registerStock);
rProduct.delete("/stock/delete/:stockId", deleteStock);
rProduct.get("/stock/view", viewStock);
rProduct.put("/stock/update/:stockId", updateStock);


export default rProduct;