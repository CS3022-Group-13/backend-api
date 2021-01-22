import {EHandler, Handler} from "../../utils/types";
import {model} from "../../model";
import {query, inspectBuilder} from "../../utils/inspect";

const inspector = inspectBuilder(
    query('productId').isUUID().withMessage("productId is not valid"),
    query('productName').isString().withMessage("productName is not valid")
    
)
const viewProduct : Handler = async (req,res) => {
    const {r} = res;
    
    const [error,product] = await model.product.product.findBy_productID(query);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`success`)
            .data({
                product,
            })
            .send();
        return;
    }

    r.prebuild.ISE().send();
    }

export default [inspector, viewProduct as EHandler];



