import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param("orderId").optional()
        .isUUID(4).withMessage("Invalid order id"),
    body("orderStatus")
        .custom(value => Object.values(model.order.status).includes(value))
        .withMessage("orderStatus is not valid")
);

/**
 * :: STEP 2
 * Update user details
 *
 */
const updateUserDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const orderId = req.params.orderId;
    const orderStatus = req.body.orderStatus

    // Sync model to database
    const error = await model.order.order.updateBy_orderId(orderId, orderStatus)

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
export default [inspector, updateUserDetails as EHandler];
