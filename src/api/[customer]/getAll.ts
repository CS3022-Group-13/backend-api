import { model } from "../../model";
import {EHandler, Handler} from "../../utils/types";
import {inspectBuilder, query} from "../../utils/inspect";


const inspector = inspectBuilder(
    query("customerId").optional().isUUID().withMessage("customerId query should be valid uuid"),
    query("email").optional().isEmail().withMessage("email query is not a valid email"),
    query("status").optional().isBoolean().withMessage("status query is not a valid boolean")
)

/**
 * Return Customer Details For A Specific Customer ID
 * 
 * Response with
 *      customer details
 * @param req 
 * @param res 
 */

const getAllCustomers: Handler = async (req, res) => {
    const {r} = res;

    const [error, data] = await model.customer.customer.getCustomerBy_query(req.query);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data({
                data
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();

}

/**
 * Request Handler Chain
 */


export default [inspector, getAllCustomers as EHandler];


















