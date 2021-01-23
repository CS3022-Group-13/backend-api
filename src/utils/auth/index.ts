import {EHandler, Handler} from "../types";
import {TokenMan} from "../tokenMan";
import {inspectBuilder, header} from "../inspect";

/**
 * :: STEP 1
 */
const inspector = inspectBuilder(
    header("authorization")
        .exists().withMessage("authorization token is required")
)

/**
 * :: STEP 2
 * @param req
 * @param res
 * @param next
 */
const parsePayload: Handler = (req, res, next) => {
    const {r} = res;

    const [_, token] = req.headers["authorization"]!.split(" ");

    const payload = TokenMan.verifyAccessToken(token);

    if (!payload) {
        r.status.UN_AUTH()
            .data({expired: true})
            .message("Authentication token is expired or invalid")
            .send();
        return;
    }

    req.user = payload;
    next();
};

/**
 * :: STEP 3 Builder
 * @param userTypes
 */
function buildUserFilter(userTypes: string[]): Handler {
    return (req, res, next) => {
        const {r} = res;

        if (userTypes.includes(req.user.userType)) {
            next();
            return;
        }

        r.status.UN_AUTH()
            .message(`Only ${userTypes.toString()} users are allowed to access`)
            .send()
    }
}


/**
 * Request Handler Chain
 */ 
export default {
    any: [inspector, parsePayload as EHandler],
    admin: [inspector, parsePayload as EHandler, buildUserFilter(["Administrator"]) as EHandler],
    sMan: [inspector, parsePayload as EHandler, buildUserFilter(["Sales Manager"]) as EHandler],
    iMan: [inspector, parsePayload as EHandler, buildUserFilter(["Inventory Manager"]) as EHandler],
    cus: [inspector, parsePayload as EHandler, buildUserFilter(["Customer"]) as EHandler],
    cus_sMan: [inspector, parsePayload as EHandler, buildUserFilter(["Customer", "Sales Manager"]) as EHandler],
    cus_iMan: [inspector, parsePayload as EHandler, buildUserFilter(["Customer", "Inventory Manager"]) as EHandler],
}