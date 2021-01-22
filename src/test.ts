import jwt from 'jsonwebtoken'
// import {randomBytes} from "crypto";
//
// const secret = randomBytes(20).toString('hex')

import {TokenMan} from "./utils/tokenMan";

async function main() {
    const p = {as: 12}
    const token = TokenMan.getAccessToken(p)
    const payload = TokenMan.verifyAccessToken(token)
    // const payload = jwt.verify(token, "secretkey")
    console.log(token)
    console.log(payload)
}


main().then(console.log).catch(console.log)