import {compare} from "bcrypt";
import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {TokenMan} from "../../utils/tokenMan";
import {inspectBuilder, body} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    body('username').exists().withMessage("username is required"),
    body('password').exists().withMessage("password is required"),
)

/**
 * :: STEP 2
 * Validate username + password
 */
const validateCredentials: Handler = async (req, res, next) => {
    const {r} = res;
    const {username, password} = req.body;

    const [error, account] = await model.customer.account.findBy_username(username);

    if (error === model.ERR.NO_ERROR) {
        // password verification
        if (!await compare(password, account.password)) {
            r.status.UN_AUTH()
                .message("Incorrect username or password")
                .send();
            return;
        }

        if (!account.status) {
            r.status.UN_AUTH()
                .message("Your account is disabled")
                .send();
            return;
        }

        req.body.customerId = account.customerId; // bind customerId to request
        next(); // send pair of tokens
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Customer data doesn't exists")
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
    const {customerId} = req.body;

    // creating payload model
    const [error, customerData] = await model.customer.customer.findBy_customerId(customerId);
    if (error !== model.ERR.NO_ERROR) {
        r.prebuild.ISE().send();
        return;
    }

    // create token
    const accessToken = TokenMan.getAccessToken({...customerData, userType: "Customer"});

    r.status.OK()
        .data({
            customerData
        })
        .token(accessToken)
        .message("Success")
        .send();
};

/**
 * Request Handler Chain
 */
export default [inspector, validateCredentials as EHandler, ServeTokenPair as EHandler]
