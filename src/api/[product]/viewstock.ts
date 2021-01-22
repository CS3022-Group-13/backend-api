import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";

const inspector = inspectBuilder(
    param('stockId').isUUID().withMessage("stockId is not valid")
    
)
const viewProduct : Handler = async (req,res) => {
    const {r} = res;

    const stockId = req.params.stockId;
    
    
    const [error,stockData] = await model.product.product.findBy_productID(stockId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data({
                stockData,
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Stock ID is not found")
            .send()
        return;
    }
    r.prebuild.ISE().send();
    }

export default [inspector, viewProduct as EHandler];



