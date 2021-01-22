import { model } from "../../model";
import {validate as UUIDValidate} from "uuid";
import {EHandler, Handler} from "../../utils/types";



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
    const orderId = req.params.order_id;

    if(!UUIDValidate(orderId)){
        r.status.BAD_REQ()
            .message("Invalid Order ID")
            .data({
                orderId
            })
            .send();
        return;
    }

    const [error, data] = await model.order.order.findBy_orderId(orderId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data({
                data
            })
            .send();
        return;
    }

     if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("No Order Found For The Given Order Id")
            .data({
                orderId
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();

}

/**
 * Request Handler Chain
 */


export default [getOrderDetails as EHandler];


















