import { model } from "../../model";
import {validate as UUIDValidate} from "uuid";
import {EHandler, Handler} from "../../utils/types";


/**
 * Return Customer Details For A Specific Customer ID
 * 
 * Response with
 *      customer details
 * @param req 
 * @param res 
 */

const getCustomerDetails:Handler = async (req, res) => {
    const {r} = res;
    const customerId = req.params.customerId;

    if(!UUIDValidate(customerId)){
        r.status.BAD_REQ()
            .message("Invalid Customer ID")
            .data({
                customerId
            })
            .send();
        return;
    }

    const [error, data] = await model.customer.customer.findBy_customerId(customerId);

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
            .message("No Customer Found For The Given Customer Id")
            .data({
                customerId
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();

}

/**
 * Request Handler Chain
 */


export default [getCustomerDetails as EHandler];


















