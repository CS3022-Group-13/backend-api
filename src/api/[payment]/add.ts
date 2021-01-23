import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    body('customerId').isUUID().withMessage("customerId is invalid"),
    body('invoiceId').isUUID().withMessage("invoiceId is invalid"),
    body('amount').isNumeric().withMessage("amount should be number")
)

const addPaymentDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const paymentId = UUID()
    const paymentData = {
        paymentId,
        customerId: req.body.customerId,
        invoiceId: req.body.invoiceId,
        amount: req.body.amount,
        
    };

     // Sync model to database
     const error = await model.order.payment.addPayment(paymentData)

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data({
                paymentId
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, addPaymentDetails as EHandler]