import {EHandler, Handler} from "../../utils/types";
import { validate as uuidValidate } from 'uuid';
import {model} from "../../model";
import {body, inspectBuilder} from "../../utils/inspect";

const deleteMaterial : Handler = async (req,res) => {
    const {r} = res;

    const materialId = req.params.id;
    
    if (uuidValidate(materialId)) {
        const error = await model.material.material.deleteBy_materialID(materialId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`succesfully deleted the material ${materialId}`)
            .data({
                materialId,
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.BAD_REQ()
            .message("Material ID is not found")
            .send()
        return;
    }

    
    }

    r.prebuild.ISE().send();
}
export default [deleteMaterial as EHandler];
