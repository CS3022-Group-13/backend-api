import {EHandler, Handler} from "../../../utils/types";
import {model} from "../../../model";
import {body, inspectBuilder, param} from "../../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param('stockId').isUUID().withMessage("stockId is not valid"),
    // body('productId').isUUID().withMessage("productId is not valid"),
    // body('productName').exists().withMessage("productName is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitPrice is required"),
    body('date').isDate().withMessage("date is not valid")
    
)

const updateStockDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const stockId = req.params.stockId;
    const stockData = {
        // productId : req.body.productId,
        // productName: req.body.productName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        date : req.body.date
    };

     // Sync model to database
     const error = await model.material.stock.updateBy_stockId(stockId, stockData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Updated`)
            .send();
        return;
    }


    r.prebuild.ISE().send();
};

export default [inspector, updateStockDetails as EHandler]