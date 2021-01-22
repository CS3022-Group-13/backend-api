import {EHandler, Handler} from "../../utils/types";
import { validate as uuidValidate } from 'uuid';
import {model} from "../../model";
import {body, inspectBuilder} from "../../utils/inspect";

const deleteProduct : Handler = async (req,res) => {
    const {r} = res;

    const productId = req.params.id;
    
    if (uuidValidate(productId)) {
        const error = await model.product.product.deleteBy_productID(productId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`succesfully deleted the product ${productId}`)
            .data({
                productId,
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.BAD_REQ()
            .message("Product ID is not found")
            .send()
        return;
    }

    
    }

    r.prebuild.ISE().send();
}
export default [deleteProduct as EHandler];



