import {Router} from "express";

import registerProduct from "./register";

const rProduct = Router();

rProduct.get('/')
rProduct.post('/register',registerProduct)

export default rProduct