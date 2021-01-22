import {Router} from "express";

import userLogin     from "./login"
import userRegister from "./register";

const rUser = Router();

rUser.post('/login', userLogin)
rUser.post('/register', userRegister)

export default rUser