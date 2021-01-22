import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {body, inspectBuilder, param} from "../../utils/inspect";
import {compare} from "bcrypt";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId").exists().withMessage("userId is required")
        .isUUID(4).withMessage("Invalid user id"),
    body('currentPassword').exists()
        .withMessage("specify current password"),
    body('password').exists().withMessage("specify new password"),
)

/**
 * :: STEP 2
 * Update user credentials
 *
 *  message
 */
const updateUserCredentials: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId
    const {currentPassword, password} = req.body

    if (req.user.userId !== userId) {
        r.status.UN_AUTH()
            .message("Only owner can change credentials")
            .send()
        return;
    }

    // Sync model to database
    const [error1, account] = await model.user.account.findBy_userId(userId)

    if (error1 !== model.ERR.NO_ERROR) {
        r.status.BAD_REQ()
            .message("Couldn't retrieve data using userId")
            .send()
            return;
    }

    if (! await compare(currentPassword, account.password)) {
        r.status.UN_AUTH()
            .message("current password doesn't match")
            .send()
        return;
    }

    const hashed = await encrypt_password(password)

    // Update credentials
    const error = await model.user.account.updateBy_userId(userId, {password: hashed})

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Updated")
            .send();
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, updateUserCredentials as EHandler]
