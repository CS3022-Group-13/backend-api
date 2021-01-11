import {EHandler, Handler} from "../types";
import {TokenMan} from "../token-man";
import {HRule, InspectorBuilder, CHECK} from "../inspector";

/**
 * :: STEP 1
 */
const inspectAuthHeader = InspectorBuilder(
    [
        HRule("authorization")(
            (value: string) => CHECK.jwt()(value.split(" ")[1]),
            {error:"Invalid authorization header", required: true}
        )
    ]
)

/**
 * :: STEP 2
 * @param req
 * @param res
 * @param next
 */
const parsePayload: Handler = (req, res, next) => {
    const {r} = res;

    const token = req.headers["authorization"]!.split(" ")[1];

    const payload = TokenMan.verifyAccessToken(token);
    if (!payload) {
        r.status.UN_AUTH()
            .data({expired: true})
            .message("Authentication token is expired")
            .send();
        return;
    }

    req.user = payload;
    next();
};

/**
 * :: STEP 3 Builder
 * @param userType
 */
function buildUserFilter(userType: "Regular" | "Administrator"): Handler {
    return (req, res, next) => {
        const {r} = res;

        if (req.user.userType === userType) {
            next();
            return;
        }

        r.status.UN_AUTH()
            .message(`Only ${userType} users are allowed to access`)
            .send()
    }
}


/**
 * Request Handler Chain
 */
export default {
    regular: [inspectAuthHeader, parsePayload as EHandler, buildUserFilter("Regular") as EHandler],
    admin: [inspectAuthHeader, parsePayload as EHandler, buildUserFilter("Administrator") as EHandler]
}