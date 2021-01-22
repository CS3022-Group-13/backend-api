import {Router} from "express";
import auth from '../../utils/auth'

import userLogin from "./login"
import userRegister from "./register";
import userUpdate from "./update"
import updateCredential from "./credential"
import getAll from "./getAll";
import getDetails from "./getDetails";
import verify from "./verify";

const rUser = Router();

rUser.post('/login', userLogin)
rUser.post('/register', userRegister)

rUser.put('/update-details/:userId*?', auth.any, userUpdate)
rUser.put('/update-credentials/:userId', auth.any, updateCredential)

// allow query
rUser.get('/get-users', auth.admin, getAll)
rUser.get('/get-details/:userId*?', auth.any, getDetails)

rUser.put('/change-status/:userId', auth.admin, verify)

export default rUser