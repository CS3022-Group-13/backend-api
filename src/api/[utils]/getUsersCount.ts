import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {inspectBuilder, query} from "../../utils/inspect";


/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    query("verified").optional().isBoolean().withMessage("verified query is not a valid boolean"),
    query("userType").optional().isString().withMessage("userType query is not a valid boolean")
)

/**
 * :: STEP 2
 * Get list of users
 */
const getUsersCount: Handler = async (req, res) => {
    const {r} = res;

    // Get all sales managers count
    const [error, count] = await model.user.user.getUsersCountBy_query(req.query)

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .data(count)
            .message("Success")
            .send()
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, getUsersCount as EHandler]
