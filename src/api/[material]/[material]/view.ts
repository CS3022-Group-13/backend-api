import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";

const inspector = inspectBuilder(
    param('materialId').isUUID().withMessage("materialId is not valid")
    
)
const viewMaterial : Handler = async (req,res) => {
    const {r} = res;

    const materialId = req.params.materialId;
    
    
    const [error,material] = await model.material.material.findBy_materialID(materialId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data({
                material,
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
    }

export default [inspector, viewMaterial as EHandler];
