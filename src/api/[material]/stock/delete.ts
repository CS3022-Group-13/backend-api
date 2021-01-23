import {EHandler, Handler} from "../../../utils/types";
import {model} from "../../../model";
import {inspectBuilder, param} from "../../../utils/inspect";

const inspector = inspectBuilder(
    param("stockId").isUUID().withMessage("stockId is not valid")
);


const deleteStock: Handler = async (req, res) => {
    const {r} = res;

    const stockId = req.params.stockId;

    const error = await model.material.stock.deleteBy_stockId(stockId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Success`)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, deleteStock as EHandler];



