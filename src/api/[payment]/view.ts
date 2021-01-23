import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {inspectBuilder, query} from "../../utils/inspect";

const inspector = inspectBuilder(
    query("paymentId").optional().isUUID().withMessage("paymentId is not valid"),
    query("customerId").optional().isString().withMessage("customerId is not valid"),
    query("invoiceId").optional().isString().withMessage("invoiceId is not valid")
);

const viewProduct: Handler = async (req, res) => {
    const {r} = res;
    const query = req.query;

    const [error, payments] = await model.order.payment.findBy_query(query)

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data(payments)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, viewProduct as EHandler];



