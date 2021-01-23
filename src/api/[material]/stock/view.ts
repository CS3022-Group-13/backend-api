import {EHandler, Handler} from "../../../utils/types";
import {model} from "../../../model";
import {inspectBuilder, query} from "../../../utils/inspect";

const inspector = inspectBuilder(
    query("stockId").optional().isUUID().withMessage("stockId is not valid"),
    query("materialId").optional().isUUID().withMessage("materialId is not valid")
);


const view: Handler = async (req, res) => {
    const {r} = res;

    const query = req.query

    const [error, stocks] = await model.material.stock.findBy_query(query);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data(stocks)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, view as EHandler];



