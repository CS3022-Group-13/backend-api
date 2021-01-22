import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("userId").optional()
        .isUUID(4).withMessage("Invalid user id"),
    body("firstName").exists().withMessage("firstName is required"),
    body("lastName").exists().withMessage("lastName is required"),
    body("email").isEmail().withMessage("email is required"),
    body("telephone").isMobilePhone("any").withMessage("telephone is required")
);

/**
 * :: STEP 2
 * Update user details
 *
 */
const updateUserDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId || req.user.userId;
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone
    };

    if (req.user.userId !== userId) {
        r.status.UN_AUTH()
            .message("Only owner can change details")
            .send();
        return;
    }

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

    if (error === model.ERR.DUPLICATE_ENTRY) {
        r.status.BAD_REQ()
            .message("Email is associated with another account")
            .send();
        return;
    }

    r.prebuild.ISE().send();
};


/**
 * Request Handler Chain
 */
export default [inspector, updateUserDetails as EHandler];
