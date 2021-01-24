import {Router} from "express";
import customersCount from "./getAllCustomerCount";
import auth from "../../utils/auth";
import usersCount from "./getUsersCount";


const rUtils = Router();

rUtils.get('/customers',auth.admin,customersCount);
rUtils.get('/users',auth.admin,usersCount);



export default rUtils;