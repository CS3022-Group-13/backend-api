import { model } from "../../model";
import {validate as UUIDValidate} from "uuid";
import {EHandler, Handler} from "../../utils/types";
import {inspectBuilder, query} from "../../utils/inspect";


const inspector = inspectBuilder(
    query("orderId").optional().isUUID().withMessage("orderId query should be valid uuid"),
    query("customerId").optional().isUUID().withMessage("customerId query should be valid uuid"),
    query("orderStatus").optional()
        .custom(value => Object.values(model.order.status).includes(value)).withMessage("orderStatus is not valid"),
    query("orderDate").optional().isDate().withMessage("Date is not valid one")
)


/**
 * Return Order Details For A Specific Order
 * 
 * Response with
 *      order details
 * @param req 
 * @param res 
 */

const getOrderDetails:Handler = async (req, res) => {
    const {r} = res;

    const [error, data] = await model.order.order.getOrderBy_query(req.query);

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


export default [inspector, getOrderDetails as EHandler];


















