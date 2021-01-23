import {Router} from "express";
import customerLogin from './login';
import customerRegister from './register';
import customerDetails from './getCustomerDetails';


const rCustomer = Router();

rCustomer.post('/login', customerLogin);
rCustomer.post('/register', customerRegister);
rCustomer.get('/get-details/:customerId', customerDetails);

export default rCustomer