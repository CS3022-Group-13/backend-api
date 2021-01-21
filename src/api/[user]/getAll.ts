import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";


/**
 * :: STEP 1
 * validating fields
 */
// const inspector = inspectBuilder(
//
// )

/**
 * :: STEP 2
 * Get list of users
 */
const getListOfUsers: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const {email, verified} = req.query

    // Get all users
    const [error, users] = await model.user.user.getUserBy_query(email as string, verified as unknown as boolean)

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
export default [getListOfUsers as EHandler]
