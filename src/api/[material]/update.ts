import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param('materialId').isUUID().withMessage("materialId is not valid"),
    body('materialName').exists().withMessage("materialname is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitprice is required"),
    
)

const updateMaterialDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const materialId = req.params.materialId;
    const materialData = {
        materialId,
        materialName: req.body.materialName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        
    };

     // Sync model to database
     const error = await model.material.material.updateMaterialDataEntry(materialId,materialData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`sucessfully updated the material ${materialId}`)
            .data({
                materialId,
                materialName: req.body.materialName,
                quantity : req.body.quantity,
                unitPrice : req.body.unitPrice
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Material ID is not found")
            .send()
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, updateMaterialDetails as EHandler]