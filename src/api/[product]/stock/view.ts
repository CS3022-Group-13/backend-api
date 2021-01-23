import {EHandler, Handler} from "../../../utils/types";
import {model} from "../../../model";
import {inspectBuilder, query} from "../../../utils/inspect";

const inspector = inspectBuilder(
    query("stockId").optional().isUUID().withMessage("stockId is not valid"),
    query("productId").optional().isUUID().withMessage("productId is not valid")
);


const view: Handler = async (req, res) => {
    const {r} = res;

    const query = req.query

    const [error, stockData] = await model.product.stock.findBy_query(query);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data({
                stockData
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Stock ID is not found")
            .send();
        return;
    }
    r.prebuild.ISE().send();
};

export default [inspector, view as EHandler];



