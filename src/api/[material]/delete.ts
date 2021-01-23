import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";


const inspector = inspectBuilder(
    param("materialId").isUUID().withMessage("materialId is not valid")
);


const deleteMaterial: Handler = async (req, res) => {
    const {r} = res;

    const materialId = req.params.materialId;

    const error = await model.material.material.deleteBy_materialId(materialId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Success`)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, deleteMaterial as EHandler];



