import { model } from "../../model";
import {EHandler, Handler} from "../../utils/types";
import {inspectBuilder, query} from "../../utils/inspect";


const inspector = inspectBuilder(
    query("status").optional().isBoolean().withMessage("status query is not a valid boolean")
)

/**
 * Return Customers Count
 * 
 * Response with
 *      customer count
 * Can filter by status
 * @param req 
 * @param res 
 */

const getAllCustomersCount: Handler = async (req, res) => {
    const {r} = res;

    const [error, data] = await model.customer.customer.getCustomersCountBy_query(req.query);

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


export default [inspector, getAllCustomersCount as EHandler];


















