import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";


const inspector = inspectBuilder(
    param("productId").isUUID().withMessage("productId is not valid")
);


const deleteProduct: Handler = async (req, res) => {
    const {r} = res;

    const productId = req.params.productId;

    const error = await model.product.product.deleteBy_productID(productId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Successfully deleted the product ${productId}`)
            .data({
                productId
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Product ID is not found")
            .send();
        return;
    }
    r.prebuild.ISE().send();
};

export default [inspector, deleteProduct as EHandler];



