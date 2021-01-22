import {Router} from "express";

 /**
  * product end points
  */

import registerProduct from "./register";
import deleteProduct from "./delete";
import viewProduct from "./view";
import updateProduct from "./update"

/**
 * stock end points
 */

import registerStock from "./registerstock";
import deleteStock from "./deletestock";
import viewStock from "./viewstock";
import updateStock from "./updatestock";

const rProduct = Router();

rProduct.get('/')
rProduct.post('/register',registerProduct)
rProduct.delete('/delete/:productId',deleteProduct)
rProduct.get('/view',viewProduct)
rProduct.put('/update/:productId',updateProduct)

rProduct.post('/registerstock',registerStock)
rProduct.delete('/deletestock/:stockId',deleteStock)
rProduct.get('/viewstock/:stockId',viewStock)
rProduct.put('/updatestock/:stockId',updateStock)


export default rProduct