import {Router} from "express";
import viewOrder from './viewOrder';
import placeOrder from './placeOrder';

const rOrder = Router();

rOrder.get('/view-order/:order_id', viewOrder);
rOrder.post('/place-order', placeOrder);

export default rOrder