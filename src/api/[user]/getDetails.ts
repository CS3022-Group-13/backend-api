import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";


/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId")
        .isUUID(4).withMessage("Invalid user id"),
)

/**
 * :: STEP 2
 * Get list of users
 */
const getListOfUsers: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const {userId} = req.params || req.user.userId

    if (req.user.userType !== model.user.type.Admin &&
        req.user.userId !== userId) {
        r.status.UN_AUTH()
            .message("Admin users or owner can view details")
            .send()
        return;
    }

    // Get all users
    const [error, userDetails] = await model.user.user.getUserDetails(userId)

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .data(userDetails)
            .message("Success")
            .send()
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, getListOfUsers as EHandler]
