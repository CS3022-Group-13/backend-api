import {Router} from "express";

import registerProduct from "./register";
import deleteProduct from "./delete";
import viewProduct from "./view";
import updateProduct from "./update"

const rProduct = Router();

rProduct.get('/')
rProduct.post('/register',registerProduct)
rProduct.delete('/delete/:productId',deleteProduct)
rProduct.get('/view/:productId',viewProduct)
rProduct.put('/update/:productId',updateProduct)


export default rProduct