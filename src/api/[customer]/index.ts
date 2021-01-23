import {Router} from "express";
import customerLogin from './login';
import customerRegister from './register';
import customerDetails from './getAll';
import update from "./update";
import credential from "./credential";

import auth from "../../utils/auth"


const rCustomer = Router();

rCustomer.post('/login', customerLogin);
rCustomer.post('/add-customer', auth.sMan, customerRegister);

rCustomer.get('/get-details', auth.cus_sMan, customerDetails);

rCustomer.put('/update-details/:customerId', auth.cus, update);
rCustomer.put('/update-acc/:customerId', auth.cus_sMan, credential);

export default rCustomer