import {compare} from "bcrypt";
import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {CHECK, InspectorBuilder, BRule} from "../../utils/inspector";
import {TokenMan} from "../../utils/token-man";

/**
 * :: STEP 1
 * Validate Request
 */
const inspectRequest = InspectorBuilder(
    [
        BRule("username")(
            CHECK.length(0, 30),
            {
                error: "username is required",
                required: true
            }
        ),
        BRule("password")(
            CHECK.length(0, 30),
            {
                error: "password is required",
                required: true
            }
        ),
    ]
)

/**
 * :: STEP 2
 * Validate username + password
 */
const validateCredentials: Handler = async (req, res, next) => {
    const {r} = res;
    const {username, password} = req.body;

    const [error, account] = await model.userAccount.findBy_username(username);

    if (error === model.ERR.NO_ERROR) {
        // password verification
        if (!await compare(password, account.password)) {
            r.status.UN_AUTH()
                .message("Incorrect username or password")
                .send();
            return;
        }

        req.body.userId = account.userId; // bind userId to request
        next() // send pair of tokens
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("User doesn't exists")
            .send();
        return;
    }

    r.prebuild.ISE()
        .send();
};

/**
 * :: STEP 3
 * Serve JWT tokens
 *
 * Response with
 *      jwt access token + jwt refresh token
 * @param req : body->userId (as refresh token key, to query userData)
 * @param res
 */
const ServeTokenPair: Handler = async (req, res) => {
    const {r} = res;
    const {userId, userType} = req.body;

    // creating payload model
    const [error, userData] = await model.user.findBy_userId(userId);
    if (error !== model.ERR.NO_ERROR) {
        r.prebuild.ISE().send();
        return;
    }

    // create token
    const refreshToken = TokenMan.getRefreshToken(userId);
    const accessToken = TokenMan.getAccessToken(userData);

    r.status.OK()
        .data({
            userData
        })
        .tokenPair(accessToken, refreshToken)
        .message("Success")
        .send();
};

/**
 * Request Handler Chain
 */
export default [inspectRequest, validateCredentials as EHandler, ServeTokenPair as EHandler]