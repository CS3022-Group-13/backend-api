import {EHandler, Handler} from "../../utils/types";

import {model} from "../../model";

import {body, inspectBuilder, param} from "../../utils/inspect";


/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId").exists().withMessage("userId is required")
        .isUUID(4).withMessage("Invalid user id"),
    body("verified").exists().withMessage("verified field is required")
        .isBoolean().withMessage("verified field must be a boolean")
)

/**
 * :: STEP 2
 * Update user status
 *
 *  message
 */
const updateUserCredentials: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId
    const data = req.body

    // Update account
    const error = await model.user.account.updateBy_userId(userId, data)

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
