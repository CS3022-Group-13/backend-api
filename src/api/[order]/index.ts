import {Router} from "express";
import viewOrder from './viewOrder';


const rOrder = Router();

rOrder.get('/view-order/:order_id', viewOrder);


export default rOrder