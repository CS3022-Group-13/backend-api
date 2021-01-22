import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    body('materialId').isUUID().withMessage("materialId is not valid"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitprice is required"),
    body('date').exists().withMessage("date is not valid")
    
)

const addStockDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const stockId = UUID()
    const stockData = {
        stockId,
        materialId : req.body.materialId,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        date : req.body.date
        
    };

     // Sync model to database
     const error = await model.material.stock.createStockDataEntry(stockData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Successfully registered a new material Stock")
            .data({
                stockId,
            })
            .send();
        return;
    }

    if (error === model.ERR.DUPLICATE_ENTRY) {
        r.status.BAD_REQ()
            .message("stock ID is already taken")
            .send()
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, addStockDetails as EHandler]