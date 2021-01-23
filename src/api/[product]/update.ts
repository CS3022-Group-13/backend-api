import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {body, inspectBuilder, param} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    param('productId').isUUID().withMessage("productId is not valid"),
    body('productName').exists().withMessage("productName is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitPrice is required")
)

const updateProductDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const productId = req.params.productId;
    const productData = {
        productName: req.body.productName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
    };

     // Sync model to database
     const error = await model.product.product.updateBy_productId(productId, productData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message(`Success`)
            .send();
        return;
    }

    r.prebuild.ISE().send();
};

export default [inspector, updateProductDetails as EHandler]