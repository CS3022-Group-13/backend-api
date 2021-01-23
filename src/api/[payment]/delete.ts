import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";


const inspector = inspectBuilder(
    param("paymentId").isUUID().withMessage("paymentId is not valid")
);


const deletePayment: Handler = async (req, res) => {
    const {r} = res;

    const paymentId = req.params.paymentId;

    const error = await model.order.payment.deleteBy_paymentId(paymentId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Success`)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, deletePayment as EHandler];



