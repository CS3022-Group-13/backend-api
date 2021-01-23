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
    body('materialName').exists().withMessage("materialName is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitPrice is required")
)

const updateMaterialDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const materialId = req.params.materialId;
    const materialData = {
        materialName: req.body.materialName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
    };

     // Sync model to database
     const error = await model.material.material.updateBy_materialId(materialId, materialData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Success`)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, updateMaterialDetails as EHandler]