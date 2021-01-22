import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param('stockID').isUUID().withMessage("stockId is not valid"),
    body('materialId').isUUID().withMessage("materialId is not valid"),
    body('materialName').exists().withMessage("materialname is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitprice is required"),
    body('date').isDate().withMessage("date is not valid")
    
)

const updateStockDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const stockId = req.params.materialId;
    const stockData = {
        stockId,
        materialId : req.body.materialId,
        materialName: req.body.materialName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        date : req.body.date
        
    };

     // Sync model to database
     const error = await model.material.stock.updateStockDataEntry(stockId,stockData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`sucessfully updated the stock: ${stockId}`)
            .data({
                stockId,
                materialId : req.body.materialId,
                materialName: req.body.materialName,
                quantity: req.body.quantity,
                unitPrice: req.body.unitPrice,
                date : req.body.date
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
};

export default [inspector, updateStockDetails as EHandler]