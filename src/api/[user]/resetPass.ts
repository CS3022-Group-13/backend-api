import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {inspectBuilder, param} from "../../utils/inspect";
import {randomBytes} from "crypto";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId").isUUID(4).withMessage("Invalid user id"),
);

/**
 * :: STEP 2
 * Reset user credentials
 *
 *  message
 */
const resetUserCredentials: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId;
    const password = randomBytes(3).toString('hex')

    const hashed = await encrypt_password(password);

    // Update credentials
    const error = await model.user.account.updateBy_userId(userId, {password: hashed});

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Password reset")
            .data({
                password
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, resetUserCredentials as EHandler];
