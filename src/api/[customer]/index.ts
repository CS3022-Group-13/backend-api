import {Router} from "express";
import customerLogin from './login';
import customerRegister from './register';


const rCustomer = Router();

rCustomer.post('/login', customerLogin);
rCustomer.post('/register', customerRegister);

export default rCustomer