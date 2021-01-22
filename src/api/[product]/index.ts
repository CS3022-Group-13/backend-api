import {Router} from "express";

import registerProduct from "./register";
import deleteProduct from "./delete";

const rProduct = Router();

rProduct.get('/')
rProduct.post('/register',registerProduct)
rProduct.delete('/delete/:id',deleteProduct)

export default rProduct