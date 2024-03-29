import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    body('productName').exists().withMessage("productName is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitPrice is required")
)

const addProductDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const productId = UUID()
    const productData = {
        productId,
        productName: req.body.productName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        
    };

     // Sync model to database
     const error = await model.product.product.addProduct(productData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data(
                productId
            )
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, addProductDetails as EHandler]