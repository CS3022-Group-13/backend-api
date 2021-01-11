import {EHandler, Handler} from "../../utils/types";
import {TokenMan} from "../../utils/token-man";
import {BRule, CHECK, InspectorBuilder} from "../../utils/inspector";


/**
 * :: STEP 1
 * Validate Request
 */
const inspectRequest = InspectorBuilder(
    [
        BRule("refresh")(
            CHECK.jwt(),
            {
                error: "Valid refresh token required",
                required: true
            }
        ),
        BRule("access")(
            CHECK.jwt(),
            {
                error:"Valid access token required",
                required: true
            }
        ),
    ]
)

/**
 * :: STEP 2
 * @param req
 * @param res
 */
const serveAccessToken: Handler = async (req, res) => {
    const {r} = res;
    const {refresh, access} = req.body;

    const newToken = TokenMan.refreshAccessToken(refresh, access);
    if (newToken) {
        r.status.OK()
            .token(newToken)
            .send();
        return;
    }

    r.status.UN_AUTH()
        .message("Invalid refresh or access token")
        .send();

};


/**
 * Request Handler Chain
 */
export default [inspectRequest, serveAccessToken as EHandler]
