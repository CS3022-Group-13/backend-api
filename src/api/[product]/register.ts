import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {body, inspectBuilder} from "../../utils/inspect";

/**
 * :: STEP 1
 * validating fields
 */
const inspector = inspectBuilder(
    body('productName').exists().withMessage("productname is required"),
    body('quantity').exists().withMessage("quantity is required"),
    body('unitPrice').exists().withMessage("unitprice is required"),
    
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
     const error = await model.product.product.createProductDataEntry(productData);

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Successfully registered a new product")
            .data({
                productId,
            })
            .send();
        return;
    }

    if (error === model.ERR.DUPLICATE_ENTRY) {
        r.status.BAD_REQ()
            .message("Product ID is already taken")
            .send()
        return;
    }

    r.prebuild.ISE().send();
};