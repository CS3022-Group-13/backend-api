import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {param, inspectBuilder} from "../../utils/inspect";

const inspector = inspectBuilder(
    param('productId').isUUID().withMessage("productId is not valid")
    
)
const viewProduct : Handler = async (req,res) => {
    const {r} = res;

    const productId = req.params.productId;
    
    
    const [error,product] = await model.product.product.findBy_productID(productId);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data({
                product,
            })
            .send();
        return;
    }

    if (error === model.ERR.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Product ID is not found")
            .send()
        return;
    }
    r.prebuild.ISE().send();
    }

export default [inspector, viewProduct as EHandler];



