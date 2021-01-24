import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("customerId").optional()
        .isUUID(4).withMessage("Invalid customer id"),
    body("password").optional().exists().withMessage("specify new password"),
    body("status").optional().exists().isBoolean().withMessage("status not valid")
);

/**
 * :: STEP 2
 * Update user credentials
 *
 *  message
 */
const updateCustomerCredentials: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const customerId = req.params.customerId;
    const data: any = {
        status: req.body.status
    };

    if (req.body.password)
        data.password = await encrypt_password(req.body.password);

    // Update credentials
    const error = await model.customer.account.updateBy_customerId(customerId, data);

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
export default [inspector, updateCustomerCredentials as EHandler];
