import {Router} from "express";
import viewOrder from './viewOrder';
import placeOrder from './placeOrder';
import change from "./change";

import auth from "../../utils/auth"

const rOrder = Router();

rOrder.post('/place-order', auth.cus, placeOrder);
rOrder.get('/view-orders', auth.cus_sMan, viewOrder);
rOrder.put('/update-status', auth.sMan, change);

export default rOrder