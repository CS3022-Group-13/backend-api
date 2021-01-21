import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId").exists().withMessage("userId is required")
        .isUUID(4).withMessage("Invalid user id"),
    body('firstName').exists().withMessage("firstName is required"),
    body('lastName').exists().withMessage("lastName is required"),
    body('email').exists().withMessage("email is required"),
    body('telephone').exists().withMessage("telephone is required"),
    // body('userType').exists().withMessage("userType is required")
)

/**
 * :: STEP 2
 * Update user details
 *
 */
const updateUserDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        // userType: req.body.userType
    };

    // Sync model to database
    const error = await model.user.user.updateBy_userId(userId, userData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Updated")
            .data({
                userId
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, updateUserDetails as EHandler]
