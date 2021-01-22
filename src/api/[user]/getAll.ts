import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {inspectBuilder, query} from "../../utils/inspect";


/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    query("email").optional().isEmail().withMessage("email query is not a valid email"),
    query("verified").optional().isBoolean().withMessage("verified query is not a valid boolean")
)

/**
 * :: STEP 2
 * Get list of users
 */
const getListOfUsers: Handler = async (req, res) => {
    const {r} = res;

    // Get all users
    const [error, users] = await model.user.user.getUserBy_query(req.query)

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .data(users)
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
