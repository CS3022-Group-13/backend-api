import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {inspectBuilder, query} from "../../utils/inspect";

const inspector = inspectBuilder(
    query("materialId").optional().isUUID().withMessage("materialId is not valid"),
    query("materialName").optional().isString().withMessage("materialName is not valid")
);

const viewMaterial: Handler = async (req, res) => {
    const {r} = res;
    const query = req.query;

    const [error, products] = await model.material.material.findBy_query(query);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data(
                products
            )
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, viewMaterial as EHandler];



